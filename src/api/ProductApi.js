import Api from './Api'

export default {
  add(product) {
    return Api.post('/api/v1/product', product)
  },
  update(product) {
    return Api.put('/api/v1/product', product)
  },
  remove(id) {
    return Api.delete('/api/v1/product', { id: id })
  },
  toggleEnable(id) {
    return Api.put('/api/v1/product/enabled', { id })
  },
  get(id) {
    return Api.get(`/api/v1/product/${id}`)
  },
  find(query) {
    return Api.get('/api/v1/product/find', query)
  },
  listProductSpec(productId) {
    return Api.get(`/api/v1/product/${productId}/specs`)
  },
  listByUser(userId) {
    return Api.get(`/api/v1/product/${userId}/products`)
  }
}
