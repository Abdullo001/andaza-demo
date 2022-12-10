
export const state = () => ({
  users: []
})

export const getters = {
  users: state => state.users
}

export const mutations = {
  setUsers(state, user) {
    state.users = user
  }
}

export const actions = {
  getUsers({commit}) {
    const config = {
      headers: {
        'device-id': 'd3c45bae0d41720bb72c4b',
      }
    }
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 10
    }
    this.$axios.$put('/api/v1/users/get-users', body, config)
      .then(res => {
        console.log(res);
      })
      .catch(({response}) => {
        this.$toasted.error(response.data.message, {theme: 'toasted-primary'})
      })
  }
}
