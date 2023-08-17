export const state = () => ({
  loading: true,
  cooperationType: [],
})
export const getters = {
  loading: state => state.loading,
  cooperationType: state => state.cooperationType.content,
  totalElements: state => state.cooperationType.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setCooperationType(state, cooperationTypes) {
    state.cooperationType = cooperationTypes
  },
}
export const actions = {
  async sortCooperationType({commit}, {data, page, size}) {
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
    await this.$axios.$put('/api/v1/cooperation-types/list', body)
      .then(res => {
        commit('setCooperationType', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async filterCooperationType({commit}, data) {
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
    await this.$axios.$put('/api/v1/cooperation-types/list', body)
      .then(res => {
        commit('setCooperationType', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateCooperationType({dispatch}, data) {
    await this.$axios.$put(`/api/v1/cooperation-types/update`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getCooperationType', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deleteCooperationType({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/cooperation-types/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getCooperationType', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createCooperationType({dispatch}, data) {
    await this.$axios.$post('/api/v1/cooperation-types/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getCooperationType', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCooperationType({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    }
    await this.$axios.$put('/api/v1/cooperation-types/list', body)
      .then(res => {
        if (res.message === "Successfully") {
          commit('setCooperationType', res.data)
          commit("setLoading", false)
        }
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false)
      })
  },
}
