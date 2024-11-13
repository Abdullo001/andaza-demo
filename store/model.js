export const state = () => ({
  loading: true,
  modelGroupList: [],
})
export const getters = {
  loading: state => state.loading,
  modelGroupList: state => state.modelGroupList.items,
  modelTotalElements: state=> state.modelGroupList.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setModelGroupList(state, data) {
    state.modelGroupList = data
  },
}
export const actions = {
  async sortModelData({commit}, {data, page, size}){
    const body = {
      filters: [],
      sorts: [
        {
          key: data.sortBy,
          direction: !data.sortDesc ? "DESC" : "ASC",
        }
      ],
      page: page,
      size: size,
    };
    await this.$axios.$put(`/api/v1/model-groups/list`, body)
      .then(res => {
        commit('setModelGroupList', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async filterModelData({commit}, data) {
    const body = {
      filters: [
        {
          key: 'id',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: data.id
        },
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.name
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: data.createdAt,
          valueTo: data.updatedAt
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put(`/api/v1/model-groups/list`, body)
      .then(res => {
        commit('setModelGroupList', res.data);
        commit('setLoading', false);
      })
      .catch(({response}) => {
        console.log(response);
        commit('setLoading', false);
      })
  },
  async deleteModelData({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/model-groups/delete?groupId=${id}`)
      .then(res => {
        dispatch('getModelGroupList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async updateModelData({dispatch}, data) {
    await this.$axios.$put("/api/v1/model-groups/update", data)
      .then(res => {
        dispatch('getModelGroupList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async createModelData({dispatch}, data) {
    await this.$axios.$post("/api/v1/model-groups/create", data)
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
    await this.$axios.get(`/api/v1/model-groups?modelGroupName=${modelGroupName}&page=${page}&size=${size}`)
      .then(res => {
        commit('setModelGroupList', res.data.data);
        commit('setLoading', false);
      })
      .catch(({response}) => {
        console.log(response);
        commit('setLoading', false);
      })
  }
}

