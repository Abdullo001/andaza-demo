export const state=()=>({
  shortcomingsList:[],
  type:{},
})

export const getters={
  shortcomingsList: state=>state.shortcomingsList,
  type: state=>state.type,
}

export const mutations={
  setShortcomingsList(state,list){
    state.shortcomingsList=list
  },
  setType(state,item){
    state.type=item
  },
}

export const actions={
  getShortcomingsList({commit},{id,type}){
    this.$axios.get(`/api/v1/classification/list-own-common?planningProcessId=${id}&type=${type}`)
    .then((res)=>{
      commit("setShortcomingsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getSubcontractShortcomingsList({commit},{id,type}){
    this.$axios.get(`/api/v1/classification/list-subcontractor-common?planningProcessId=${id}&type=${type}`)
    .then((res)=>{
      commit("setShortcomingsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createShortcomingsList({dispatch,commit},{data,id}){
    this.$axios.post(`/api/v1/classification/create-common`,data)
    .then((res)=>{
      if(data.status==="subcontract_classification"){
        dispatch("getSubcontractShortcomingsList",{id,type:"IN_PRODUCTION"})
      }else{
        dispatch("getShortcomingsList",{id,type:"IN_PRODUCTION"})
      }
      commit("setType",{text:"IN_PRODUCTION",date: new Date ()})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  updateShortcomings({dispatch},{data,id,type}){
    this.$axios.put(`/api/v1/classification/update`,data)
    .then((res)=>{
      if(data.partner){
        dispatch("getSubcontractShortcomingsList",{id,type})
      }else{
        dispatch("getShortcomingsList",{id,type})
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  deleteShortcomings({dispatch},{data,planningProcessId,type}){
    this.$axios.delete(`/api/v1/classification/delete?id=${data.id}`)
    .then((res)=>{
      if(data.partner){
        dispatch("getSubcontractShortcomingsList",{id:planningProcessId,type})
      }else{
        dispatch("getShortcomingsList",{id:planningProcessId,type})
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
}