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
  async changeStatusDevice({dispatch}, {id, status}){
    await this.$axios.$put(`/api/v1/fraud-management/change-status-device?id=${id}&status=${status}`)
      .then(res => {
        dispatch("getDevices", {page: 0, size: 10})
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },
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
        this.$toast.error(response.data.message);
      })
  },
  async filterDevice({commit}, data) {
    const {deviceId, status, from, to} = data;
    const body = {
      filters: [
        {
          key: 'deviceId',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: deviceId
        },
        {
          key: 'status',
          operator: 'LIKE',
          propertyType: 'DOUBLE',
          value: status
        },
      ],
      sort: [],
      page: 0,
      size: 10
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/fraud-management/blocked-devices', body)
      .then(res => {
        console.log(res);
        commit('changeLoading', false)
      })
      .catch(({response}) => {
        console.log(response);
        this.$toast.error(response.data.message);
        commit('changeLoading', false)
      })
  }
}
