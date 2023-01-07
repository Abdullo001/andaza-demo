export const state = () => ({
  allLocalization: [],
  loading: true
})
export const getters = {
  allLocalization: state => state.allLocalization.content,
  totalElements: state => state.allLocalization.totalElements,
  loading: state => state.loading,
}
export const mutations = {
  setLocalization(state, item) {
    state.allLocalization = item
  },
  changeLoading(state, status) {
    state.loading = status
  },
}

export const actions = {
  getLocalization({commit}, {page, size, key, message}) {
    const body = {
      filters: [
        {
          key: 'key',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: key
        },
        {
          key: 'message',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: message
        }
      ],
      sorts: [],
      page: page,
      size: size
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    this.$axios.$put('/api/v1/localization/list', body)
      .then(res => {
        !!res ? commit('changeLoading', false) : null
        commit('setLocalization', res.data)
      })
      .catch(({response}) => {
        commit('changeLoading', false)
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  updateLocalization({dispatch}, {page, size, data, key, message}) {
    this.$axios.$put('/api/v1/localization/update', data)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch('getLocalization', {page, size, key, message})
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  createLocalization({dispatch}, {data, page, size}) {
    this.$axios.$post('/api/v1/localization/create', data)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch('getLocalization', {page, size})
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  deleteLocalization({dispatch}, {page, size, id}) {
    this.$axios.$delete(`/api/v1/localization/delete?localizationId=${id}`)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch('getLocalization', {page, size})
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  filterLocalization({commit}, {key, message}) {
    const body = {
      filters: [
        {
          key: 'key',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: key
        },
        {
          key: 'message',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: message
        }
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    this.$axios.$put('/api/v1/localization/list', body)
      .then(res => {
        commit('setLocalization', res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
}
