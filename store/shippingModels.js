export const state = () => ({
  returnReadyGarment: [],
  shippingOperationList: [],
})
export const getters = {
  returnReadyGarment: state => state.returnReadyGarment,
  shippingOperationList: state => state.shippingOperationList,
}
export const mutations = {
  setReturnRow(state, item) {
    state.returnReadyGarment = item;
  },
  setShippingOperationList(state, item) {
    state.shippingOperationList = item
  }
}
export const actions = {
  async getShippingOperationList({commit}, id) {
    await this.$axios.$get(`/api/v1/shipping-operation/list?shippingId=${id}`)
      .then(res => {
        commit('setShippingOperationList', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async returnReadyGarmentRow({commit, dispatch}, {data, id}){
    await this.$axios.put(`/api/v1/shipping-operation/return-warehouse`, data).then((res) => {
      this.$toast.success(res.data.message)
      dispatch("getShippingOperationList", id)
      commit('setReturnRow', res.data)
    }).catch((res) => {
      this.$toast.error(res.data.message)
    })
  },
}
