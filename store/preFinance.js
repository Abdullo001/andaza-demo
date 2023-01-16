export const state = () => ({
  preFinances: []
})
export const getters = {
  preFinancesContent: state => state.preFinances.content,

}
export const mutations = {
  setRefinances(state, item) {
    state.preFinances = item;
  }
}
export const actions = {
  getPreFinancesList({commit}, {size, page}) {
    const body = {
      filter: [],
      sort: [],
      size,
      page,
    }
    this.$axios.$put(`/api/v1/pre-finances/list`, body)
      .then(res => {
        commit('setRefinances', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  }
}
