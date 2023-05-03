export const state = () => ({
  loading: true,
  composition_list: [],
});
export const getters = {
  loading: state => state.loading,
  composition_list: state => state.composition_list.content,
  totalElements: state => state.composition_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setComposition(state, item) {
    state.composition_list = item
  },
};
export const actions = {
  async deleteComposition({dispatch}, {id, groupId}) {
    await this.$axios.$delete(`/api/v1/composition/delete?id=${id}`)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10, id: groupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateComposition({dispatch}, data) {
    await this.$axios.$put(`/api/v1/composition/update`, data)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10, id: data.catalogGroupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createComposition({dispatch}, data) {
    await this.$axios.$post(`/api/v1/composition/create`, data)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10, id: data.catalogGroupId});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCompositionList({commit}, {page, size, id}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/composition/list-catalog-group?groupId=${id}`, body)
      .then(res => {
        commit("setComposition", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
};
