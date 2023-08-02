export const state = () => ({
  accessoryList: []
});

export const getters = {
  accessoryList: state => state.accessoryList.content
}
export const mutations = {
  setAccessoryList(state, item) {
    state.accessoryList = item;
  }
}
export const actions = {
  async getAccessoryWarehouseList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    await this.$axios.$put('/api/v1/accessory-warehouse/list', body)
      .then(res => {
        commit('setAccessoryList', res.data);
      }).catch(({response}) => console.log(response));
  }
}
