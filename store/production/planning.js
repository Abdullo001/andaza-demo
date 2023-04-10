export const state = () => ({
  planningList: []
});
export const getters = {
  planningList: state => state.planningList.content,
  totalElements: state => state.planningList.totalElements
}
export const mutations = {
  setPlanningList(state, planning) {
    state.planningList = planning;
  }
}
export const actions = {
  getPlanningList({commit}, {page= 0, size= 10}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put('/api/v1/production/list', body)
      .then(res => {
        commit('setPlanningList', res.data);
      }).catch(({response}) => console.log(response))
  }
}
