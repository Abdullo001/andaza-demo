export const state = () => ({
  fabricList: []
});

export const getters = {
  fabricList: state => state.fabricList,
};
export const mutations = {
  setFabricList(state, fabric) {
    state.fabricList = fabric
  }
};
export const actions = {
  getFabricList({commit}) {

    this.$axios.$put('/api/v1/fabric-planning/list')
      .then(res => {
        console.log(res);
      })
  }
};
