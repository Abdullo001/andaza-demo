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
}

export const mutations = {
  setIsConfirm(state, item) {
    state.isConfirm = item
    console.log(item);
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
}

export const actions = {
  getOwnList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${ state.planningProcessId}&operationType=FIRST_CLASS`)
      .then((res) => {
        commit("setOwnList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },
  getSecondClassList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${ state.planningProcessId}&operationType=SECOND_CLASS`)
      .then((res) => {
        commit("setSecondClassList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },
  getSentToAlterationList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${ state.planningProcessId}&operationType=SENT_TO_ALTERATION`)
      .then((res) => {
        commit("setSentToAlterationList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  updateCommonProcess({dispatch}, data) {
    this.$axios.put(`/api/v1/common-process-details/update`, data)
      .then((res) => {
        if(Object.keys(data).length===3){
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
    this.$axios.put(`/api/v1/common-process-details/update`, data)
      .then((res) => {
        if(Object.keys(data).length===3){
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
    this.$axios.put(`/api/v1/common-process-details/update`, data)
      .then((res) => {
        if(Object.keys(data).length===3){
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

  getOrderQuantityList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/order-quantities?planningProcessId=${state.planningProcessId}`)
      .then((res) => {
        commit("setOrderQuantityList", res.data.data)
      })
      .catch(({res}) => {
        console.log(res);
      })
  },

  getSubcontarctSecondClassList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&operationType=SECOND_CLASS`)
    .then((res)=>{
      commit("setSubcontractSecondClassList",res.data.data)
    })
    .catch((res) => {
      console.log(res);
    })
  },
  getSubcontractSentToAlterationList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&operationType=SENT_TO_ALTERATION`)
    .then((res)=>{
      commit("setSubcontractSentToAlterationList",res.data.data)
    })
    .catch((res) => {
      console.log(res);
    })
  },
  getSubcontarctList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}&operationType=FIRST_CLASS`)
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

  refuseApprove({dispatch},data){
    this.$axios.post(`/api/v1/classification/refuse-approve`,data)
    .then((res)=>{
      dispatch("getOrderQuantityList")
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
  }


}
