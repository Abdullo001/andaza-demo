export const state=()=>({
  workLogsInfo:{},
  workLogsReport:{},
  modelCategoryList:[],
  workLogsHistory:[],
  temporaryTable:[],
  totals:{},
  customOperations:[],
})

export const getters={
  workLogsInfo:(state)=>state.workLogsInfo,
  workLogsReport:(state)=>state.workLogsReport,
  modelCategoryList:(state)=>state.modelCategoryList,
  workLogsHistory:(state)=>state.workLogsHistory,
  temporaryTable: (state)=>state.temporaryTable,
  totals: (state)=>state.totals,
  customOperations: (state)=>state.customOperations,
}

export const mutations={
  setWorkLogsInfo(state,item){
    state.workLogsInfo=item
  },
  setWorkLogsReport(state,item){
    state.workLogsReport=item
  },
  setModelCategoryList(state,item){
    state.modelCategoryList=item
  },
  setWorkLogsHistory(state,item){
    state.workLogsHistory=item
  },
  setTemporaryTable(state,list){
    state.temporaryTable=list
  },
  setTotals(state,list){
    state.totals=list
  },
  setCustomOperations(state, list){
    state.customOperations = list
  }
}

export const actions={
  getWorkLogsInfo({commit},modelId){
    this.$axios.get(`/api/v1/work-logs/info/${modelId}`)
    .then((res)=>{
      commit("setWorkLogsInfo",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getWorkLogsReport({commit},date){
    this.$axios.get(`/api/v1/work-logs/report/${date}`)
    .then((res)=>{
      commit("setWorkLogsReport",)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getModelCategoryList({commit},modelCategoryId){
    this.$axios.get(`/api/v1/model-category-operations?modelCategoryId=${modelCategoryId}`)
    .then((res)=>{
      commit("setModelCategoryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);

    })
  },
  saveDailyWorkLogs({dispatch},{data,modelId}){
    this.$axios.post(`/api/v1/work-logs`,data)
    .then((_res)=>{
      dispatch("getWorkLogsInfo",modelId)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  getWorkLogsHistory({commit},employeeId){
    this.$axios.get(`/api/v1/work-logs/history/${employeeId}`)
    .then((res)=>{
      commit("setWorkLogsHistory",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getTotals({commit}, modelId){
    this.$axios.get(`/api/v1/work-logs/total/${modelId}`)
    .then((res)=>{
      commit("setTotals",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getCustomOperations({commit}, modelCategoryId){
    this.$axios.get(`/api/v1/model-category-operations/custom-operations?modelCategoryId=${modelCategoryId}`)
    .then((res) => {
      commit("setCustomOperations", res.data.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
