export const state=()=>({
  ownList:[],
  planningProcessId:null,
  orderQuantityList:[],
})

export const getters={
  ownList: state=>state.ownList,
  orderQuantityList: state=>state.orderQuantityList
}

export const mutations={
  setOwnList(state,item){
    state.ownList=item
  },
  setPlanningProcessId(state,item){
    state.planningProcessId=item
  },
  setOrderQuantityList(state,item){
    state.orderQuantityList=item
  }
}

export const actions={
  getOwnList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${state.planningProcessId}`)
    .then((res)=>{
      console.log(res);
      commit("setOwnList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  updateCommonProcess({dispatch},data){
    this.$axios.put(`/api/v1/common-process-details/update`,data)
    .then((res)=>{
      dispatch("getOwnList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  deleteCommonProcess({dispatch},id){
    this.$axios.delete(`/api/v1/common-process-details/delete?id=${id}`)
    .then((res)=>{
      dispatch("getOwnList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  getOrderQuantityList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/order-quantities?planningProcessId=${state.planningProcessId}`)
    .then((res)=>{
      commit("setOrderQuantityList",res.data.data)
    })
    .catch(({res})=>{
      console.log(res);
    })
  }

  

}