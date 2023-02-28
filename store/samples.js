export const state = () => ({
  samplesList: [],
  purposesEnums: [],

});
export const getters = {
  samplesList: state => state.samplesList,
  purposesEnums: state => state.purposesEnums,

};
export const mutations = {
  setSamples(state, sample) {
    state.samplesList = sample;
  },
  setPurposesEnums(state, item) {
    state.purposesEnums = item;
  }
};
export const actions = {
  getSamplesList({commit}, modelId) {
    this.$axios.$get(`/api/v1/samples/list-by-model?modelId=${modelId}`)
      .then(res => {
        console.log(res);
      }).catch(({response}) => console.log(response))
  },
  createSamples({dispatch}, data) {
    this.$axios.$post('/api/v1/samples/create', data)
      .then(res => {
        console.log(res);
      }).catch(({response}) => console.log(response))
  },
  getPurposesEnums({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    this.$axios.$put(`/api/v1/sample-purposes/list`, body)
      .then(res => {
        commit('setPurposesEnums', res.data.content)
      }).catch(({response}) => console.log(response))
  }

};
