export const state = () => ({
  loading: true,
  size_template: [],
})
export const getters = {
  loading: state => state.loading,
  size_template: state => state.size_template.content,
  totalElements: state => state.size_template.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setSizeTemplate(state, data) {
    state.size_template = data
  },
}
export const actions = {
  async filterSizeTemplate({commit}, data) {
    const {id, name, createdAt, updatedAt} = data;
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
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put(`/api/v1/size-template/list`, body)
      .then(res => {
        commit('setSizeTemplate', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async deleteSizeTemplate({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/size-template/delete?id=${id}`)
      .then(res => {
        dispatch('getSizeTemplateList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async updateSizeTemplate({dispatch}, data) {
    await this.$axios.$put("/api/v1/size-template/update", data)
      .then(res => {
        dispatch('getSizeTemplateList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async createSizeTemplate({dispatch}, data) {
    await this.$axios.$post("/api/v1/size-template/create", data)
      .then(res => {
        dispatch('getSizeTemplateList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getSizeTemplateList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    };
    await this.$axios.$put(`/api/v1/size-template/list`, body)
      .then(res => {
        commit('setSizeTemplate', res.data);
        commit('setLoading', false);
      })
      .catch(({response}) => {
        console.log(response);
        commit('setLoading', false);
      })
  }
}

