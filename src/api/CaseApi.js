import Api from './Api'

export default {

  add(cases) {
    return Api.post('/api/v1/cases', cases)
  },
  update(cases) {
    return Api.put('/api/v1/cases', cases)
  },
  remove(id) {
    return Api.delete('/api/v1/cases', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/cases/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/cases/find', query)
  },
  list(query) {
    return Api.get('/api/v1/cases/list', query)
  }
}
