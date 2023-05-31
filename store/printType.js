export const state = () => ({
  loading: true,
  printTypeList: [],
});
export const getters = {
  loading: state => state.loading,
  printTypeList: state => state.printTypeList.content,
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
    await this.$axios.$delete(`/api/v1/print-type/delete?id=${id}`)
      .then(res => {
        dispatch("getPrintTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updatePrintType({dispatch}, data) {
    await this.$axios.$put(`/api/v1/print-type/update`, data)
      .then(res => {
        dispatch("getPrintTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createPrintType({dispatch}, data) {
    await this.$axios.$post(`/api/v1/print-type/create`, data)
      .then(res => {
        dispatch("getPrintTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getPrintTypeList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/print-type/list`, body)
      .then(res => {
        commit("setPrintTypeList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },

  async filterPrintTypeData({commit}, data) {
    const body = {
      filters: [
        {
          key: 'id',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: data.id
        },
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.name
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: data.createdAt,
          valueTo: data.updatedAt
        },
        {
          key: 'createdBy',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.createdBy,
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/print-type/list', body)
      .then(res => {
        commit('setPrintTypeList', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
