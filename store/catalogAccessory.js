export const state = () => ({
  loading: true,
  accessory_list: [],
  accessory_type_id: "",
});
export const getters = {
  loading: state => state.loading,
  accessory_list: state => state.accessory_list.content,
  totalElements: state => state.accessory_list.totalElements,
  accessory_type_id: state => state.accessory_type_id,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setAccessoryList(state, accessoryList) {
    state.accessory_list = accessoryList
  },
  setAccessorTypeId(state, accessoryTypeId) {
    state.accessory_type_id = accessoryTypeId
  }
};
export const actions = {
  async getAccessoryTypeId({commit}) {
    await this.$axios.$get('/api/v1/accessory-type/thin-list')
      .then(res => {
        commit("setAccessorTypeId", res.data)
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async deleteAccessoryList({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/accessory/delete?id=${id}`)
      .then(res => {
        dispatch("getAccessoryList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async updateAccessoryList({dispatch}, data) {
    await this.$axios.$put('/api/v1/accessory/update', data)
      .then(res => {
        dispatch("getAccessoryList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async createAccessoryList({dispatch}, data) {
    await this.$axios.$post('/api/v1/accessory/create', data)
      .then(res => {
        dispatch("getAccessoryList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getAccessoryList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/accessory/list', body)
      .then(res => {
        commit("setAccessoryList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async filterAccessoryList({commit}, data) {
    const {id, name, createdAt, updatedAt} = data;
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
    await this.$axios.$put('/api/v1/accessory/list', body)
      .then(res => {
        commit("setAccessoryList", res.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
