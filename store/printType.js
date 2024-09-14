export const state = () => ({
  loading: true,
  printTypeList: [],
});
export const getters = {
  loading: state => state.loading,
  printTypeList: state => state.printTypeList.items,
  totalElements: state => state.printTypeList.totalElements,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setPrintTypeList(state, item) {
    state.printTypeList = item
  },
};
export const actions = {
  async deletePrintType({dispatch}, {id}) {
    await this.$axios.delete(`/api/v1/print-types/${id}`)
      .then(res => {
        dispatch("getPrintTypeList", {page: 0, size: 10});
        this.$toast.success(res.data.data.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updatePrintType({dispatch}, data) {
    await this.$axios.put(`/api/v1/print-types/${data.id}`, data)
      .then(res => {
        dispatch("getPrintTypeList", {page: 0, size: 10});
        this.$toast.success(res.data.code);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createPrintType({dispatch}, data) {
    await this.$axios.post(`/api/v1/print-types`, data)
      .then(res => {
        dispatch("getPrintTypeList", {page: 0, size: 10});
        this.$toast.success(res.data.code);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getPrintTypeList({commit}, {page, size,id,name}) {
    id=id??""
    name=name??""
    await this.$axios.get(`/api/v1/print-types?page=${page}&size=${size}&printTypeId=${id}&name=${name}`)
      .then(res => {
        commit("setPrintTypeList", res.data.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },

};
