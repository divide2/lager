import Api from './Api'

export default {
  add(device) {
    return Api.post('/api/device', device)
  },
  test(testParams) {
    return Api.post('/api/device/test', testParams)
  },
  update(device) {
    return Api.put('/api/device', device)
  },
  remove(id) {
    return Api.delete('/api/device', { id: id })
  },
  get(id) {
    return Api.get(`/api/device/${id}`)
  },
  getVersion(query) {
    return Api.get(`/api/device/version`, query)
  },
  find(query) {
    return Api.get('/api/device/find', query)
  },
  listLogFull(deviceId, query) {
    return Api.get(`/api/device/${deviceId}/test/logs/Auto`, query)
  },
  listLogDetail(deviceId, logId, query) {
    return Api.get(`/api/device/${deviceId}/test/${logId}`, query)
  },
  listDeviceTypeCases(deviceTypeId, conditionId, type) {
    return Api.get(`/api/device/${deviceTypeId}/${conditionId}/cases/${type}`)
  },
  listLogSemi(deviceId, query) {
    return Api.get(`/api/device/${deviceId}/test/logs/Manual`, query)
  },
  // semi auto test
  semiTest(parmas) {
    return Api.post(`/api/device/test/semi`, parmas)
  },
  execCase(params) {
    return Api.put('/api/device/cases/exec', params)
  },
  expectConfirm(params) {
    return Api.put('/api/device/expect/confirm', params)
  },
  expectAutoConfirm(params) {
    return Api.put('/api/device/expect/confirm/auto', params)
  },
  // hanging
  hangingOn(params) {
    return Api.post('/api/device/hanging/on', params)
  },
  hangingOff(params) {
    return Api.post('/api/device/hanging/off', params)
  },
  findHanging(deviceId, query) {
    return Api.get(`/api/device/${deviceId}/hangings`, query)
  },
  findInstructionHanging(deviceId, query) {
    return Api.get(`/api/device/${deviceId}/instruction/hangings`, query)
  },
  listHangingDetail(deviceId, hangingId, query) {
    return Api.get(`/api/device/${deviceId}/hanging/${hangingId}`, query)
  },
  findInstructionHangingDetail(deviceId, hangingId, query) {
    return Api.get(`/api/device/${deviceId}/instruction/hanging/${hangingId}`, query)
  },
  hangingInstructionOn(params) {
    return Api.post('/api/device/instruction/hanging/on', params)
  }
}
