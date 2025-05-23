export const state = () => ({
  loading: true,
  measurementUnit: [],
})
export const getters = {
  loading: state => state.loading,
  measurementUnit: state => state.measurementUnit,
  totalElements: state => state.measurementUnit.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setMeasurementUnit(state, measurementUnits) {
    state.measurementUnit = measurementUnits
  },
}
export const actions = {
  async sortMeasurementUnit({commit}, {data, page, size}) {
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
    await this.$axios.$put('/api/v1/measurement-unit/list', body)
      .then(res => {
        commit('setMeasurementUnit', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async filterMeasurementUnit({commit}, data) {
    const bodyUnit = {
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
    bodyUnit.filters = bodyUnit.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/measurement-unit/list', bodyUnit)
      .then(res => {
        commit('setMeasurementUnit', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateMeasurementUnit({dispatch}, data) {
    await this.$axios.$put(`/api/v1/measurement-unit/update`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getMeasurementUnit', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deleteMeasurementUnit({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/measurement-unit/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getMeasurementUnit', {page: 0, size: 10})
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message);
      })
  },
  async createMeasurementUnit({dispatch}, data) {
    await this.$axios.$post('/api/v1/measurement-unit/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getMeasurementUnit', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getMeasurementUnit({commit}) {

    await this.$axios.get('/api/v1/measurement-units')
      .then(res => {
          commit('setMeasurementUnit', res.data.data)
          commit("setLoading", false)
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false)
      })
  },
}
