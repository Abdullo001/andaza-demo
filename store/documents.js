export const state = () => ({
  documentsList: []
});
export const getters = {
  documentsList: state => state.documentsList
};
export const mutations = {
  setDocuments(state, doc) {
    state.documentsList = doc;
  }
};
export const actions = {
  async getDocuments({commit}, {modelId, fileType = 'DOC'}) {
    await this.$axios.$get(`api/v1/model-resources/list?modelId=${modelId}&fileType=${fileType}`)
      .then(res => {
        commit('setDocuments', res.data)
      }).catch(({response}) => console.log(response))
  },
  async createDocument({commit, dispatch}, data) {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('modelId', data.modelId);
    formData.append('title', data.title);

    await this.$axios.$post(`api/v1/model-resources/create`, formData, config)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getDocuments', {modelId: data.modelId, fileType: 'DOC'})
      }).catch(({response}) => console.log(response))
  },
  async deleteDocument({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/model-resources/delete?id=${id}`)
      .then(res => {
        console.log(res);
      }).catch(({response}) => this.$toast.error(response.data.message))
  }
};
