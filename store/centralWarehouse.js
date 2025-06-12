export const state=()=>({
  warehouseList:[],
  historyList:[],
})

export const getters={
  warehouseList:(state)=>state.warehouseList.items,
  totalElements:(state)=>state.warehouseList.totalElements,
  historyList:(state)=>state.historyList,
}

export const mutations={
  setWarehouseList(state,item){
    state.warehouseList=item
  },
  setHistoryList(state,item){
    state.historyList=item
  },
}

export const actions={
  getWarehouseList({commit},{page,size,department="",productName="",supplier=""}){
    this.$axios.get(`/api/v1/central-warehouse?page=${page}&size=${size}&department=${department}&productName=${productName}&supplier=${supplier}`)
    .then((res)=>{
      commit("setWarehouseList",res.data.data)

    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/central-warehouse/operation-history/${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)

    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createWarehouseItem({dispatch},data){
    this.$axios.post(`/api/v1/central-warehouse`,data)
    .then((res)=>{
      this.$toast.success(res.data.code)
      dispatch("getWarehouseList",{page:0,size:10})
    })
    .then((response)=>{
      this.$toast.error(response?.data.code)
    })
  },
  updateWarehouseItem({dispatch},{centralWarehouseId,data}){
    this.$axios.put(`/api/v1/central-warehouse/${centralWarehouseId}`,data)
    .then((res)=>{
      this.$toast.success(res.data.code)
      dispatch("getWarehouseList",{page:0,size:10})
    })
    .then(({response})=>{
      this.$toast.error(response.data.code)
    })
  },
  deleteWarehouseItem({dispatch},centralWarehouseId){
    this.$axios.delete(`/api/v1/central-warehouse/${centralWarehouseId}`)
    .then((res)=>{
      this.$toast.success(res.data.code)
      dispatch("getWarehouseList",{page:0,size:10})
    })
    .then(({response})=>{
      this.$toast.error(response.data.code)
    })
  },
  async spendWarehouseItem({dispatch},{centralWarehouseId,data}){
    await this.$axios.patch(`/api/v1/central-warehouse/${centralWarehouseId}`,data)
    .then((res)=>{
      dispatch("getWarehouseList",{page:0,size:10})
    })
    .catch(({response})=>{
      this.$toast.error(response.data.code)
    })
  },
}
