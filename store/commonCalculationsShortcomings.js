export const state=()=>({
  shortcomingsList:[],
  type:{},
  allClassificationList:[],
  allSubcontractClassificationList:[],
})

export const getters={
  shortcomingsList: state=>state.shortcomingsList,
  type: state=>state.type,
  allClassificationList: state=>state.allClassificationList,
  allSubcontractClassificationList: state=>state.allSubcontractClassificationList,
}

export const mutations={
  setShortcomingsList(state,list){
    state.shortcomingsList=list
  },
  setType(state,item){
    state.type=item
  },
  setAllSubcontractClassificationList(state,item){
    state.allSubcontractClassificationList=item
  },
  setAllClassificationList(state,item){
    state.allClassificationList=item
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

  getAllClassificationList({commit},productionId){
    this.$axios.get(`/api/v1/classification/list-all?productionId=${productionId}`)
    .then((res)=>{
      commit("setAllClassificationList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getAllSubcontractClassificationList({commit},productionId){
    this.$axios.get(`/api/v1/classification/list-subcontractor-all?productionId=${productionId}`)
    .then((res)=>{
      commit("setAllSubcontractClassificationList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);

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
  },
  getShortcomingsListSorting({commit},{id,type}){
    this.$axios.get(`/api/v1/classification/list-own-sorting?planningProcessId=${id}&type=${type}`)
    .then((res)=>{
      commit("setShortcomingsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res)
    })
  },
  getSubcontractShortcomingsListSorting({commit},{id,type}){
    this.$axios.get(`/api/v1/classification/list-subcontractor-sorting?planningProcessId=${id}&type=${type}`)
    .then((res)=>{
      commit("setShortcomingsList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  createShortcomingsListSorting({dispatch,commit},{data,id}){
    this.$axios.post(`/api/v1/classification/create-sorting`,data)
    .then((res)=>{
      if(data.status==="subcontract_classification"){
        dispatch("getSubcontractShortcomingsListSorting",{id,type:"IN_PRODUCTION"})
      }else{
        dispatch("getShortcomingsListSorting",{id,type:"IN_PRODUCTION"})
      }
      commit("setType",{text:"IN_PRODUCTION",date: new Date ()})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  updateShortcomingsSorting({dispatch},{data,id,type}){
    this.$axios.put(`/api/v1/classification/update`,data)
    .then((res)=>{
      if(data.partner){
        dispatch("getSubcontractShortcomingsListSorting",{id,type})
      }else{
        dispatch("getShortcomingsListSorting",{id,type})
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  deleteShortcomingsSorting({dispatch},{data,planningProcessId,type}){
    this.$axios.delete(`/api/v1/classification/delete?id=${data.id}`)
    .then((res)=>{
      if(data.partner){
        dispatch("getSubcontractShortcomingsListSorting",{id:planningProcessId,type})
      }else{
        dispatch("getShortcomingsListSorting",{id:planningProcessId,type})
      }
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

}
