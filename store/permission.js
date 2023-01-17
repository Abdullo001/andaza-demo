export const state = () => ({
  loading: true,
  permissions: [],
  permissionIdDAta: [],
  role: [],
})
export const getters = {
  loading: state => state.loading,
  permissions: state => state.permissions,
  role: state => state.role,
}
export const mutations = {
  // PERMISSION
  setAllPermission(state, data) {
    state.permissions = data
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setPermissionID(state, data){
    state.permissionIdDAta = data
  },
  // ROLE
  setAllRole(state, data) {
    state.role = data
  },
}
export const actions = {
  // GET ROLE IDENTIFIER
  getRoleIdentifier({commit}, id){
    this.$axios.get(`/api/v1/role/get?roleId=${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // GET ROLE
  getRoleAllData({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    this.$axios.$put('/api/v1/permission/list', body)
      .then(res => {
        console.log(res)
        commit('setLoading', false);
      })
      .catch(response =>  {
        console.log(response)
      })
  },
  // POST ROLE
  postRole(context, data) {
    this.$axios.$post('/api/v1/permission/list', data)
      .then(res => {
        console.log(res)
        context.commit('setLoading', false)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // UPDATE ROLE
  updateRole(context, data) {
    this.$axios.$put(' /api/v1/role/update')
      .then(res => {
        console.log(res)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // GET PERMISSION
  getPermission({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    this.$axios.$put('/api/v1/pre-finances/list', body)
      .then(res => {
        commit('setLoading', false)
      })
      .catch(({response}) => {
        commit('setLoading', false)
        this.$toast.error(response.messageerror, {theme: 'toasted-primary'})
      })
  },
  // POST PERMISSION
  postPermission({context}, data) {
    this.$axios.$post('/api/v1/permission/create', data)
      .then(res => {
        console.log(res)
      })
      .catch(({response}) => {
        this.$toast.error(response.errorMessages, {theme: 'toasted-primary'})
      })
  },
  // UPDATE PERMISSION
  putPermission({commit}, data) {
    this.$axios.$post('/api/v1/permission/update', data)
      .then(res => {
        console.log(res)
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
        this.$toast.error(response.errorMessages, {theme: 'toasted-primary'})
      })
  },
  // FILTER DATA
  filterData(context, {key, operator, property_type, value, value_to}) {
    const body = {
      filters: [
        {
          key: key,
          operator: operator,
          property_type: property_type,
          value: value,
          value_to: value_to,
        }
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    this.$axios.$put(`/api/v1/permission/list`, body)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        context.commit('setAllPermission', res.data)
        console.log(res)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // GET PERMISSION ID
  async getIdPermission({commit}, id) {
    await this.$axios.request({
      url: `/api/v1/permission/get?permissionId=${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: [],
    })
      .then(res => {
        this.$toast.success(res.status, {theme: 'toasted-primary'});
        commit('setPermissionID', res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.status, {theme: 'toasted-primary'})
      })
  }
}

