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
  getAccounts({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    this.$axios.$put(`/api/v1/fraud-management/blocked-accounts`, body)
      .then(res => {
        commit('changeLoading', false)
        commit('setAccounts', res.data)
      })
      .catch(({response}) => {
        commit('changeLoading', false)
        console.log(response);
      })
  }
}
