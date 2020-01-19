/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import getPageTitle from '@/utils/get-page-title'
import store from '../store'
import { getToken, getTokenName } from '@/utils/auth'
import constantRoutes from './constantRoutes'

Vue.use(Router)

const createRouter = () => new Router({
  // 所有路由导航，让页面滚动到顶部
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
const whiteList = ['/login', '/auth-redirect'] // 不重定向白名单
router.beforeEach(async(to, from, next) => {
  // 开启progress bar
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 验证是否已经登录
  let hasToken = store.getters.tokenKey && store.getters.token
  if (!hasToken) {
    // vue store里没有token信息，进一步判断cookies.(页面刷新时候 cookies已存在token)
    const token = getToken()
    if (token) {
      store.commit('user/SET_TOKEN_KEY', getTokenName())
      store.commit('user/SET_TOKEN', token)
      hasToken = true
    }
  }
  if (hasToken) {
    // 已经登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.permission_routes && store.getters.permission_routes.length > 0
      if (hasRoles) {
        next()
      } else {
        await store.dispatch('user/getInfo')
        // 获取服务端路由信息，添加到本地路由中
        const asyncRouter = await store.dispatch('permission/generateAsyncRoutes')
        // { path: '*', redirect: '/404', hidden: true } 必须放在所有路由之后，解决刷新后404问题
        console.log(asyncRouter)
        asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
        router.addRoutes(asyncRouter)
        next({ ...to, replace: true })
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // 结束 progress bar
  NProgress.done()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
