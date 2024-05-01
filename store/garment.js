export const state=()=>({
  itemList:[],
  secondSortList:[],
  modelSizes:[],
  domesticList:[],
  garmentList:[],
})

export const getters={
  itemList:(state)=>state.itemList,
  modelSizes:(state)=>state.modelSizes,
  domesticList:(state)=>state.domesticList,
  secondSortList:(state)=>state.secondSortList,
  garmentList:(state)=>state.garmentList,
}

export const mutations={
  setItemList(state,item){
    state.itemList=item
  },
  setModelSizes(state,item){
    state.modelSizes=item
  },
  setDomesticList(state,item){
    state.domesticList=item
  },
  setSecondSortList(state,item){
    state.secondSortList=item
  },
  setGarmentList(state,item){
    state.garmentList=item
  },
}

export const actions={
  getItemList({commit},{warehouseId,type}){
    this.$axios.get(`/api/v1/general/garment?warehouseId=${warehouseId}&type=${type}`)
    .then((res)=>{
      if(type==="OVERPRODUCTION"){
        commit("setItemList",res.data.data)
      }
      if(type==="SECOND_SORT"){
        commit("setSecondSortList",res.data.data)
      }
      if(type==="READY_GARMENT"){
        commit("setGarmentList",res.data.data)
      }

    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createItem({dispatch},data){
    this.$axios.post(`/api/v1/general/garment`,data)
    .then((res)=>{
      dispatch("getItemList",{warehouseId:data.warehouseId,type:data.type})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  },

  updateItem({dispatch},{data,id}){
    this.$axios.put(`/api/v1/general/garment/${id}`,data)
    .then((res)=>{
      dispatch("getItemList",{warehouseId:data.warehouseId,type:data.type})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  },

  deleteItem({dispatch},{id,type,warehouseId}){
    this.$axios.delete(`/api/v1/general/garment/${id}`)
    .then((res)=>{
      dispatch("getItemList",{warehouseId:warehouseId,type:type})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  },

  getModelsizes({commit},id){
    this.$axios.get(`/api/v1/models/sizes/${id}`)
    .then((res)=>{
      commit("setModelSizes",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getDomesticList({commit},warehouseId){
    this.$axios.get(`/api/v1/general/domestic?warehouseId=${warehouseId}`,)
    .then((res)=>{
      commit("setDomesticList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  itemSellDomestic({dispatch},data){
    this.$axios.post(`/api/v1/general/domestic`,data)
    .then((res)=>{
      dispatch("getDomesticList",data.warehouseId)
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  }

}