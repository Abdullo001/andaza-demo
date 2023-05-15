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
  async filterAccount({commit}, data) {
    const { accountId, status, from, to } = data;
    const body = {
      filters: [
        {
          key: 'id',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: accountId
        },
        {
          key: 'status',
          operator: 'EQUAL',
          propertyType: 'BLOCKING_STATUS',
          value: status
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: from,
          valueTo: to
        },
      ],
      sort: [],
      page: 0,
      size: 10
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/fraud-management/blocked-accounts', body)
      .then(res => {
        commit("setAccounts", res.data);
        commit('changeLoading', false);
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message);
        commit('changeLoading', false);
      })
  }
}
