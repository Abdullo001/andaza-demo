export const state=()=>({
  mainColorsList:[],
  modelPrintList:[],

})

export const getters={
  mainColorsList:state=>state.mainColorsList,
  modelPrintList:state=>state.modelPrintList,
}

export const mutations={
  setMainColorsList(state,item){
    state.mainColorsList=item
  },
  setModelPrintList(state,item){
    state.modelPrintList=item
  },
}

export const actions={
  getMainColorsList({commit},id){
    this.$axios.get(`/api/v1/order-prints/main-colors?modelId=${id}`)
    .then((res)=>{
      commit("setMainColorsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  createModelPrint({dispatch},{data,modelId}){
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    this.$axios.post(`/api/v1/order-prints/create`,data,config)
    .then((res)=>{
      dispatch("getModelPrintList",modelId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },
  getModelPrintList({commit},id){
    this.$axios.get(`/api/v1/order-prints/list?modelId=${id}`)
    .then((res)=>{
      commit("setModelPrintList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getOneModelPrint({commit},id){
    this.$axios.get(`/api/v1/order-prints/get?id=${id}`)
    .then((res)=>{
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  deleteModelPrint({dispatch},{id,modelId}){
    this.$axios.delete(`/api/v1/order-prints/delete?id=${id}`)
    .then((res)=>{
      dispatch("getModelPrintList",modelId)
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  updateModelPrint({dispatch},{data,modelId}){
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    this.$axios.put(`/api/v1/order-prints/update`,data,config)
    .then((res)=>{
      dispatch("getModelPrintList",modelId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
  
}