export const state = () => ({
  users: []
})

export const getters = {
  users: state => state.users
}

export const mutations = {
  setUser(state, user) {
    state.users = user
  }
}

export const actions = {
  getUsers({commit}) {
    this.$axios.$get('/api/v1/user/get')
      .then(res => {
        console.log(res);
      })
      .catch(({response}) => console.log(response))
  }
}
