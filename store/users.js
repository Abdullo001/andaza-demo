
export const state = () => ({
  users: [],
  current_user: {},
  loading: true,
  created_user: {},
  reset_password_data: {},
  loader: false,
  permissionsList:[],
})

export const getters = {
  users: state => state.users.content,
  currentUser: state => state.current_user,
  loading: state => state.loading,
  totalElements: state => state.users.totalElements,
  createdUser: state => state.created_user,
  userPasswordData: state => state.reset_password_data,
  loader: state => state.loader,
  permissionsList: state => state.permissionsList,
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
  },
  setCreatedUser(state, res) {
    state.created_user = res
  },
  setResetData(state, info) {
    state.reset_password_data = info;
  },
  setLoader(state, status) {
    state.loader = status;
  },
  setPermissionsList(state,list){
    state.permissionsList=list
  }
}

export const actions = {
  getUsers({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size
    }
    this.$axios.$put('/api/v1/user/get-users', body)
      .then(res => {
        commit('changeLoading', false)
        commit('setUsers', res.data)
      })
      .catch(({response}) => {
       commit('changeLoading', false)
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  filterUsers({commit}, {lastName, firstName, userId, startTime, endTime }) {
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
          propertyType: 'STRING',
          value: lastName
        },
        {
          key: 'firstName',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: firstName
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: startTime,
          valueTo: endTime
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
  createUser({dispatch, commit}, user) {
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
    formData.append('phoneNumber', user.userPhone)
    formData.append('username', user.username)
    if(user.photo){
      formData.append('photo', user.photo)
    }

    this.$axios.post('/api/v1/user/register', formData, config)
      .then(res => {
        console.log(res);
        commit('setCreatedUser', res.data.data)
        dispatch('getUsers')
        this.$toast.success(res.data.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
         this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  updateUserStatus({dispatch}, {id, status, size, page}) {
    const body = {
      id: id,
      status: status
    }
    this.$axios.$put('/api/v1/user/change-status', body)
      .then(res => {
        dispatch('getUsers', {page: page, size: size})
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  sortUsers({dispatch, commit}, {sortBy, sortDesc}) {
    sortDesc = sortDesc[0] ? 'DESC' : 'ASC'
    if(!!sortBy.length) {
      const body = {
        filters: [],
        sorts: [
          { key: sortBy[0], direction: sortDesc }
        ],
        page: 0,
        size: 10
      }
      this.$axios.$put('/api/v1/user/get-users', body)
        .then(res => {
          commit('setUsers', res.data)
        })
        .catch(({response}) => {
          this.$toast.error(response.data.message, {theme: 'toasted-primary'})
        })
    }
  },
  getOneUser({commit}, id) {
    this.$axios.$get(`/api/v1/user/get?id=${id}`)
      .then(res => {
        commit('setCurrentUser', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  updateUser({dispatch}, data) {
    const formData = new FormData()
    formData.append('id', data.id);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phoneNumber', data.phoneNumber);
    data.photo != null ? formData.append('photo', data.photo)  : '';
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('lang', data.lang);
    formData.append('gender', data.gender);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }

    this.$axios.$put(`/api/v1/user/update`, formData, config)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  },
  resetPassword({commit, dispatch}, email) {
    this.$axios.$post(`/api/v1/auth/reset-password?usernameOrEmail=${email}`)
      .then(res => {
        commit('setLoader', false);
        this.$toast.success(res.message);
        commit('setResetData', res.data);
      }).catch(({response}) => {
      console.log(response);
    })
  },
  getPermissionsList({commit},id){
    this.$axios.get(`/api/v1/user/get-permissions?id=${id}`)
    .then((res)=>{
      commit("setPermissionsList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  setPermission({dispatch},data){
    this.$axios.put(`/api/v1/user/set-permission`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getPermissionsList",data.userId)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },

  changeLang({commit},data){
    this.$axios.patch(`/api/v1/user/change-language`,data)
    .then((res)=>{
      console.log(res);
       
    })
    .catch(({response})=>{
      console.log(response);
      
    })
  }
}

