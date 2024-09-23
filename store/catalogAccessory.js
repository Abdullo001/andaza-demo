export const state = () => ({
  loading: true,
  accessory_list: [],
  accessory_type_id: "",
});
export const getters = {
  loading: state => state.loading,
  accessory_list: state => state.accessory_list.items,
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
    await this.$axios.delete(`/api/v1/accessories/${id}`)
      .then(res => {
        dispatch("getAccessoryList", {page: 0, size: 10});
        this.$toast.success(res.data.data.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async updateAccessoryList({dispatch}, {data,id}) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    await this.$axios.put(`/api/v1/accessories/${id}`,data,config)
      .then(res => {
        dispatch("getAccessoryList", {page: 0, size: 10});
        this.$toast.success(res.data.code);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async createAccessoryList({dispatch}, data) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    await this.$axios.$post('/api/v1/accessories', data, config)
      .then(res => {
        dispatch("getAccessoryList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getAccessoryList({commit}, {page, size, id="",name=""}) {
    id=id??""
    name=name??""
    await this.$axios.get(`/api/v1/accessories?page=${page}&size=${size}&id=${id}&name=${name}`)
      .then(res => {
        commit("setAccessoryList", res.data.data);
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
