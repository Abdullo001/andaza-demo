
export const state = () => ({
  users: [],
  current_user: {},
  loading: true,
  created_user: {}
})

export const getters = {
  users: state => state.users.content,
  currentUser: state => state.current_user,
  loading: state => state.loading,
  totalElements: state => state.users.totalElements,
  createdUser: state => state.created_user
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
        !!res ? commit('changeLoading', false) : null
        commit('setUsers', res.data)
      })
      .catch(({response}) => {
        !!response ? commit('changeLoading', false) : null
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
    formData.append('phoneNumber', user.phone)
    formData.append('username', user.username)
    formData.append('photo', user.photo)

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
    formData.append('photo', data.photo);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('lang', data.lang);
    formData.append('gender', data.gender);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }

    this.$axios.$put(`/api/v1/user/update`, formData, config)
      .then(res => {
        console.log(res);
      })
      .catch(({response}) => console.log(response))
  }

}

