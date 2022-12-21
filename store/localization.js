export const state = () => ({
  allLocalization: [],
  loading: true
})
export const getters = {
  allLocalization: state => state.allLocalization.content,
  totalElements: state => state.allLocalization.totalElements,
  loading: state => state.loading,
}
export const mutations = {
  setLocalization(state, item) {
    state.allLocalization = item
  },
  changeLoading(state, status) {
    state.loading = status
  },
}

export const actions = {
  getLocalization({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    this.$axios.$put('/api/v1/localization/list', body)
      .then(res => {
        !!res ? commit('changeLoading', false) : null
        commit('setLocalization', res.data)
      })
      .catch(({response}) => {
        !response ? commit('changeLoading', false) : null
        console.log(response)
      })
  }
}
