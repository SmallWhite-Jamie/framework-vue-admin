import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss'
// nprogress 加载进度条样式
import 'nprogress/nprogress.css'

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import i18n from './config/i18n'
import request from './utils/request'

// import { mockXHR } from '../mock'

// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.$http = request

window.$vue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
