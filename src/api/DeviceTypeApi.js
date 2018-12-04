import Api from './Api'

export default {
  add(device) {
    return Api.post('/api/device/type', device)
  },
  update(device) {
    return Api.patch('/api/device/type', device)
  },
  remove(id) {
    return Api.delete('/api/device/type', { id: id })
  },
  toggleEnable(id) {
    return Api.patch('/api/device/type/enabled', { id })
  },
  get(id) {
    return Api.get(`/api/device/type/${id}`)
  },
  find(query) {
    return Api.get('/api/device/type/find', query)
  },
  list() {
    return Api.get('/api/device/type/list')
  },
  check(query) {
    return Api.get('api/device/type/check', query)
  }
}
