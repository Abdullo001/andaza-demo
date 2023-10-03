export const state = () => ({
  loading: true,
  bodyParts: [],
})
export const getters = {
  loading: state => state.loading,
  bodyParts: state => state.bodyParts.content,
  bodyPartsTotalElements: state => state.bodyParts.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setBodyParts(state, bodyPartsData) {
    state.bodyParts = bodyPartsData
  },
}
export const actions = {
  async sortBodyParts({commit}, {data, page, size}) {
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
    await this.$axios.$put('/api/v1/body-parts/list', body)
      .then(res => {
        commit('setBodyParts', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async filterBodyParts({commit}, data) {
    const body = {
      filters: [
        {
          key: 'partName',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.partName
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
    await this.$axios.$put('/api/v1/body-parts/list', body)
      .then(res => {
        commit('setBodyParts', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateBodyParts({dispatch}, data) {
    await this.$axios.$put(`/api/v1/body-parts/update`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getBodyParts', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deleteBodyParts({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/body-parts/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getBodyParts', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createBodyParts({dispatch}, data) {
    await this.$axios.$post('/api/v1/body-parts/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getBodyParts', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getBodyParts({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    }
    await this.$axios.$put('/api/v1/body-parts/list', body)
      .then(res => {
        commit('setBodyParts', res.data)
        commit("setLoading", false)
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false)
      })
  },
}
