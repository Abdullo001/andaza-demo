export const state = () => ({
  partnerType: [],
  loading: true,
})
export const getters = {
  partnerType: state => state.partnerType.content,
  loading: state => state.loading,
  partnerTotalElements: state => state.partnerType.totalElements,
}
export const mutations = {
  setLoading(state, loading){
    state.loading = loading
  },
  setPartnerType(state, partnerTypes){
    state.partnerType = partnerTypes
  },
}
export const actions = {
  async sortPartnerType({commit}, {data, page, size}){
    const body = {
      filters: [],
      sorts: [
        {
          key: data.sortBy,
          direction: !data.sortDesc ? "DESC" : "ASC",
        }
      ],
      page: page,
      size: size
    };
    await this.$axios.$put('/api/v1/partner-type/list', body)
      .then(res => {
        commit('setPartnerType', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async filterPartnerType({commit}, data){
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
    await this.$axios.$put('/api/v1/partner-type/list', body)
      .then(res => {
        commit('setPartnerType', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async updatePartnerType({dispatch}, {data, page, size}){
    await this.$axios.$put(`/api/v1/partner-type/update`, data)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getPartnerType', {page: page, size: size});
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async deletePartnerType({dispatch}, {id, page, size}){
    await this.$axios.$delete(`/api/v1/partner-type/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getPartnerType', {page: page, size: size});
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async createPartnerType({dispatch}, {data, page, size}){
    await this.$axios.$post('/api/v1/partner-type/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getPartnerType', {page: page, size: size})
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getPartnerType({commit}, {page, size}){
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    }
    await this.$axios.$put('/api/v1/partner-type/list', body)
      .then(res => {
        commit('setPartnerType', res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        commit("setLoading", false);
        console.log(response);
      })
  },
}

