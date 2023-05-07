export const state = () => ({
  loading: true,
  accessory_type_list: [],
});
export const getters = {
  loading: state => state.loading,
  accessory_type_list: state => state.accessory_type_list.content,
  totalElements: state => state.accessory_type_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings){
    state.loading = loadings
  },
  setAccessoryTypeList(state, accessoryTypes){
    state.accessory_type_list = accessoryTypes
  },
};
export const actions = {
  async deleteAccessoryType({dispatch}, id){
    await this.$axios.$delete(`/api/v1/colors/delete?id=${id}`)
      .then(res => {
        dispatch("getAccessoryTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async updateAccessoryType({dispatch}, data){
    await this.$axios.$put('/api/v1/accessory-type/update', data)
      .then(res => {
        dispatch("getAccessoryTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async createAccessoryType({dispatch}, data){
    await this.$axios.$post('/api/v1/accessory-type/create', data)
      .then(res => {
        dispatch("getAccessoryTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getAccessoryTypeList({commit}, {page, size}){
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/accessory-type/list', body)
      .then(res => {
        commit("setAccessoryTypeList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async filterAccessoryTypeList({commit}, data){
    const { id, name, createdAt, updatedAt } = data;
    const body = {
      filters: [
        {
          key: "id",
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: id,
        },
        {
          key: "name",
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
    await this.$axios.$put('/api/v1/accessory-type/list', body)
      .then(res => {
        commit("setAccessoryTypeList", res.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
