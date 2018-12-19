import Api from './Api'

export default {
  add(order) {
    return Api.post('/api/v1/order', order)
  },
  update(order) {
    return Api.put('/api/v1/order', order)
  },
  remove(id) {
    return Api.delete('/api/v1/order', { id: id })
  },
  get(id) {
    return Api.get(`/api/v1/order/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/order/find', query)
  }
}
