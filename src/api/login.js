import request from '@/utils/request'
import qs from 'qs'
import Api from './Api'

export function loginByUsername (username, password) {
  const params = {
    username,
    password,
    grant_type: 'password'
  }
  const headers = {
    Authorization: 'Basic ' + btoa(`aiNzsAXE8tkOFJN6:12345678`)
  }
  return Api.post('/api/oauth/token', qs.stringify(params), headers)
}

export function logout (token) {
  const headers = {
    Authorization: `bearer ${token}`
  }
  return Api.post('/api/v1/logout', {}, headers)
}

export function getUserInfo (token) {
  const headers = {
    Authorization: `bearer ${token}`
  }
  return Api.get('/api/v1/user', {}, headers)
}

