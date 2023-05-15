export const state = () => ({
  loading: true,
  yarn_type_list: [],
});
export const getters = {
  loading: state => state.loading,
  yarn_type_list: state => state.yarn_type_list.content,
  totalElements: state => state.yarn_type_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setYarnType(state, item) {
    state.yarn_type_list = item
  },
};
export const actions = {
  async deleteYarnType({dispatch}, {id, groupId}) {
    await this.$axios.$delete(`/api/v1/yarn-type/delete?id=${id}`)
      .then(res => {
        dispatch("getYarnTypeList", {page: 0, size: 10, id: groupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateYarnType({dispatch}, data) {
    await this.$axios.$put(`/api/v1/yarn-type/update`, data)
      .then(res => {
        dispatch("getYarnTypeList", {page: 0, size: 10, id: data.catalogGroupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createYarnType({dispatch}, data) {
    await this.$axios.$post(`/api/v1/yarn-type/create`, data)
      .then(res => {
        dispatch("getYarnTypeList", {page: 0, size: 10, id: data.catalogGroupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getYarnTypeList({commit}, {page, size, id}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/yarn-type/list-catalog-group?groupId=${id}`, body)
      .then(res => {
        commit("setYarnType", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
};
