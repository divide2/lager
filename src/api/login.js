import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/mock/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/mock/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/mock/user/info',
    method: 'get',
    params: { token }
  })
}

