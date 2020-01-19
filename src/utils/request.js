import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import NProgress from 'nprogress'
import { getTokenName, setToken } from './auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start()
    if (store.getters.tokenKey && store.getters.token) {
      config.headers[store.getters.tokenKey] = store.getters.token
    }
    return config
  },
  error => {
    NProgress.done()
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    NProgress.done()
    if (response.status !== 200) {
      Message({
        message: response.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    if (response.headers.token_refresh === 'OK') {
      // token被刷新了
      const token = response.headers[(getTokenName() || '').toLowerCase()]
      // 更新vue store 中的值
      store.commit('user/SET_TOKEN', token)
      // 更新cookies token值
      setToken(token)
    }
    const res = response.data
    // 4000 token 令牌验证失败
    if (res.code === 4000) {
      // to re-login
      const msg = window.$vue.$i18n.t('login.confirm_logout')
      const title = window.$vue.$i18n.t('login.confirm_logout_title')
      const confirmText = window.$vue.$i18n.t('login.re_Login')
      const cancelText = window.$vue.$i18n.t('common.cancel')
      MessageBox.confirm(msg, title, {
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return res
  },
  error => {
    NProgress.done()
    console.error(error)
    Message({
      message: window.$vue.$i18n.t('common.networkError'),
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
