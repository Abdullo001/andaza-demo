export const state=()=>({
  contractList:[],
})

export const getters={
  contractList: state => state.contractList,
}

export const mutations={
  setContractList(state,item){
    state.contractList=item
  },
}

export const actions={
  getContractList({commit},id){
    this.$axios.put(`/api/v1/order-contracts/list?orderId=${id}`)
    .then((res)=>{
      commit("setContractList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  createContract({dispatch},{data,orderId}){
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    this.$axios.post(`/api/v1/order-contracts/create`,data,config)
    .then((res)=>{
      dispatch("getContractList",orderId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  getOneContract({commit},id){
    this.$axios.get(`/api/v1/order-contracts/get?id=${id}`)
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  },


  deleteContract({dispatch},{id,orderId}){
    this.$axios.delete(`/api/v1/order-contracts/delete?id=${id}`)
    .then((res)=>{
      dispatch("getContractList",orderId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
}