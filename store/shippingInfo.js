export const state=()=>({
  shippingInfo:{},
  newShippingInfoId:null,

})

export const getters = {
  shippingInfoDetail: (state)=>state.shippingInfo,
}

export const mutations={
  setShippingInfo(state,details){
    state.shippingInfo=details;
  },
  setNewShippingInfoId(state,id){
    state.newShippingInfoId=id;
  },
}

export const actions = {
  async getShippingInfo({commit},{id,modelId}){
    await this.$axios.get(`/api/v1/orders/shipping-info?orderId=${id}&modelId=${modelId}`)
    .then((res)=>{
      commit('setShippingInfo',res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  async createShippingInfo({dispatch},data){
    const body={
      actualShippingDate:data.actualShippingDate,
      actualShippingOrderQuantity:data.actualShippingOrderQuantity,
      actualShippingUnitId:data.quantityUnityId,
      orderClosingDate:data.orderClosingDate,
      orderId:data.id,
      modelId:data.modelId,
      packagingSize:data.packagingSize,
      packagingSizeUnitId:data.packagingSizeUnityId,
      soldPriceOfSurplusProduct:data.soldPriceOfSurplusProducts,
      soldPriceOfSurplusProductCurrency:data.soldPriceOfSurplusProductsCurrency,
      surplusProductQuantity:data.surplusProductsQuantity,
    }
    await this.$axios.put(`/api/v1/orders/set-shipping-info`,body)
    .then(res=>{
      console.log(res);
      dispatch('getShippingInfo',{id:body.orderId,modelId:body.modelId})
      this.$toast.success(res.data.message)
    })
    .catch(response=>{
      console.log(response);
      this.$toast.error(res.data.massage)
    })
  },

}

