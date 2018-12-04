import Api from './Api'

export default {
  add(condition) {
    return Api.post('/api/condition', condition)
  },
  update(condition) {
    return Api.put('/api/condition', condition)
  },
  remove(id) {
    return Api.delete('/api/condition', { id: id })
  },
  get(id) {
    return Api.get(`/api/condition/${id}`)
  },
  find(query) {
    return Api.get('/api/condition/find', query)
  },
  list() {
    return Api.get('/api/condition/list')
  }
}
