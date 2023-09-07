export const state=()=>({
  shortcomingsList:[],
})

export const getters={
  shortcomingsList: state=>state.shortcomingsList,
}

export const mutations={
  setShortcomingsList(state,list){
    state.shortcomingsList=list
  },
}

export const actions={
  getShortcomingsList({commit},id){
    this.$axios.get(`/api/v1/classification/list-own-common?planningProcessId=${id}`)
    .then((res)=>{
      commit("setShortcomingsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getSubcontractShortcomingsList({commit},id){
    this.$axios.get(`/api/v1/classification/list-subcontractor-common?planningProcessId=${id}`)
    .then((res)=>{
      commit("setShortcomingsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createShortcomingsList({dispatch},{data,id}){
    this.$axios.post(`/api/v1/classification/create-common`,data)
    .then((res)=>{
      if(data.status==="subcontract_classification"){
        dispatch("getSubcontractShortcomingsList",id)
      }else{
        dispatch("getShortcomingsList",id)
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  updateShortcomings({dispatch},{data,id}){
    this.$axios.put(`/api/v1/classification/update`,data)
    .then((res)=>{
      if(data.partner){
        dispatch("getSubcontractShortcomingsList",id)
      }else{
        dispatch("getShortcomingsList",id)
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  deleteShortcomings({dispatch},{id,planningProcessId}){
    this.$axios.delete(`/api/v1/classification/delete?id=${id}`)
    .then((res)=>{
      dispatch("getShortcomingsList",planningProcessId)
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
}