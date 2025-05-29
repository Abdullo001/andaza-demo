export const state = () => ({
  loading: true,
  composition_list: [],
});
export const getters = {
  loading: state => state.loading,
  composition_list: state => state.composition_list.items,
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
  async deleteComposition({dispatch}, {id}) {
    await this.$axios.$delete(`/api/v1/composition/delete?id=${id}`)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateComposition({dispatch}, data) {
    await this.$axios.$put(`/api/v1/composition/update`, data)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createComposition({dispatch}, data) {
    await this.$axios.$post(`/api/v1/composition/create`, data)
      .then(res => {
        dispatch("getCompositionList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCompositionList({commit}, {page, size, composition="", createdBy=""}) {

    await this.$axios.get(`/api/v1/composition?page=${page}&size=${size}&composition=${composition}&createdBy=${createdBy}`)
      .then(res => {
        commit("setComposition", res.data.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
};
