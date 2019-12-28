import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getLoginSalt(username) {
  return request.get('/getLoginSalt', {
    params: { username: username }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getMenusList() {
  return request({
    url: '/menus/list',
    method: 'get'
  })
}
