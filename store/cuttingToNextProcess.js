export const state=()=>({
  passingList:[],
  historyProcessableList:[],

})


export const getters={
  passingList: state=>state.passingList,
  historyProcessableList: state=>state.historyProcessableList,

}

export const mutations={
  setPassingList(state,item){
    state.passingList=item
  },
  setHistoryProcessableList(state,item){
    state.historyProcessableList=item
  },

}

export const actions={
  getPassingList({commit},id){
    this.$axios.get(`/api/v1/processable-entity/fabric-pass-next-process?planningProcessId=${id}`)
    .then((res)=>{
      commit("setPassingList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  setUpdatePass({dispatch},data){
    this.$axios.put(`/api/v1/processable-entity/pass-next-process`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getPassingList",data.planningProcessId)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  getHistoryProcessableList({commit},id){
    this.$axios.get(`/api/v1/common-process-operations/list?processableEntityId=${id}`)
    .then((res)=>{
      commit("setHistoryProcessableList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  deleteHistoryProcessable({dispatch},{id,entityId,processId}){
    this.$axios.delete(`/api/v1/common-process-operations/delete?id=${id}`)
    .then((res)=>{
      dispatch("getHistoryProcessableList",entityId)
      dispatch("getPassingList",processId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  setHistoryProcessable({dispatch},{processId,data}){
    this.$axios.put(`/api/v1/common-process-operations/update`,data)
    .then((res)=>{
      dispatch("getPassingList",processId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)

    })
  }
}