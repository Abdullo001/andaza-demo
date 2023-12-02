export const state = () => ({
  passingToNextProcess: [],
})
export const getters = {
  shippingModelsList: state => state.shippingModelsList
}
export const mutations = {
  setShippingModelsList(state, item) {
    state.shippingModelsList = item
  }
}
export const actions = {
  getShippingModelsList(){

}
}
