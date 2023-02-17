export const state = () => ({
  printingList: [],
  printOne: [],
  printType: {
    content: [
      {id: 1, name: ''},
      {id: 2, name: ''}
    ]
  },

});
export const getters = {
  printingList: state => state.printingList,
  printOne: state => state.printOne,
  printTypeEnums: state => state.printType.content
};
export const mutations = {
  setPrinting(state, item) {
    state.printingList = item;
  },
  setPrintOne(state, print) {
    state.printOne = [{...print}]
  },
  setPrintType(state, type) {
    state.printType = type;
  }
};
export const actions = {
  getPrintingList({commit}, {page= 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    this.$axios.$put('/api/v1/prints/list', body)
      .then(res => {
        commit('setPrinting', res.data.content);
        commit('setPrintOne', {})
      })
      .catch(({response}) => console.log(response))
  },
  getPrintOne({commit}, {id}) {
    this.$axios.$get(`/api/v1/prints/get?id=${id}`)
      .then(res => {
        commit('setPrintOne', res.data);
        commit('setPrinting', [])
      })
      .catch(({response}) => console.log(response))
  },
  getPrintType({commit}, {page = 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put(`/api/v1/print-type/list`, body)
      .then(res => {
        commit('setPrintType', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  createPrints({commit, dispatch}, data) {
    this.$axios.$post(`/api/v1/prints/create`, data)
      .then(res => {
        dispatch('getPrintingList', {page: 0, size: 10})
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  }
};

























