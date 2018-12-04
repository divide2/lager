import Api from './Api'

export default {

  add(directive) {
    return Api.post('/api/v1/directive', directive)
  },
  update(directive) {
    return Api.put('/api/v1/directive', directive)
  },
  remove(id) {
    return Api.delete('/api/v1/directive', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/directive/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/directive/find', query)
  },
  list(query) {
    return Api.get('/api/v1/directive/list', query)
  }
}
