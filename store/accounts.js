export const state = () => ({
  accounts: [],
  loading: true,
})
export const getters = {
  accounts: state => state.accounts.content,
  loading: state => state.loading,
}
export const mutations = {
  setAccounts(state, account) {
    state.accounts = account
  },
  changeLoading(state, status) {
    state.loading = status
  },
}
export const actions = {
  async changeStatusAccount({dispatch}, {id, status}) {
    await this.$axios.$put(`/api/v1/fraud-management/change-status-account?id=${id}&status=${status}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getAccounts', {page: 0, size: 10});
      })
      .catch(({response}) => {
        console.log(response);
        this.$toast.error(response.data.message);
      })
  },
  async getAccounts({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    await this.$axios.$put(`/api/v1/fraud-management/blocked-accounts`, body)
      .then(res => {
        commit('changeLoading', false)
        commit('setAccounts', res.data)
      })
      .catch(({response}) => {
        commit('changeLoading', false)
        console.log(response);
      })
  },
  async filterAccount({commit}, {deviceId, deviceNumber, status, createdAt}) {
    const body = {
      filters: [
        {
          key: 'deviceId',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: deviceId
        },
        {
          key: 'blockedDateTime',
          operator: 'EQUAL',
          propertyType: 'INTEGER',
          value: deviceNumber
        },
        {
          key: 'status',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: status
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: createdAt
        }
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
