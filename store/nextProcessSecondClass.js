export const state=()=>({
  secondList:[],
})

export const getters={
  secondList: state=>state.secondList,
}

export const mutations={
  setSecondList(state,item){
    state.secondList=item
  },
}

export const actions={
  getSecondList({commit},id){
    this.$axios.get(`/api/v1/processable-entity/common-pass-next-process?planningProcessId=${id}&operationType=SECOND_CLASS`)
    .then((res)=>{
      commit("setSecondList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  giveReadyWarehouse({dispatch},{data,id}){
    this.$axios.put(`/api/v1/common-process-details/transfer/ready-garment-warehouse`,data)
    .then((res)=>{
      dispatch("getSecondList",id)
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
}