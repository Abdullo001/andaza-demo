export const state = () => ({
    packingList: []
})

export const getters = {
  packingList: state => state.packingList,
}

export const mutations = {
  setPackingList(state, item) {
    state.packingList = item
  }
}

export const actions = {
  async getPackingList({commit}, id) {
    await this.$axios.$get(`/api/v1/packaging-list/list?shippingId=${id}`)
      .then(res => {
        commit('setPackingList', res.data);
        console.log(res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async updatePackingList({commit, dispatch}, {data, id}) {
    this.$axios.$put('/api/v1/packaging-list/update', data)
      .then(res => {
        dispatch("getPackingList", id)
        this.$toast.success(res.message, {theme: 'toasted-primary'});
      }).catch(({response}) => {
      console.log(response);
      this.$toast.error(response.data.message, {theme: 'toasted-primary'})
    })
  },
  async setBoxQuantity({commit,dispatch}, {data, id}) {
    this.$axios.$put('/api/v1/packaging-list-item/set-box-quantity', data)
      .then(res => {
        dispatch("getPackingList",id)
        this.$toast.success(res.message, {theme: 'toasted-primary'});
      }).catch(({response}) => {
      console.log(response);
      this.$toast.error(response.data.message, {theme: 'toasted-primary'})
    })
  },
}
