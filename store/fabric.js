export const state = () => ({
  fabricList: [],
  fabricData: []
});

export const getters = {
  fabricList: state => state.fabricList.content,
  totalElements: state => state.fabricList.totalElements,
  fabricData: state => state.fabricData
};
export const mutations = {
  setFabricList(state, fabric) {
    state.fabricList = fabric
  },
  setFabricData(state, data) {
    state.fabricData = data
  }
};
export const actions = {
  getFabricList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size
    }
    this.$axios.$put('/api/v1/fabric-planning/list', body)
      .then(res => {
        commit('setFabricList', res.data);
      }).catch(({response}) => console.log(response))
  },
  async getOrderNames({commit}, id) {
    await this.$axios.$get(`/api/v1/fabric-planning/model-order-info?modelId=${id}`)
      .then(res => {
        commit('setFabricData', res.data)
      }).catch(({response}) => {
        this.$toast.error(response.data.message)
    })
  }
};
