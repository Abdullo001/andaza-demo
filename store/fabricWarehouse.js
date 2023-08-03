export const state=()=>({
  fabricWarehouseList:[],
  sipNumbers:[],
  toSipNumbers:[],
})

export const getters={
  fabricWarehouseList: state=>state.fabricWarehouseList.content,
  sipNumbers: state=>state.sipNumbers,
  toSipNumbers: state=>state.toSipNumbers

}

export const mutations={
  setFabricWarehouseList(state,item){
    state.fabricWarehouseList=item
  },
  setSipNumbers(state,item){
    state.sipNumbers=item
  },
  setToSipNumbers(state,item){
    state.toSipNumbers=item
  }
}

export const actions={
  getFabricWarehouseList({commit}){
    const body={
      filters:[],
      sorts:[],
      page:0,
      size:10,
    }
    this.$axios.put(`/api/v1/fabric-warehouse/list`,body)
    .then((res)=>{
      commit("setFabricWarehouseList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createFabricWarehouse({dispatch},data){
    this.$axios.post(`/api/v1/fabric-warehouse/create`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getFabricWarehouseList")
    })
    .catch((res)=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  getSipNumbers({commit}){
    this.$axios.get(`/api/v1/fabric-order/sip-numbers`)
    .then((res)=>{
      commit("setSipNumbers",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  updateFabricWarehouse({dispatch},data){
    this.$axios.put(`/api/v1/fabric-warehouse/update`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getFabricWarehouseList")
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
  
  deleteFabricWarehouse({dispatch},id){
    this.$axios.delete(`/api/v1/fabric-warehouse/delete?id=${id}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getFabricWarehouseList")
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  getToSipNumbers({commit}){
    this.$axios.get(`/api/v1/fabric-warehouse/sip-numbers`)
    .then((res)=>{
      commit("setToSipNumbers",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  setSpendingFabric({dispatch},data){
    this.$axios.put(`/api/v1/fabric-warehouse/spend-fabric`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getFabricWarehouseList")
    })
    .catch(({response})=>{
      console.log(response);
        this.$toast.error(response.data.message);

    })
  }


}