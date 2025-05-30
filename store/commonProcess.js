export const state = () => ({
  ownList: [],
  secondClassList:[],
  sentToAlterationList:[],
  planningProcessId: null,
  orderQuantityList: [],
  subcontractList:[],
  subcontractSecondClassList:[],
  subcontractSentToAlterationList:[],
  isConfirm:{},
  streamList:[],
})

export const getters = {
  ownList: state => state.ownList,
  secondClassList: state => state.secondClassList,
  sentToAlterationList: state => state.sentToAlterationList,
  orderQuantityList: state => state.orderQuantityList,
  planningProcessId: state => state.planningProcessId,
  subcontractList: state => state.subcontractList,
  subcontractSecondClassList: state => state.subcontractSecondClassList,
  subcontractSentToAlterationList: state => state.subcontractSentToAlterationList,
  isConfirm: state => state.isConfirm,
  streamList: state => state.streamList,
}

export const mutations = {
  setIsConfirm(state, item) {
    state.isConfirm = item
  },
  setOwnList(state, item) {
    state.ownList = item
  },
  setSecondClassList(state, item) {
    state.secondClassList = item
  },
  setSentToAlterationList(state, item) {
    state.sentToAlterationList = item
  },
  setPlanningProcessId(state, item) {
    state.planningProcessId = item
  },
  setOrderQuantityList(state, item) {
    state.orderQuantityList = item
  },
  setSubcontractList(state,item){
    state.subcontractList = item
  },
  setSubcontractSecondClassList(state,item){
    state.subcontractSecondClassList = item
  },
  setSubcontractSentToAlterationList(state,item){
    state.subcontractSentToAlterationList = item
  },
  setStreamList(state,item){
    state.streamList = item
  },
}

export const actions = {
  getOwnList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${state.planningProcessId}&commonOperationType=FIRST_CLASS`)
      .then((res) => {
        commit("setOwnList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },
  getSecondClassList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${ state.planningProcessId}&commonOperationType=SECOND_CLASS`)
      .then((res) => {
        commit("setSecondClassList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },
  getSentToAlterationList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${ state.planningProcessId}&commonOperationType=SENT_TO_ALTERATION`)
      .then((res) => {
        commit("setSentToAlterationList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  updateCommonProcess({dispatch}, data) {
    this.$axios.put(`/api/v1/common-process-details/${data.id}`, data)
      .then((res) => {
        if(Object.keys(data).length===6){
          dispatch("getOwnList")
        }else{
          dispatch("getSubcontarctList")
        }
        this.$toast.success(res.data.message)
      })
      .catch(({res}) => {
        this.$toast.error(res.data.message)
      })
  },
  updateSecondClassProcess({dispatch}, data) {
    this.$axios.put(`/api/v1/common-process-details/${data.id}`, data)
      .then((res) => {
        if(data.operationType!=="SECOND_CLASS_SUBCONTRACTOR"){
          dispatch("getSecondClassList")
        }else{
          dispatch("getSubcontarctSecondClassList")
        }
        this.$toast.success(res.data.message)
      })
      .catch(({res}) => {
        this.$toast.error(res.data.message)
      })
  },
  updateSentToAlterationProcess({dispatch}, data) {
    this.$axios.put(`/api/v1/common-process-details/${data.id}`, data)
      .then((res) => {
        if(data.operationType!=="SENT_TO_ALTERATION_SUBCONTRACTOR"){
          dispatch("getSentToAlterationList")
        }else{
          dispatch("getSubcontractSentToAlterationList")
        }
        this.$toast.success(res.data.message)
      })
      .catch(({res}) => {
        this.$toast.error(res.data.message)
      })
  },

  deleteCommonProcess({dispatch}, id) {
    this.$axios.delete(`/api/v1/common-process-details/delete?id=${id}`)
      .then((res) => {
        dispatch("getOwnList")
        dispatch("getSubcontarctList")
        this.$toast.success(res.data.message)
      })
      .catch(({res}) => {
        console.log(res);
        this.$toast.error(res.data.message)
      })
  },
  deleteSecondProcessProcess({dispatch}, id) {
    this.$axios.delete(`/api/v1/common-process-details/delete?id=${id}`)
      .then((res) => {
        dispatch("getSecondClassList")
        dispatch("getSubcontarctSecondClassList")
        this.$toast.success(res.data.message)
      })
      .catch(({res}) => {
        console.log(res);
        this.$toast.error(res.data.message)
      })
  },
  deleteSentToAlterationProcess({dispatch}, id) {
    this.$axios.delete(`/api/v1/common-process-details/delete?id=${id}`)
      .then((res) => {
        dispatch("getSentToAlterationList")
        dispatch("getSubcontractSentToAlterationList")
        this.$toast.success(res.data.message)
      })
      .catch(({res}) => {
        console.log(res);
        this.$toast.error(res.data.message)
      })
  },

  getOrderQuantityList({commit, state},isSubcontractor) {
    this.$axios.get(`/api/v1/common-process-details/order-quantities?planningProcessId=${state.planningProcessId}&isForSubcontractor=${isSubcontractor}`)
      .then((res) => {
        commit("setOrderQuantityList", res.data.data)
      })
      .catch(({res}) => {
        console.log(res);
      })
  },
  getOrderQuantityListSorting({commit, state}) {
    this.$axios.get(`/api/v1/sorting-process-details/order-quantities?planningProcessId=${state.planningProcessId}`)
      .then((res) => {
        commit("setOrderQuantityList", res.data.data)
      })
      .catch(({res}) => {
        console.log(res);
      })
  },

  getSubcontarctSecondClassList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&commonOperationType=SECOND_CLASS_SUBCONTRACTOR`)
    .then((res)=>{
      commit("setSecondClassList",res.data.data)
    })
    .catch((res) => {
      console.log(res);
    })
  },
  getSubcontractSentToAlterationList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&commonOperationType=SENT_TO_ALTERATION_SUBCONTRACTOR`)
    .then((res)=>{
      commit("setSentToAlterationList",res.data.data)
    })
    .catch((res) => {
      console.log(res);
    })
  },
  getSubcontarctList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&commonOperationType=FIRST_CLASS`)
    .then((res)=>{
      commit("setSubcontractList",res.data.data)
    })
    .catch((res) => {
      console.log(res);
    })
  },

  changeStatusCommon({dispatch},{id,status}){
    this.$axios.put(`/api/v1/common-process-details/change-status?id=${id}&status=${status}`)
    .then((res)=>{
      dispatch("getSubcontarctList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  refuseApprove({dispatch,state},{data,type}){
    this.$axios.post(`/api/v1/classification/refuse-approve`,data)
    .then((res)=>{
      dispatch("getOrderQuantityList")
      if(type==="OWN"){
        dispatch("commonCalculationsShortcomings/getShortcomingsList",{id:state.planningProcessId,type:"INCOMING"},{root:true})
      }
      if(type==="SUB"){
        dispatch("commonCalculationsShortcomings/getSubcontractShortcomingsList",{id:state.planningProcessId,type:"INCOMING"},{root:true})
      }
      this.$toast.success(res.data.message)
    })
    .catch((response)=>{
      console.log(response);
      this.$toast.error(response.data.message)

    })
  },
  confirmApprove({dispatch,state},data){
    this.$axios.put(`/api/v1/process-planning/${state.planningProcessId}?isConfirm=${data.isConfirm}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
      console.log(response);
    })
  },

  getPatokList({commit}){
    this.$axios.get(`/api/v1/streams`)
    .then((res)=>{
      commit("setStreamList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getSortingOwn({commit,state},isSecond){
    this.$axios.get(`/api/v1/sorting-process-details/list-own?planningProcessId=${state.planningProcessId}&isSecond=${isSecond}`)
    .then((res)=>{
      const data = res.data.data.map(item => {
        return {
          ...item,
          sizeDistributionList: item.sizeDistributions,
          receivedQuantity: item.totalQuantity,
        }
      })
      if(!isSecond){
        commit("setOwnList", data)
      }else{
        commit("setSecondClassList", data)
      }
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  updateSorting({dispatch},{payload, sortingProcessDetailsId, isSecond}){
    this.$axios.put(`/api/v1/sorting-process-details/${sortingProcessDetailsId}`,payload)
    .then((res)=>{
      console.log(payload);
      if(payload.type==="SUBCONTRACTOR"){
        dispatch("getSortingSubcontractor", isSecond)
      }else{
        dispatch("getSortingOwn", isSecond)
      }

      this.$toast.success(res.data.message)
    })
    .catch((response)=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },
  deleteSorting({dispatch},{sortingProcessDetailsId, isSecond}){
    this.$axios.delete(`/api/v1/sorting-process-details/${sortingProcessDetailsId}`)
    .then((res)=>{
      dispatch("getSortingOwn", isSecond)
      this.$toast.success(res.data.message)
    })
    .catch((response)=>{
      console.log(response);
      this.$toast.error(response.data.message)
    })
  },

  getSortingSubcontractor({state,commit}, isSecond){
    this.$axios.get(`/api/v1/sorting-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&isSecond=${isSecond}`)
    .then((res)=>{
      const data = res.data.data.map(item => {
        return {
          ...item,
          sizeDistributionList: item.sizeDistributions,
          receivedQuantity: item.totalQuantity,
        }
      })
      if(!isSecond){
        commit("setSubcontractList", data)
      }else{
        commit("setSecondClassList", data)
      }
    })
    .catch((response)=>{
      console.log(response);
    })
  },



}
