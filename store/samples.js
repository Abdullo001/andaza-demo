export const state = () => ({
  samplesList: []
});
export const getters = {
  samplesList: state => state.samplesList,

};
export const mutations = {
  setSamples(state, sample) {
    state.samplesList = sample;
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

};
