import Api from './Api'

export default {
  listWarehouses() {
    return Api.get('/api/v1/mine/warehouses')
  },
  listProducts() {
    return Api.get('/api/v1/mine/products')
  },
  findProducts() {
    return Api.get('/api/v1/mine/products/find')
  }
}
