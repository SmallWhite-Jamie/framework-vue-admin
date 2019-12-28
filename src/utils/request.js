import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import NProgress from 'nprogress'
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
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    NProgress.done()
    if (response.status !== 200) {
      Message({
        message: response.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    const res = response.data
    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 4000 || res.code === 50012 || res.code === 50014) {
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
