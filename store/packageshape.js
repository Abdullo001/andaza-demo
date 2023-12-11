export const state = () => ({
  loading: true,
  packageShape: [],
  measurement: [],
})
export const getters = {
  loading: state => state.loading,
  packageShape: state => state.packageShape.content,
  totalElements: state => state.packageShape.totalElements,
  measurement: state => state.measurement,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setPackageShape(state, packageShapes) {
    state.packageShape = packageShapes
  },
  setMeasurementUnit(state, item) {
    state.measurement = item
  }
}
export const actions = {
  async sortPackageShape({commit}, {data, page, size}) {
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
    await this.$axios.$put('/api/v1/package-shape/list', body)
      .then(res => {
        commit('setPackageShape', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async filterPackageShape({commit}, data) {
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
    await this.$axios.$put('/api/v1/package-shape/list', body)
      .then(res => {
        commit('setPackageShape', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updatePackageShape({dispatch}, data) {
    await this.$axios.$put(`/api/v1/package-shape/update`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getPackageShape', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deletePackageShape({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/package-shape/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getPackageShape', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createPackageShape({dispatch}, data) {
    await this.$axios.$post('/api/v1/package-shape/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getPackageShape', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getPackageShape({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    }
    await this.$axios.$put('/api/v1/package-shape/list', body)
      .then(res => {
          commit('setPackageShape', res.data)
          commit("setLoading", false)
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false)
      })
  },
  async getMeasurementUnit({commit}) {
    await this.$axios.get('/api/v1/measurement-unit/thin-list')
      .then(res => {
        commit("setMeasurementUnit", res.data.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
}
