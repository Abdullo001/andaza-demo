export const state = () => ({
  loading: true,
  sampleData: [],
})
export const getters = {
  loading: state => state.loading,
  sampleData: state => state.sampleData.content,
  sampleTotalElements: state => state.sampleData.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setSampleData(state, sampleDates) {
    state.sampleData = sampleDates
  },
}
export const actions = {
  async sortSampleData({commit}, {data, page, size}) {
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
    await this.$axios.$put('/api/v1/sample-purposes/list', body)
      .then(res => {
        commit('setSampleData', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async filterSampleData({commit}, data) {
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
    await this.$axios.$put('/api/v1/sample-purposes/list', body)
      .then(res => {
        commit('setSampleData', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateSampleData({dispatch}, data) {
    await this.$axios.$put(`/api/v1/sample-purposes/update`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getSampleData', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deleteSampleData({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/sample-purposes/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getSampleData', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createSampleData({dispatch}, data) {
    await this.$axios.$post('/api/v1/sample-purposes/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getSampleData', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getSampleData({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    }
    await this.$axios.$put('/api/v1/sample-purposes/list', body)
      .then(res => {
        if (res.message === "Successfully") {
          commit('setSampleData', res.data)
          commit("setLoading", false)
        }
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false)
      })
  },
}
