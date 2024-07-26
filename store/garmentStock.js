export const state=()=>({
  stockList:[],
  stockItem:{},
  stockId:{},
  calculation:{},
  sizeList:[],
  sizeQuantityList:[],
  sellingList:[],
})

export const getters={
  stockList:(state)=>state.stockList.content,
  totalElements:(state)=>state.stockList.totalElements,
  stockItem:(state)=>state.stockItem,
  stockId:(state)=>state.stockId,
  calculation:(state)=>state.calculation,
  sizeList:(state)=>state.sizeList,
  sizeQuantityList:(state)=>state.sizeQuantityList,
  sellingList:(state)=>state.sellingList,
}

export const mutations={
  setStockList(state,list){
    state.stockList=list
  },
  setStockItem(state,item){
    state.stockItem=item
  },
  setStockId(state,item){
    state.stockId={id:item,date:new Date()}
  },
  setCalculation(state,item){
    state.calculation=item
  },
  setSizeList(state,item){
    state.sizeList=item
  },
  setSizeQuantityList(state,item){
    state.sizeQuantityList=item
  },
  setSellingList(state,item){
    state.sellingList=item
  },
}

export const actions={
  getStockList({commit},{page,size,modelNumber="",modelName="",fromDate=null,toDate=null}){
    const data={
      page,size,
      modelName:modelName??"",
      modelNumber:modelNumber??"",
      fromDate:!!fromDate?fromDate:null,
      toDate:!!toDate?toDate:null,
    }
    this.$axios.put(`/api/v1/garment-stock`,data)
    .then((res)=>{
      commit("setStockList",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createStock({dispatch,commit},data){
    this.$axios.post(`/api/v1/garment-stock`,data)
    .then((res)=>{
      this.$toast.success("Success")
      commit("setStockId",res.data)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)

    })
  },
  updateStock({commit},{id,data}){
    this.$axios.put(`/api/v1/garment-stock/${id}`,data)
    .then((res)=>{
      this.$toast.success("Success")
      
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },
  getStock({commit},id){
    this.$axios.get(`/api/v1/garment-stock/${id}`)
    .then((res)=>{
      commit("setStockItem",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  setStockCalculation({dispatch},{data,id}){
    this.$axios.put(`/api/v1/garment-stock/calculation/${id}`,data)
    .then((res)=>{
      this.$toast.success("Success")
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)

    })
  },
  getStockCalculation({commit},id){
    this.$axios.get(`/api/v1/garment-stock/calculation/${id}`,)
    .then((res)=>{
      commit("setCalculation",res.data)
    })
    .catch((response)=>{
      console.log(response);

    })
  },

  getStockDistribution({commit},id){
    this.$axios.get(`/api/v1/garment-stock/distribution/${id}`)
    .then((res)=>{
      commit("setSizeQuantityList",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getStockSizes({commit},id){
    this.$axios.get(`/api/v1/garment-stock/size-distribution/info/${id}`)
    .then((res)=>{
      commit("setSizeList",res.data.sizes)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  saveStockSize({dispatch},data){
    this.$axios.post(`/api/v1/garment-stock/distribution`,data)
    .then((res)=>{
      this.$toast.success("Success")
      dispatch("getStockDistribution",data.stockId)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  updateStockSize({dispatch},{data,id}){
    this.$axios.put(`/api/v1/garment-stock/distribution/${id}`,data)
    .then((res)=>{
      this.$toast.success("Success")
      dispatch("getStockDistribution",data.stockId)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
      console.log(response);
    })
  },
  deleteStockSize({dispatch},{id,stockId}){
    this.$axios.delete(`/api/v1/garment-stock/distribution/${id}`)
    .then((res)=>{
      this.$toast.success("Success")
      dispatch("getStockDistribution",stockId)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  },

  getSellingList({commit},stockId){
    this.$axios.get(`/api/v1/garment-stock/sell/${stockId}`)
    .then((res)=>{
      commit("setSellingList",res.data)
      console.log(res);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  sellToShipping({dispatch},{data,id}){
    this.$axios.put(`/api/v1/garment-stock/sell/shipping/${id}`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getSellingList",data.stockId)
      console.log(res);
    })
    .catch((response)=>{
      console.log(response);
    })
  }
}