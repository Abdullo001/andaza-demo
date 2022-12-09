
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
    const {...token} = this.$auth.strategy.$auth.$storage._state
    const res =  token[Object.keys(token)[0]]
    console.log(res);
    const config = {
      headers: {
        'device-id': 'd3c45bae0d41720bb72c4b',
        'authorization': res
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
      .catch(({response}) => console.log(response))
  }
}
