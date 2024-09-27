export const state = () => ({
  loading: true,
  composition_list: [],
});
export const getters = {
  loading: state => state.loading,
  composition_list: state => state.composition_list.content,
  totalElements: state => state.composition_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setComposition(state, item) {
    state.composition_list = item
  },
};
export const actions = {
  async deleteComposition({dispatch}, {id}) {
    await this.$axios.$delete(`/api/v1/composition/delete?id=${id}`)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateComposition({dispatch}, data) {
    await this.$axios.$put(`/api/v1/composition/update`, data)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createComposition({dispatch}, data) {
    await this.$axios.$post(`/api/v1/composition/create`, data)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCompositionList({commit}, {page, size,id="",name="",createdAt="",updatedAt="",createdBy=""}) {
    const body = {
      filters: [
        {
          key: 'id',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: id
        },
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: createdAt,
          valueTo: updatedAt
        },
        {
          key: 'createdBy',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: createdBy,
        },
      ],
      sorts: [],
      page: page,
      size: size,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)

    await this.$axios.$put(`/api/v1/composition/list`, body)
      .then(res => {
        commit("setComposition", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },

  async filterCompositionData({commit}, data) {
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
        {
          key: 'createdBy',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.createdBy,
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/composition/list', body)
      .then(res => {
        commit('setComposition', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
