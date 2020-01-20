import constantRoutes from '@/router/constantRoutes'
import { getMenusTree } from '@/api/user'
import Layout from '@/layout'

function handleMenus2Router(menus) {
  if (!menus || menus.length === 0) {
    return []
  }
  const arr = []
  menus.forEach(item => {
    arr.push(buildChildTree(item))
  })
  return arr

  function buildChildTree(menu) {
    const sideBarItem = {
      hidden: false,
      path: menu.metaMap ? menu.metaMap.router : '',
      meta: {
        type: 'async',
        code: menu.metaMap ? menu.metaMap.code : '',
        title: menu.text,
        icon: menu.metaMap && menu.metaMap.icon ? menu.metaMap.icon : 'component'
      }
    }
    if (menu.children && menu.children.length > 0) {
      // 父路由
      sideBarItem.component = Layout
      sideBarItem.children = []
      menu.children.forEach(child => {
        sideBarItem.children.push(buildChildTree(child))
      })
    } else {
      // 子路由
      if (sideBarItem.path) {
        let path
        if (sideBarItem.path.substr(0, 1) === '/') {
          path = sideBarItem.path.substr(1, sideBarItem.path.length)
        } else {
          path = sideBarItem.path
        }
        sideBarItem.component = () => import(`@/views/${path}`)
      }
    }
    return sideBarItem
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateAsyncRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      // let accessedRoutes = []
      // 加载服务端路由信息
      getMenusTree().then(response => {
        const { data } = response
        // 处理服务端菜单数据
        const router = handleMenus2Router(data)
        // commit('user/SET_MENUS', constantRoutes.concat(router))
        commit('SET_ROUTES', router)
        resolve(router)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
