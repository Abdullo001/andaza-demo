
export const state = () => ({
  users: [],
  current_user: {}
})

export const getters = {
  users: state => state.users.content,
  currentUser: state => state.current_user
}

export const mutations = {
  setUsers(state, user) {
    state.users = user
  },
  setCurrentUser(state, current) {
    state.current_user = current
  }
}

export const actions = {
  getUsers({commit}) {
    const config = {
      headers: {'device-id': '381b74b9-085f-46d4-a013-00180a4ccba7'}
    }
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 10
    }
    this.$axios.$put('/api/v1/user/get-users', body, config)
      .then(res => {
        commit('setUsers', res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  filterUsers({commit}, {lastName, firstName, userId, createdAt }) {
    const config = {
      headers: {'device-id': '381b74b9-085f-46d4-a013-00180a4ccba7'}
    }
    const body = {
      filters: [
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
          key: 'userId',
          operator: 'LIKE',
          field_type: 'ID',
          value: userId
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          field_type: 'Date',
          value: createdAt
        },
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    this.$axios.$put('/api/v1/user/get-users', body, config)
      .then(res => {
        commit('setUsers', res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  createUser({dispatch}, user) {
    this.$axios.post('/api/v1/user/register', user)
      .then(res => {console.log(res)})
      .catch(({response}) => console.log(response))
  }
}
