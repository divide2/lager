import Api from './Api'

export default {
  add(carrier) {
    return Api.post('/api/v1/carrier', carrier)
  },
  update(carrier) {
    return Api.patch('/api/v1/carrier', carrier)
  },
  remove(id) {
    return Api.delete('/api/v1/carrier', { id: id })
  },
  toggleEnable(id) {
    return Api.patch('/api/v1/carrier/enabled', { id })
  },
  get(id) {
    return Api.get(`/api/v1/carrier/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/carrier/find', query)
  },
  all() {
    return Api.get('/api/v1/carrier/all')
  },
  check(query) {
    return Api.get('api/v1/carrier/check', query)
  }
}
