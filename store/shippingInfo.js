export const state=()=>({
  shippingInfo:[],

})

export const getters = {
  shippingInfo: (state)=>state.shippingInfo,
}

export const mutations={
  setShippingInfo(state,details){
    state.shippingInfo=details;
  }
}

export const actions = {
  async getShippingInfo({commit},{id}){
    await this.$axios.get(`/api/v1/orders/shipping-info?orderId=${id}`)
    .then((res)=>{
      commit('setShippingInfo',res.data)
      console.log(res.data);
    })
    .catch((response)=>{
      console.log(response);
    })
  }
}