export const state = () => ({
  pageTitle: "",
  isAuth: false,
  token: "",
  permissionsList:[],
  currentUser: {}
});

export const getters = {
  pageTitle: (state) => state.pageTitle,
  token: (state) => state.token,
  currentUser: state => state.currentUser,
  permissionsList: state => state.permissionsList,
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
  },
  setPermissionsList(state, current) {
    state.permissionsList = current;
  },
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
  },
  setFcmToken({dispatch},{userId,token}){
    this.$axios.put(`/api/v1/user/fcm-token/${userId}?fcmToken=${token}`)
    .then((res)=>{
      dispatch("getUserInfo")
    })
    .catch(({response})=>{
      console.log(response);
    })
  },

  changePageStatus({commit},{propertyName,modelId}){
    this.$axios.post(`/api/v1/models/finish-process/${modelId}?propertyName=${propertyName}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(res.data.message)

    })
  }

}
