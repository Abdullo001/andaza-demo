export const state = () => ({
  loading: true,
  colors_thin_list: [],
});
export const getters = {
  loading: state => state.loading,
  colors_thin_list: state => state.colors_thin_list.content,
  totalElements: state => state.colors_thin_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings){
    state.loading = loadings
  },
  setColorsThinList(state, colorsList){
    state.colors_thin_list = colorsList
  },
};
export const actions = {
  async deleteColorsList({dispatch}, id){
    await this.$axios.$delete(`/api/v1/colors/delete?id=${id}`)
      .then(res => {
        dispatch("getColorsThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async updateColorsList({dispatch}, data){
    await this.$axios.$put('/api/v1/colors/update', data)
      .then(res => {
        dispatch("getColorsThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async createColorsList({dispatch}, data){
    await this.$axios.$post('/api/v1/colors/create', data)
      .then(res => {
        dispatch("getColorsThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getColorsThinList({commit}, {page, size}){
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/colors/list', body)
      .then(res => {
        commit("setColorsThinList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async filterColorsThinList({commit}, data){
    const { code, name, createdAt, updatedAt } = data;
    const body = {
      filters: [
        {
          key: "colorCodeHex",
          operator: 'LIKE',
          propertyType: 'STRING',
          value: code,
        },
        {
          key: "groupName",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: createdAt,
          valueTo: updatedAt === null ? "" : updatedAt
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/colors/list', body)
      .then(res => {
        commit("setColorsThinList", res.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
