export const state = () => ({
  accessoryList: []
});

export const getters = {
  accessoryList: state => state.accessoryList
}
export const mutations = {
  setAccessoryList(state, item) {
    state.accessoryList = item;
  }
}
export const actions = {
  getAccessoryWarehouseList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put('/api/v1/accessory-warehouse/list', body)
      .then(res => {
        console.log(res);
      }).catch(({response}) => console.log(response));
  }
}
