
export const state = () => ({
  users: [],
  current_user: {},
  loading: true
})

export const getters = {
  users: state => state.users.content,
  currentUser: state => state.current_user,
  loading: state => state.loading
}

export const mutations = {
  setUsers(state, user) {
    state.users = user
  },
  setCurrentUser(state, current) {
    state.current_user = current
  },
  changeLoading(state, status) {
    state.loading = status
  }
}

export const actions = {
  getUsers({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 10
    }
    this.$axios.$put('/api/v1/user/get-users', body)
      .then(res => {
        !!res ? commit('changeLoading', false) : null
        commit('setUsers', res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  filterUsers({commit}, {lastName, firstName, userId, createdAt }) {
    const body = {
      filters: [
        {
          key: 'id',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: userId
        },
        {
          key: 'lastName',
          operator: 'LIKE',
          field_type: 'STRING',
          value: lastName
        },
        {
          key: 'firstName',
          operator: 'LIKE',
          field_type: 'STRING',
          value: firstName
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          field_type: 'DATE',
          value: createdAt,
          valueTo: createdAt
        },
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)

    this.$axios.$put('/api/v1/user/get-users', body)
      .then(res => {
        commit('setUsers', res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  createUser({dispatch}, user) {
    user.phone = `+998${user.phone.replace('(','').replace(')','').replaceAll(' ', '')}`

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const formData = new FormData()
    formData.append('email', user.email)
    formData.append('firstName', user.firstname)
    formData.append('lastName', user.lastname)
    formData.append('gender', user.gender)
    formData.append('lang', user.lang)
    formData.append('phoneNumber', user.phone)
    formData.append('username', user.username)
    formData.append('photo', user.photo)

    this.$axios.post('/api/v1/user/register', formData, config)
      .then(res => {
        dispatch('getUsers')
        this.$toast.success(res.data.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
         this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  }
}
