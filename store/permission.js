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
  setAllPermission(state, data) {
    state.permissions = data
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setPermissionID(state, data){
    state.permissionIdDAta = data
  },
  setAllRole(state, data) {
    state.role = data
  },
  setOneIdData(state, data){
    state.roleOne = data
  },
}
export const actions = {
  async changeStatusRole({dispatch}, {id, status}) {
    await this.$axios.$put(`/api/v1/role/change-status?id=${id}&status=${status}`)
      .then(res => {
        dispatch("getRoleAllData", {page: 0, size: 10})
        this.$toast.success(res.message)
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message)
      })
  },
  async getRoleIdentifier({commit}, id){
    await this.$axios.get(`/api/v1/role/get?roleId=${id}`)
      .then(res => {
        commit("setOneIdData", res.data.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
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
  async filterRoleData(context, data) {
    const { id, key, status, value, value_to } = data;
    const body = {
      filters: [
        {
          key: "id",
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: id,
        },
        {
          key: "name",
          operator: "LIKE",
          propertyType: "STRING",
          value: key,
        },
        {
          key: "status",
          operator: "EQUAL",
          propertyType: "STATUS",
          value: status,
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: value,
          valueTo: value_to === null ? "" : value_to
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put(`/api/v1/role/list`, body)
      .then(res => {
        context.commit('setAllRole', res.data)
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
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
  async changeStatusPermission({dispatch}, {id, status}) {
    await this.$axios.$put(`/api/v1/permission/change-status?id=${id}&status=${status}`)
      .then(res => {
        dispatch("getPermission", {page: 0, size: 10})
        this.$toast.success(res.message)
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message)
      })
  },
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
  async filterData(context, data) {
    const { key, property_type, status, value, value_to } = data;
    const body = {
      filters: [
        {
          key: "name",
          operator: "LIKE",
          propertyType: "STRING",
          value: key,
        },
        {
          key: "status",
          operator: "EQUAL",
          propertyType: "STATUS",
          value: status,
        },
        {
          key: "path",
          operator: "LIKE",
          propertyType: "STRING",
          value: property_type,
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: value,
          valueTo: value_to
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put(`/api/v1/permission/list`, body)
      .then(res => {
        context.commit('setAllPermission', res.data)
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
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

