export const state = () => ({
  loading: true,
  accessory_thin_list: [],
});
export const getters = {
  loading: state => state.loading,
  accessory_thin_list: state => state.accessory_thin_list,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setAccessoryThinList(state, accessoryList) {
    state.accessory_thin_list = accessoryList
  },
};
export const actions = {
  async deleteAccessoryList({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/colors/delete?id=${id}`)
      .then(res => {
        dispatch("getAccessoryThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async updateAccessoryList({dispatch}, data) {
    await this.$axios.$put('/api/v1/colors/update', data)
      .then(res => {
        dispatch("getAccessoryThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async createAccessoryList({dispatch}, data) {
    await this.$axios.$post('/api/v1/colors/create', data)
      .then(res => {
        dispatch("getAccessoryThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getAccessoryThinList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.get('/api/v1/accessory/thin-list', body)
      .then(res => {
        commit("setAccessoryThinList", res.data.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async filterAccessoryThinList({commit}, data) {
    const {code, name, createdAt, updatedAt} = data;
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
    await this.$axios.get('/api/v1/colors/thin-list', body)
      .then(res => {
        commit("setColorsThinList", res.data.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
