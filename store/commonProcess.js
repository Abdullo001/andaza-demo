export const state = () => ({
  ownList: [],
  planningProcessId: null,
  orderQuantityList: [],
  subcontractList:[],
})

export const getters = {
  ownList: state => state.ownList,
  orderQuantityList: state => state.orderQuantityList,
  planningProcessId: state => state.planningProcessId,
  subcontractList: state => state.subcontractList,
}

export const mutations = {
  setOwnList(state, item) {
    state.ownList = item
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
}

export const actions = {
  getOwnList({commit, state}, id) {
    this.$axios.get(`/api/v1/common-process-details/list-own?planningProcessId=${id || state.planningProcessId}`)
      .then((res) => {
        commit("setOwnList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  updateCommonProcess({dispatch}, data) {
    this.$axios.put(`/api/v1/common-process-details/update`, data)
      .then((res) => {
        if(Object.keys(data).length===2){
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

  getOrderQuantityList({commit, state}) {
    this.$axios.get(`/api/v1/common-process-details/order-quantities?planningProcessId=${state.planningProcessId}`)
      .then((res) => {
        commit("setOrderQuantityList", res.data.data)
      })
      .catch(({res}) => {
        console.log(res);
      })
  },


  getSubcontarctList({commit,state}){
    this.$axios.get(`/api/v1/common-process-details/list-subcontractor?planningProcessId=${state.planningProcessId}`)
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
  }


}
