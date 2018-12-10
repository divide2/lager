import Api from './Api'

export default {
  add(stock) {
    return Api.post('/api/v1/stock', stock)
  },
  update(stock) {
    return Api.put('/api/v1/stock', stock)
  },
  remove(id) {
    return Api.delete('/api/v1/stock', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/stock/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/stock/find', query)
  }
}
