export const state = () => ({
  loading: true,
  size_template: [],
  thinSizeList:[],
})
export const getters = {
  loading: state => state.loading,
  thinSizeList: state => state.thinSizeList,
  size_template: state => state.size_template.items,
  totalElements: state => state.size_template.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setSizeTemplate(state, data) {
    state.size_template = data
  },
  setThinSizeTemplate(state, size) {
    state.thinSizeList = size;
    size.map(el => {
      el.sizes = el.sizes.join(', ');
    });
    state.thinSizeList = size.map(item => item.sizes)
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
    await this.$axios.delete(`/api/v1/size-templates/${id}`)
      .then(res => {
        dispatch('getSizeTemplateList', {page: 0, size: 10});
        this.$toast.success(res.data.data.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async updateSizeTemplate({dispatch}, data) {
    await this.$axios.$put(`/api/v1/size-templates/${data.id}`, data)
      .then(res => {
        dispatch('getSizeTemplateList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async createSizeTemplate({dispatch}, data) {
    await this.$axios.post("/api/v1/size-templates", data)
      .then(res => {
        dispatch('getSizeTemplateList', {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getSizeTemplateList({commit}, {page, size,name=""}) {
    name=name??""
    await this.$axios.get(`/api/v1/size-templates?page=${page}&size=${size}&name=${name}`)
      .then(res => {
        commit('setSizeTemplate', res.data.data);
        commit('setLoading', false);
      })
      .catch(({response}) => {
        console.log(response);
        commit('setLoading', false);
      })
  },
  getSizeThinList({commit},) {
    this.$axios.get(`/api/v1/size-templates/thin-list`)
      .then(res => {
        commit('setThinSizeTemplate', res.data.data);
        commit('setLoading', false);
      })
      .catch(({response}) => {
        console.log(response);
        commit('setLoading', false);
      })
  },
}

