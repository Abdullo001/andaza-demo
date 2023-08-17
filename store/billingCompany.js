export const state = () => ({
  company: [],
  loading: false,
})

export const getters ={
  company: state => state.company.map(item => item.content),
  loading: state => state.loading,
};
export const mutations ={
  setCompany(state, company) {
    state.company = company
  },
  setLoading(state, item) {
    state.loading = item
  }
};
export const actions ={
  getBillingCompanies({commit}, {page= 0, size = 10}) {
    // const body = {
    //   filters: [],
    //   sorts: [],
    //   page,
    //   size,
    // };
    // this.$axios.$put(`/api/v1/`, body)
    //   .then(res => {
    //     commit('setLoading', false)
    //     console.log(res);
    //   })
    //   .catch(({response}) => {
    //     commit('setLoading', false)
    //     console.log(response)
    //   })
  }
};
