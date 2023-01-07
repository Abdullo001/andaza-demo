export const state = () => ({
  allDevices: []
})

export const getters = {
  allDevices: state => state.allDevices.content
}
export const mutations = {
  setDevices(state, device) {
    state.allDevices = device
  }
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
      .then(res => commit('setDevices', res.data))
      .catch(({response}) => console.log(response))
  }
}

