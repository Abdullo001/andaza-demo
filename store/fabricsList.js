export const state = () => ({
  fabricsList: [],
})

export const getters = {
  fabricsList: state => state.fabricsList.items,
  totalElements: state => state.fabricsList.totalElements
}

export const mutations = {
  setFabricsList(state, item) {
    state.fabricsList = item
  }
}

export const actions = {
  async getFabricsList ({commit}, data){
    let {modelNumber,orderNumber,page,size,sipNumber}=data
    modelNumber=modelNumber??""
    orderNumber=orderNumber??""
    sipNumber=sipNumber??""
    await this.$axios.get(`/api/v1/fabric-order/fabric-list?modelNumber=${modelNumber}&orderNumber=${orderNumber}&page=${page}&size=${size}&sipNumber=${sipNumber}`)
    .then(res => {
      commit('setFabricsList', res.data.data)
      this.$toast.success(res.data.message)
    }).catch(res => this.$toast.error(res.message))
  }
}
