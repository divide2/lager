import Api from './Api'

export default {
  add(warehouse) {
    return Api.post('/api/v1/warehouse', warehouse)
  },
  update(warehouse) {
    return Api.patch('/api/v1/warehouse', warehouse)
  },
  remove(id) {
    return Api.delete('/api/v1/warehouse', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/warehouse/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/warehouse/find', query)
  },
  listByCompany() {
    return Api.get('/api/v1/warehouse/list')
  },
  check(query) {
    return Api.get('api/v1/warehouse/check', query)
  }
}
