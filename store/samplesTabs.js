export const state=()=>({
  chartList:[],
  mainColorsList:[],
})

export const getters={
  chartList:state=>state.chartList,
  mainColorsList:state=>state.mainColorsList,

}

export const mutations={
  setChartList(state,item){
    state.chartList=item
  },
  setMainColorsList(state,item){
    state.mainColorsList=item
  },
}

export const actions={
  getChartList({commit},{planningId,purpose}){
    this.$axios.get(`/api/v1/sample-planning-chart/list?planningId=${planningId}&purpose=${purpose}`)
    .then((res)=>{
      console.log(res);
      commit("setChartList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getOneChart({commit},){
    this.$axios.get(`/api/v1/sample-planning-chart/get-one?id=${2}&purpose=FQS`)
    .then((res)=>{
      console.log(res);
      // commit("setChartList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createChartRow({dispatch},data){
    this.$axios.post(`/api/v1/sample-planning-chart/create`,data)
    .then((res)=>{
      console.log(res);
      dispatch("getChartList",{planningId:data.samplePlanningId,purpose:data.purpose})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);

    })
  },

  deleteChartRow({dispatch},{id,planningId,purpose}){
    this.$axios.delete(`/api/v1/sample-planning-chart/delete?id=${id}`)
    .then((res)=>{
      dispatch("getChartList",{planningId,purpose})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  updateChartRow({dispatch},data){
    this.$axios.put(`/api/v1/sample-planning-chart/update`,data)
    .then((res)=>{
      dispatch("getChartList",{planningId:data.samplePlanningId,purpose:data.purpose})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);

    })
  },

  getSizesList({commit},modelId){
    this.$axios.get(`/api/v1/sample-planning-chart/model-sizes?modelId=${modelId}`)
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  getMainColors({commit},modelId){
    this.$axios.get(`/api/v1/colors/model-main-colors?modelId=${modelId}`)
    .then((res)=>{
      commit("setMainColorsList",res.data.data)
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  }
}