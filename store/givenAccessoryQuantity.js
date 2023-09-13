export const state=()=>({
  accessorysList: [],
  historyList:[],
})

export const getters={
  accessorysList: state=>state.accessorysList,
  historyList: state=>state.historyList,
}

export const mutations={
  setAccessorysList(state,item){
    state.accessorysList=item
  },
  setHistoryList(state,item){
    state.historyList=item
  },
}

export const actions={
  getAccessoryOwnList({commit},id){
    this.$axios.get(`/api/v1/accessory-process-detail/list-own?planningProcessId=${id}`)
    .then((res)=>{
      commit("setAccessorysList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getAccessorySubcontractList({commit},id){
    this.$axios.get(`/api/v1/accessory-process-detail/list-subcontractor?planningProcessId=${id}`)
    .then((res)=>{
      commit("setAccessorysList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  setAccessoryReturn({dispatch},{data,isSubcontract,processPlaningId}){
    this.$axios.put(`/api/v1/accessory-process-detail/return-accessory`,data)
    .then((res)=>{
      if(isSubcontract){
        dispatch("getAccessorySubcontractList",processPlaningId)
      }else{
        dispatch("getAccessoryOwnList",processPlaningId)
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/accessory-process-operation/list?processDetailId=${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

}