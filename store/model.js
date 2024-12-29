export const state = () => ({
  loading: true,
  modelGroupList: [],
  selectedModelOperations: null,
  selectedModel: null,
})
export const getters = {
  loading: state => state.loading,
  modelGroupList: state => state.modelGroupList.items,
  modelTotalElements: state=> state.modelGroupList.totalElements,
  selectedModelOperations: state => state.selectedModelOperations,
  selectedModel: state => state.selectedModel,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setModelGroupList(state, data) {
    state.modelGroupList = data
  },
  setSelectedModelOperations(state, item) {
    state.selectedModelOperations = item
  },
  setSelectedModel(state, item) {
    state.selectedModel = item
  },
}
export const actions = {
  async deleteModelData({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/model-category/${id}`)
      .then(res => {
        dispatch('getModelGroupList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async updateModelData({dispatch}, data) {
    await this.$axios.$put(`/api/v1/model-category/${data.id}`, data)
      .then(res => {
        dispatch('getModelGroupList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async createModelData({dispatch}, data) {
    await this.$axios.$post("/api/v1/model-category", data)
      .then(res => {
        dispatch('getModelGroupList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
        this.$toast.error(response.data.message);
      })
  },
  async getModelGroupList({commit}, {page, size,modelGroupName="",}) {
    modelGroupName=modelGroupName??""
    await this.$axios.get(`/api/v1/model-category?name=${modelGroupName}&page=${page}&size=${size}`)
      .then(res => {
        commit('setModelGroupList', res.data.data);
        commit('setLoading', false);
      })
      .catch(({response}) => {
        console.log(response);
        commit('setLoading', false);
      })
  },
  async getSelectedModelOperations({ commit }, id) {
    await this.$axios.get(`/api/v1/model-category-operations?modelCategoryId=${id}`)
      .then((res) => {
        commit("setSelectedModelOperations", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async getSelectedModel({ commit }, id) {
    await this.$axios.get(`/api/v1/model-category/${id}`)
      .then((res) => {
        commit("setSelectedModel", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async resetOperations({ commit }, id) {
    await this.$axios.post(`/api/v1/model-category-operations/reset?modelCategoryId=${id}`)
      .then((res) => {
        commit("setSelectedModelOperations", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async deleteOperations({ dispatch }, {id, data}) {
    await this.$axios.delete(`/api/v1/model-category-operations?modelCategoryId=${id}&operationIds=${data}`)
      .then((res) => {
        dispatch("getSelectedModelOperations", id);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async updateOperations({ commit }, data) {
    await this.$axios.post(`/api/v1/model-category-operations`, data)
      .then((res) => {
        commit("setSelectedModelOperations", res.data.data);
        this.$toast.success(res.data.code);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
}

