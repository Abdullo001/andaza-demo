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
  async getDocuments({commit}, {warehouseId}) {
    await this.$axios.$get(`/api/v1/general/document?warehouseId=${warehouseId}`)
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
    formData.append('warehouseId', data.warehouseId);
    formData.append('title', data.title);
    formData.append('description', data.description);

    await this.$axios.$post(`/api/v1/general/document`, formData, config)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getDocuments', {warehouseId: data.warehouseId, })
      }).catch(({response}) => console.log(response))
  },

  async deleteDocument({dispatch}, {id, warehouseId}) {
    await this.$axios.$delete(`/api/v1/general/document/${id}`)
      .then((response) => {
        dispatch('getDocuments', {warehouseId: warehouseId})
        this.$toast.success(response.message);
      }).catch(({response}) => this.$toast.error(response.data.message))
  },


  // async updateDocument({dispatch}, data) {
  //   const config = {
  //     headers: {"Content-Type": "multipart/form-data"}
  //   }
  //   const formData = new FormData();
  //   !!data.file ? formData.append('file', data.file) : null;
  //   formData.append('id', data.id);
  //   formData.append('title', data.title);
  //   formData.append('modelId', data.modelId);

  //   await this.$axios.$put(`/api/v1/general/${id}`, formData, config)
  //     .then(res => {
  //       this.$toast.success(res.message);
  //       dispatch('getDocuments', {modelId: data.modelId, fileType: 'DOC'})
  //     }).catch(({response}) => console.log(response));
  // }
};
