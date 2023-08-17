export const state = () => ({
  pageTitle: "",
  isAuth: false,
  token: "",
  currentUser: {}
});

export const getters = {
  pageTitle: (state) => state.pageTitle,
  token: (state) => state.token,
  currentUser: state => state.currentUser
};

export const mutations = {
  setPageTitle(state, title) {
    state.pageTitle = title;
  },
  setToken(state, token) {
    state.token = token;
  },
  setCurrentUser(state, current) {
    state.currentUser = current;
  }
};

export const actions = {
  logOut({commit}) {
    this.$axios.$post("/api/v1/auth/logout")
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err))
  },
  getUserInfo({commit}) {
    this.$axios.$get('/api/v1/auth/current-user')
      .then(res => {
        commit('setCurrentUser', res.data);
      }).catch(({response}) => {
      console.log(response);
    })
  }
}
