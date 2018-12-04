import Api from './Api'

export default {

  add(combine) {
    return Api.post('/api/v1/combine', combine)
  },
  update(combine) {
    return Api.put('/api/v1/combine', combine)
  },
  remove(params) {
    return Api.delete('/api/v1/combine', params)
  },
  get(id) {
    return Api.get(`/api/v1/combine/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/combine/find', query)
  },
  list(query) {
    return Api.get('/api/v1/combine/list', query)
  }
}
