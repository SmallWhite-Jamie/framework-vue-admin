'use strict'
module.exports = {
  port: '80',
  host: '127.0.0.1',
  publicPath: '/',
  proxy: 'http://localhost:9090'
  //   {
  //   // change xxx-api/login => mock/login
  //   // detail: https://cli.vuejs.org/config/#devserver-proxy
  //   [process.env.VUE_APP_BASE_API_MOCK]: {
  //     target: `http://127.0.0.1:8888/mock`,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       ['^' + process.env.VUE_APP_BASE_API_MOCK]: ''
  //     }
  //   },
  //   [process.env.VUE_APP_BASE_API]: {
  //     target: `http://localhost:9090`
  //     ,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       ['^' + process.env.VUE_APP_BASE_API]: ''
  //     }
  //   }
  // }
}
