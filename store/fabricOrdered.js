export const state = () => ({
  fabricOrdersList: []
});
export const getters = {
  fabricOrdersList: state => state.fabricOrdersList,

};
export const mutations = {
  setFabricOrdersList(state, orders) {
    state.fabricOrdersList = orders;
  }
};
export const actions = {
  getFabricOrdered({commit}, fabricId) {
    this.$axios.$get(`/api/v1/fabric-planning-chart/list-fabrics-ordered?fabricPlanningId=${fabricId}`)
      .then(res => {
        commit('setFabricOrdersList', res.data);
      }).catch(({response}) => console.log(response));
  }
};
