export const state = () => ({
  fabricList: []
});

export const getters = {
  fabricList: state => state.fabricList.content,
  totalElements: state => state.fabricList.totalElements
};
export const mutations = {
  setFabricList(state, fabric) {
    state.fabricList = fabric
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
  }
};
