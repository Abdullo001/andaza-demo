export const state = () => ({
  printingList: [],
  printOne: [],

});
export const getters = {
  printingList: state => state.printingList,
  printOne: state => state.printOne,

};
export const mutations = {
  setPrintingList(state, printing) {
    state.printingList = printing;
  },
  setPrintOne(state, item) {
    state.printOne = [{...item}];
  }
};
export const actions = {
  getOnePrinting({commit}, {id, page= 0, size = 10}) {

    this.$axios.$get(`/api/v1/prints/get?id=${id}`)
      .then(res => {
        commit('setPrintOne', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  getAllPrints({commit}, {id, page= 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }

    this.$axios.$put(`/api/v1/prints/list`, body)
      .then(res => {
        console.log(res);
      })
      .catch(({response}) => console.log(response))
  },
};
