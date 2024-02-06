export const state=()=>({
  orderQuantity:[],
  prefinancesQuantity:[],
})

export const getters={
  orderQuantity:(state)=>state.orderQuantity,
  prefinancesQuantity:(state)=>state.prefinancesQuantity,
}

export const mutations={
  setOrderQuantity(state,item){
    state.orderQuantity=item
  },
  setPrefinancesQuantity(state,item){
    state.prefinancesQuantity=item
  },
}

export const actions={
  getOrderQuantity({commit},date){
    this.$axios.get(`/api/v1/report/model/order/quantity?date=${date}`)
    .then((res)=>{
      commit("setOrderQuantity",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getPrefinancesQuantity({commit},date){
    this.$axios.get(`/api/v1/report/pre-finance/quantity?date=${date}`)
    .then((res)=>{
      console.log(res);
      commit("setPrefinancesQuantity",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
}