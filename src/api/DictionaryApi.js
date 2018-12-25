import Api from './Api'

export default {
  listByGroup(groupCode) {
    return Api.get(`/api/v1/dictionary/${groupCode}`)
  }
}
