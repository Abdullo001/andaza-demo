export const state = () => ({
  printingList: []
});
export const getters = {
  printingList: state => state.printingList
};
export const mutations = {
  setPrinting(state, item) {
    state.printingList = item;
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
        console.log(res);
      })
      .catch(({response}) => console.log(response))
  }
};
