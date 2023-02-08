export const state = () => ({
  partName: [],
  modelPartsList: [],

});
export const getters = {
  partName: state => state.partName,
  modelPartsList: state => state.modelPartsList

}
export const mutations = {
  setPartName(state, parts) {
    state.partName = parts
  },
  setModelPartsList(state, item) {
    state.modelPartsList = item;
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
        commit('setPartName', res.data.content);
      })
      .catch(({response}) => console.log(response))
  },
  async getModelPart({commit}, id) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put(`/api/v1/model-parts/list?modelId=${id}`, body)
      .then(res => {
        commit('setModelPartsList', res.data.content);
      })
      .catch(({response}) => console.log(response))
  },
  async createModelParts({commit, dispatch}, {data, id}) {
    const body = {
      partComposition: data.partComposition,
      bodyPartId: data.bodyPartId,
      modelId: id,
      description: data.description
    }
    await this.$axios.$post(`/api/v1/model-parts/create`, body)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'});
        dispatch('getModelPart', id)
      })
      .catch(({response}) => console.log(response))
  },
  async updateModelParts({dispatch}, data) {
    const body = {
      partComposition: data.partComposition,
      bodyPartId: data.bodyPartId,
      modelId: data.modelId,
      id: data.id,
      description: data.description
    }
    await this.$axios.$put(`/api/v1/model-parts/update`, body)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'});
        dispatch('getModelPart', data.modelId)
      })
      .catch(({response}) => console.log(response))
  },
  async deletePartModel({dispatch}, {partId, modelId}) {
    this.$axios.$delete(`/api/v1/model-parts/delete?id=${partId}`)
      .then(res => {
        dispatch('getModelPart', modelId)
        this.$toast.success(res.message, {theme: 'toasted-primary'})

      }).catch(({response}) => console.log(response))
  }
};
