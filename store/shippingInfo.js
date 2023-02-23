export const state=()=>({
  shippingInfo:{},
  newShippingInfoId:null,
  measurementUnitList:[],

})

export const getters = {
  shippingInfoDetail: (state)=>state.shippingInfo,
  measurementUnitList: state=>state.measurementUnitList.data,
}

export const mutations={
  setShippingInfo(state,details){
    state.shippingInfo=details;
  },

  setNewShippingInfoId(state,id){
    state.newShippingInfoId=id;
  },

  getMeasurementUnitList(state,data){
    state.measurementUnitList=data;
  },


}

export const actions = {
  async getShippingInfo({commit},{id}){
    await this.$axios.get(`/api/v1/orders/shipping-info?orderId=${id}`)
    .then((res)=>{
      commit('setShippingInfo',res.data)
      console.log(res);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  async createShippingInfo({commit},data){
    const body={
      actualShippingDate:data.actualShippingDate,
      actualShippingOrderQuantity:data.actualShippingOrderQuantity,
      actualShippingUnitId:data.quantityUnityId,
      orderClosingDate:data.orderClosingDate,
      orderId:data.id,
      packagingSize:data.packagingSize,
      packagingSizeUnitId:data.packagingSizeUnityId,
      soldPriceOfSurplusProduct:data.soldPriceOfSurplusProducts,
      soldPriceOfSurplusProductCurrency:data.soldPriceOfSurplusProductsCurrency,
      surplusProductQuantity:data.surplusProductsQuantity,
    }
    await this.$axios.put(`/api/v1/orders/set-shipping-info`,body)
    .then(res=>{
      commit('setNewShippingInfoId',res.data.orderId)
      console.log(res);
    })
    .catch(response=>{
      console.log(response);
    })
  },

  async getMeasurementUnit({commit}){
    const body={
      filters:[],
      sorts:[],
      page:0,
      size:50,
    }
    
    await this.$axios.get(`/api/v1/measurement-unit/thin-list`)
    .then(res=>{
      commit('getMeasurementUnitList',res.data)
    })
    .catch(res=>{
      console.log(res);
    })
  }
}

