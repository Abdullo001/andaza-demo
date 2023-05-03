export const state = () => ({
  loading: true,
  yarn_number_list: [],
});
export const getters = {
  loading: state => state.loading,
  yarn_number_list: state => state.yarn_number_list.content,
  totalElements: state => state.yarn_number_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setYarnNumber(state, item) {
    state.yarn_number_list = item
  },
};
export const actions = {
  async deleteYarnNumber({dispatch}, {id, groupId}) {
    await this.$axios.$delete(`/api/v1/yarn-numbers/delete?id=${id}`)
      .then(res => {
        dispatch("getYarnNumberList", {page: 0, size: 10, id: groupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateYarnNumber({dispatch}, data) {
    await this.$axios.$put(`/api/v1/yarn-numbers/update`, data)
      .then(res => {
        dispatch("getYarnNumberList", {page: 0, size: 10, id: data.catalogGroupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createYarnNumber({dispatch}, data) {
    await this.$axios.$post(`/api/v1/yarn-numbers/create`, data)
      .then(res => {
        dispatch("getYarnNumberList", {page: 0, size: 10, id: data.catalogGroupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getYarnNumberList({commit}, {page, size, id}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/yarn-numbers/list-catalog-group?groupId=${id}`, body)
      .then(res => {
        commit("setYarnNumber", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
};
