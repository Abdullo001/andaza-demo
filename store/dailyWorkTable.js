export const state=()=>({
  workLogsInfo:{},
  workLogsReport:{},
  modelCategoryList:[],
  workLogsHistory:[],
  temporaryTable:[],
})

export const getters={
  workLogsInfo:(state)=>state.workLogsInfo,
  workLogsReport:(state)=>state.workLogsReport,
  modelCategoryList:(state)=>state.modelCategoryList,
  workLogsHistory:(state)=>state.workLogsHistory,
  temporaryTable: (state)=>state.temporaryTable,
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
    // console.log(state.temporaryTable);
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
      dispatch("getModelCategoryList",data.modelCategoryId)
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
  }
}
