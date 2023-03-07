export const state = () => ({
  loading: true,
  permissions: [],
  permissionIdDAta: [],
  role: [],
  roleOne: {}
})
export const getters = {
  loading: state => state.loading,
  permissions: state => state.permissions.content,
  totalElement: state => state.permissions.totalElements,
  permissionIdDAta: state => state.permissionIdDAta,
  role: state => state.role.content,
  roleTotalElements: state => state.role.totalElements,
  roleOne: state => state.roleOne,
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
  setOneIdData(state, data){
    state.roleOne = data
  },
}
export const actions = {
  // GET ROLE IDENTIFIER
  async getRoleIdentifier({commit}, id){
    await this.$axios.get(`/api/v1/role/get?roleId=${id}`)
      .then(res => {
        console.log(res.data.data)
        commit("setOneIdData", res.data.data)
        this.$toast.success(res.data.message)

      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // GET ROLE ALL DATA
  async getRoleAllData({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    await this.$axios.$put('/api/v1/role/list', body)
      .then(res => {
        commit('setLoading', false);
        commit("setAllRole", res.data)
      })
      .catch(response =>  {
        console.log(response)
      })
  },
  // POST ROLE
  async postRole(context, data) {
    await this.$axios.$post('/api/v1/role/create', data)
      .then(res => {
        context.commit('setLoading', false)
        context.dispatch("getRoleAllData", {page: 0, size: 10})
        this.$toast.success(res.message)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // UPDATE ROLE
  async updateRole(context, data) {
    await this.$axios.$put('/api/v1/role/update', data)
      .then(res => {
        context.dispatch("getRoleAllData", {page: 0, size: 10})
        this.$toast.success(res.message)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // GET PERMISSION
  async getPermission({commit}, {page, size}) {
    const body = {
      filters: [],
      sort: [],
      page: page,
      size: size
    }
    await this.$axios.$put('/api/v1/permission/list', body)
      .then(res => {
        commit('setLoading', false)
        commit('setAllPermission', res.data)
      })
      .catch(({response}) => {
        commit('setLoading', false)
        this.$toast.error(response.messageerror, {theme: 'toasted-primary'})
      })
  },
  // POST PERMISSION
  async postPermission(context, data) {
    await this.$axios.$post('/api/v1/permission/create', data)
      .then(res => {
        this.$toast.success(res.message, {theme: "toasted-primary"})
        context.dispatch("getPermission", {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  // UPDATE PERMISSION
  async putPermission({dispatch}, data) {
    await this.$axios.$put('/api/v1/permission/update', data)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch("getPermission", {page: 0, size: 10})
      })
      .catch(({response}) => {
        this.$toast.error(response.errorMessages, {theme: 'toasted-primary'})
      })
  },
  // FILTER DATA
  async filterData(context, {key, status, property_type, value, value_to}) {
    const body = {
      filters: [
        {
          key: "key",
          operator: "LIKE",
          property_type: "STRING",
          value: key,
        },
        {
          key: "status",
          operator: "LIKE",
          property_type: "STRING",
          value: status,
        },
        {
          key: "property_type",
          operator: "LIKE",
          property_type: "STRING",
          value: property_type,
        },
        {
          key: "value",
          operator: "LIKE",
          property_type: "STRING",
          value: value,
        },
        {
          key: "value_to",
          operator: "LIKE",
          property_type: "STRING",
          value: value_to,
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put(`/api/v1/permission/list`, body)
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
        this.$toast.success(res.data.message, {theme: 'toasted-primary'});
        commit('setPermissionID', res.data.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.status, {theme: 'toasted-primary'})
      })
  }
}

