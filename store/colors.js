export const state = () => ({
  loading: true,
  colors_thin_list: [],
});
export const getters = {
  loading: state => state.loading,
  colors_thin_list: state => state.colors_thin_list.items,
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
    await this.$axios.$delete(`/api/v1/colors/${id}`)
      .then(res => {
        dispatch("getColorsThinList", {page: 0, size: 10});
        this.$toast.success(res.data.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.errorMessage);
      })
  },
  async updateColorsList({dispatch}, data){
    await this.$axios.$put(`/api/v1/colors/${data.id}`, data)
      .then(res => {
        dispatch("getColorsThinList", {page: 0, size: 10});
        this.$toast.success(res.code);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.errorMessage);
      })
  },
  async createColorsList({dispatch}, data){
    await this.$axios.$post('/api/v1/colors', data)
      .then(res => {
        dispatch("getColorsThinList", {page: 0, size: 10});
        this.$toast.success(res.code);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.errorMessage);
      })
  },
  async getColorsThinList({commit}, {page, size,code="",name=""}){
    code=code??""
    name=name??""
    await this.$axios.get(`/api/v1/colors?page=${page}&size=${size}&colorCode=${code}&colorName=${name}`)
      .then(res => {
        commit("setColorsThinList", res.data.data);
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
