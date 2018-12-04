import Api from './Api'

export default {
  add(peripheral) {
    return Api.post('/api/v1/peripheral', peripheral)
  },
  update(peripheral) {
    return Api.put('/api/v1/peripheral', peripheral)
  },
  remove(id) {
    return Api.delete('/api/v1/peripheral', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/peripheral/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/peripheral/find', query)
  },
  list() {
    return Api.get('/api/v1/peripheral/list')
  }
}
