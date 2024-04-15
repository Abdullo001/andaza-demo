export const state=()=>({
  supplyList:[],
  historyList:[],
})

export const getters={
  supplyList:(state)=>state.supplyList.content,
  totalElements:(state)=>state.supplyList.totalElements,
  historyList:(state)=>state.historyList,
}

export const mutations={
  setSupplyList(state,item){
    state.supplyList=item
  },
  setHistoryList(state,item){
    state.historyList=item
  },
}

export const actions={
  getSupplyList({commit},{page,size,modelNumber,orderNumber,status,partner}){
    const data={
      page,
      size,
      modelNumber:modelNumber??"",
      orderNumber:orderNumber??"",
      status:status??"",
      partner:partner??"",
    }
    this.$axios.put(`/api/v1/supply`,data)
    .then((res)=>{
      commit("setSupplyList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })

  },

  getSupplyHistory({commit},id){
    this.$axios.get(`/api/v1/supply/${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  spendSupply({dispatch},{id,data}){
    this.$axios.post(`/api/v1/supply/${id}`,data)
    .then((res)=>{
      dispatch("getSupplyList",{page:0,size:10})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message)

    })
  }
}