
export const state=()=>({
  cuttingList:[],
  planningProcessId:null,
  historyList:[],
  classificationList:[],
  orderQuantityList:[],

})

export const getters={
  planningProcessId: state=>state.planningProcessId,
  cuttingList: state=>state.cuttingList,
  historyList: state=>state.historyList,
  classificationList: state=>state.classificationList,
  orderQuantityList: state=>state.orderQuantityList,
  planningProcessId:state=>state.planningProcessId,
}

export const mutations = {
  setCuttingList(state, item) {
    state.cuttingList = item
  },
  setPlanningProcessId(state, item) {
    state.planningProcessId = item
  },
  setHistoryList(state,item){
    state.historyList=item
  },
  setClassificationList(state,item){
    state.classificationList=item
  },
  setOrderQuantityList(state,item){
    state.orderQuantityList=item
  },
}

export const actions = {
  getCuttingList({commit, state}) {
    if(!!state.planningProcessId)
    this.$axios.get(`/api/v1/process-details/list-own?planningProcessId=${state.planningProcessId}`)
      .then((res) => {
        commit("setCuttingList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  setUpdateSizes({dispatch,state},data){
    this.$axios.put(`/api/v1/process-details/update`,data)
    .then((res)=>{
      dispatch("getCuttingList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  deleteCuttingSizes({dispatch},id){
    this.$axios.delete(`/api/v1/process-details/delete?id=${id}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  getOneCutting({dispatch,state},id){
    this.$axios.get(`/api/v1/process-details/get-one?id=${id}`)
    .then((res)=>{
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/cutting-operation/list?detailsId=${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  setHistoryItem({dispatch},data){
    this.$axios.put(`/api/v1/cutting-operation/update`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  deleteHistoryFunc({dispatch},{id,processId}){
    this.$axios.delete(`/api/v1/cutting-operation/delete?id=${id}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
      dispatch("getHistoryList",processId)
    })
    .catch((res)=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  saveReturnFabric({dispatch},data){ 
    this.$axios.put(`/api/v1/process-details/return-fabric`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  getClassificationList({commit,state}){
    this.$axios.get(`/api/v1/classification/list-own?planningProcessId=${state.planningProcessId}`)
    .then((res)=>{
      commit("setClassificationList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createClassification({dispatch},data){
    this.$axios.post(`/api/v1/classification/create`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
      dispatch("getClassificationList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  deleteClassification({dispatch},id){
    this.$axios.delete(`/api/v1/classification/delete?id=${id}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
      dispatch("getClassificationList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  updateClassification({dispatch},data){
    this.$axios.put(`/api/v1/classification/update`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getCuttingList")
      dispatch("getClassificationList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  getOrderQuantity({commit},id){
    this.$axios.get(`/api/v1/process-details/order-quantities?modelId=${id}`)
    .then((res)=>{
      commit("setOrderQuantityList",res.data.data)

    })
    .catch((res)=>{
      console.log(res);
    })
  },

  setMainColor({dispatch},id){
    this.$axios.put(`/api/v1/process-details/set-main?id=${id}`)
    .then((res)=>{
      dispatch("getCuttingList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  setWasteFabric({dispatch,state},data){
    this.$axios.put(`/api/v1/process-details/set-waste-fabric`,data)
    .then((res)=>{
      dispatch("getCuttingList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
}
