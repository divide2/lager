import Api from './Api'

export default {
  listWarehouses() {
    return Api.get('/api/v1/mine/warehouses')
  },
  listProducts() {
    return Api.get('/api/v1/mine/products')
  },
  findProducts(query) {
    return Api.get('/api/v1/mine/products/find', query)
  },
  findStock(query) {
    return Api.get('/api/v1/mine/stocks', query)
  },
  listFriend() {
    return Api.get('/api/v1/mine/friends')
  }
}
