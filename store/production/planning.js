export const state = () => ({
  planningList: [],
  modelInfo: {}
});
export const getters = {
  planningList: state => state.planningList.content,
  totalElements: state => state.planningList.totalElements,
  modelInfo: state => state.modelInfo
}
export const mutations = {
  setPlanningList(state, planning) {
    state.planningList = planning;
  },
  setModelInfo(state, info) {
    state.modelInfo = info;
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
  },
  getModelInfo({commit}, id) {
    this.$axios.$get(`/api/v1/production/model-order-info?modelId=${id}`)
      .then(res => {
        commit('setModelInfo', res.data)
      }).catch(({response}) => {
        this.$toast.error(response.data.message);
    })
  }
}
