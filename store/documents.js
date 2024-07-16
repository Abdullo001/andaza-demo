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
  async getStockDocuments({commit}, {stockId, fileType = 'DOC'}) {
    await this.$axios.$get(`api/v1/model-resources/list?stockId=${stockId}&fileType=${fileType}`)
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
    formData.append('title', data.title);
    if(!!data.modelId){
      formData.append('modelId', data.modelId);
    }
    if(!!data.stockId){
      formData.append('stockId', data.stockId);
    }

    await this.$axios.$post(`api/v1/model-resources/create`, formData, config)
      .then(res => {
        this.$toast.success(res.message);
        if(!!data.modelId){
          dispatch('getDocuments', {modelId: data.modelId, fileType: 'DOC'})
        }
        if(!!data.stockId){
          dispatch('getStockDocuments', {stockId: data.stockId, fileType: 'DOC'})
        }
      }).catch(({response}) => console.log(response))
  },
  async deleteDocument({dispatch}, {docId, modelId,stockId}) {
    await this.$axios.$delete(`/api/v1/model-resources/delete?id=${docId}`)
      .then(res => {
        // dispatch('getDocuments', {modelId: modelId, fileType: 'DOC'})
        if(!!modelId){
          dispatch('getDocuments', {modelId: modelId, fileType: 'DOC'})
        }
        if(!!stockId){
          dispatch('getStockDocuments', {stockId: stockId, fileType: 'DOC'})
        }
        this.$toast.success(res.message);
      }).catch(({response}) => this.$toast.error(response.data.message))
  },
  async updateDocument({dispatch}, data) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    const formData = new FormData();
    !!data.file ? formData.append('file', data.file) : null;
    formData.append('id', data.id);
    formData.append('title', data.title);
    if(!!data.modelId){
      formData.append('modelId', data.modelId);
    }
    if(!!data.stockId){
      formData.append('stockId', data.stockId);
    }

    await this.$axios.$put('/api/v1/model-resources/update', formData, config)
      .then(res => {
        this.$toast.success(res.message);
        // dispatch('getDocuments', {modelId: data.modelId, fileType: 'DOC'})
        if(!!modelId){
          dispatch('getDocuments', {modelId: modelId, fileType: 'DOC'})
        }
        if(!!stockId){
          dispatch('getStockDocuments', {stockId: stockId, fileType: 'DOC'})
        }
      }).catch(({response}) => console.log(response));
  }
};
