export const state = () => ({
  loading: true,
  expenseGroup: [],
})
export const getters = {
  loading: state => state.loading,
  expenseGroup: state => state.expenseGroup.content,
  totalElements: state => state.expenseGroup.totalElements,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setExpenseGroup(state, expenseGroups) {
    state.expenseGroup = expenseGroups
  },
}
export const actions = {
  async sortExpenseGroup({commit}, {data, page, size}) {
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
    await this.$axios.$put('/api/v1/expense-group/list', body)
      .then(res => {
        commit('setExpenseGroup', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async filterExpenseGroup({commit}, data) {
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
    await this.$axios.$put('/api/v1/expense-group/list', body)
      .then(res => {
        commit('setExpenseGroup', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateExpenseGroup({dispatch}, data) {
    await this.$axios.$put(`/api/v1/expense-group/update`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getExpenseGroup', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deleteExpenseGroup({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/expense-group/delete?id=${id}`)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getExpenseGroup', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createExpenseGroup({dispatch}, data) {
    await this.$axios.$post('/api/v1/expense-group/create', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getExpenseGroup', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getExpenseGroup({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    }
    await this.$axios.$put('/api/v1/expense-group/list', body)
      .then(res => {
          commit('setExpenseGroup', res.data)
          commit("setLoading", false)
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false)
      })
  },
}
