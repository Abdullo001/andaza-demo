export const state = () => ({
  allDevices: [],
  loading: true,
})

export const getters = {
  allDevices: state => state.allDevices.content,
  loading: state => state.loading
}
export const mutations = {
  setDevices(state, device) {
    state.allDevices = device
  },
  changeLoading(state, status) {
    state.loading = status
  },
}

export const actions = {
  async getDevices({commit}, { page, size }) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    await this.$axios.$put('/api/v1/fraud-management/blocked-devices', body)
      .then(res => {
        commit('setDevices', res.data)
        commit('changeLoading', false)
      })
      .catch(({response}) => {
        commit('changeLoading', false)
        console.log(response)
      })
  },
  filterDevice({commit}, {deviceId, deviceNumber, status}) {
    const body = {
      filters: [
        {
          key: 'deviceId',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: deviceId
        },
        {
          key: 'blockedDeviceId',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: deviceNumber
        },
        {
          key: 'status',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: status
        },
      ],
      sort: [],
      page: 0,
      size: 10
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    this.$axios.$put('/api/v1/fraud-management/blocked-devices', body)
      .then(res => {
        console.log(res);
        commit('changeLoading', false)
      })
      .catch(({response}) => {
        console.log(response);
        commit('changeLoading', false)
      })
  }
}
