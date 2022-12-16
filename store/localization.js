export const state = () => ({
  localization: []

})
export const getters = {
  localization: state => state.localization
}
export const mutations = {
  setLocalization(state, item) {
    state.localization = item
  }
}

export const actions = {
  getLocalization({commit}) {
    const body = {
      filters: [],
      sort: [],
      page: 0,
      size: 10
    }
    this.$axios.$put('/api/v1/localization/list', body)
      .then(res => {
        commit('setLocalization', res.data)
      })
      .catch(({response}) => console.log(response))
  }
}
