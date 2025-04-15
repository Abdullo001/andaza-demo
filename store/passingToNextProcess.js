export const state=()=>({
  passingList:[],
  historyProcessableList:[],
  nextProcessList:[],
  kittedList:[],
  secondKittedList:[],

})


export const getters={
  passingList: state=>state.passingList,
  historyProcessableList: state=>state.historyProcessableList,
  nextProcessList: state=>state.nextProcessList,
  kittedList: state=>state.kittedList,
  secondKittedList: state=>state.secondKittedList,
}

export const mutations={
  setPassingList(state,item){
    state.passingList=item
  },
  setHistoryProcessableList(state,item){
    state.historyProcessableList=item
  },
  setNextProcessList(state,item){
    state.nextProcessList=item
  },
  setKittedList(state,item){
    state.kittedList=item
  },
  setSecondKittedList(state,item){
    state.secondKittedList=item
  },

}

export const actions={
  getPassingList({commit},id){
    this.$axios.get(`/api/v1/processable-entity/common-pass-next-process?planningProcessId=${id}&operationType=FIRST_CLASS`)
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
    this.$axios.get(`/api/v1/common-process-operations/list?processableEntityId=${id}&firstSort=true`)
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
  },

  getNextProcessList({commit},id){
    this.$axios.get(`/api/v1/process-planning/next-processes?id=${id}`)
    .then((res)=>{
      commit("setNextProcessList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  setReadyGarmentWarehouse({dispatch},data){
    this.$axios.put(`/api/v1/processable-entity/give-ready-garment`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  getPassingListForSorting({commit},id){
    this.$axios.get(`/api/v1/processable-entity/sorting-pass-next-process?planningProcessId=${id}`)
    .then((res)=>{
      commit("setPassingList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  sendToWasteWarehouse({dispatch},{payload, planningProcessId}){
    this.$axios.put(`/api/v1/sorting-process-details/give-waste`,payload)
    .then((res)=>{
      dispatch("getPassingListForSorting",planningProcessId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
  giveCitting({dispatch},{payload, planningProcessId}){
    this.$axios.put(`/api/v1/sorting-process-details/give-kitting`,payload)
    .then((res)=>{
      dispatch("getPassingListForSorting",planningProcessId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
  async getKittedList({commit},{planningProcessId,isSecond}){
    await this.$axios.get(`/api/v1/kitting-operation/list?planningProcessId=${planningProcessId}&isSecond=${isSecond}`)
    .then((res)=>{
      if(isSecond){
        commit("setSecondKittedList",res.data.data)
      }else{
        commit("setKittedList",res.data.data)
      }
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  async passKittedItem({dispatch},{payload, planningProcessId, isSecond}){
    await this.$axios.put(`/api/v1/kitting-operation/pass-next-process`,payload)
    .then((res)=>{
      dispatch("getKittedList",{planningProcessId, isSecond: isSecond})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
  async getSortingHistory({commit}, id){
    await this.$axios.get(`/api/v1/kitting-operation/history?kittingOperationId=${id}`)
    .then((res)=>{
      commit("setHistoryProcessableList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  }

}
