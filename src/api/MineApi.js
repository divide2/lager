import Api from './Api'

export default {
  listWarehouses() {
    return Api.get('/api/v1/mine/warehouses')
  },
  listProducts() {
    return Api.get('/api/v1/mine/products')
  },
  findProducts(query) {
    return Api.get('/api/v1/mine/company/products', query)
  },
  findStock(query) {
    return Api.get('/api/v1/mine/stocks', query)
  },
  listFriend() {
    return Api.get('/api/v1/mine/friends')
  },
  async findPurchaseOrder(query) {
    return await Api.get('/api/v1/mine/order/purchase',query)
  },
  async findSellOrder(query) {
    return await Api.get('/api/v1/mine/order/sell', query)
  }
}
