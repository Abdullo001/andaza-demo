export const state = () => ({
  fabricsList: [],
})

export const getters = {
  fabricsList: state => state.fabricsList.content,
  totalElements: state => state.fabricsList.totalElements
}

export const mutations = {
  setFabricsList(state, item) {
    state.fabricsList = item
  }
}

export const actions = {
  async getFabricsList ({commit}, data){
    await this.$axios.$put('/api/v1/fabric-order/list', data).then(res => {
      commit('setFabricsList', res.data)
      this.$toast.success(res.data.message)
    }).catch(res => this.$toast.error(res.message))
  }
}
