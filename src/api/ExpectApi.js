import Api from './Api'

export default {
  add(expect) {
    return Api.post('/api/v1/expect', expect)
  },
  update(expect) {
    return Api.patch('/api/v1/expect', expect)
  },
  remove(id) {
    return Api.delete('/api/v1/expect', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/expect/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/expect/find', query)
  },
  list() {
    return Api.get('/api/v1/expect/list')
  },
  check(query) {
    return Api.get('api/v1/expect/check', query)
  }
}
