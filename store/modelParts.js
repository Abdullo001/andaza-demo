export const state = () => ({
  partName: []
});
export const getters = {
  partName: state => state.modelParts,

}
export const mutations = {
  setPartName(state, parts) {
    state.partName = parts
  }
};
export const actions = {
  getPartName({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    this.$axios.$put('/api/v1/body-parts/list', body)
      .then(res => {
        console.log(res);
      })
      .catch(({response}) => console.log(response))
  }
};
