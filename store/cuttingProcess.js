export const state = () => ({
  cuttingList: "",
  planningProcessId: null,

})

export const getters = {
  planningProcessId: state => state.planningProcessId,
  cuttingList: state => state.cuttingList,
}

export const mutations = {
  setCuttingList(state, item) {
    state.cuttingList = item
  },
  setPlanningProcessId(state, item) {
    state.planningProcessId = item
  },

}

export const actions = {
  getCuttingList({commit, state}) {
    if(!!state.planningProcessId)
    this.$axios.get(`/api/v1/process-details/list-own?planningProcessId=${state.planningProcessId}`)
      .then((res) => {
        commit("setCuttingList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  setUpdateSizes({dispatch, state}, data) {
    this.$axios.put(`/api/v1/cutting-operation/update`, data)
      .then((res) => {
        console.log(res);
        dispatch("getCuttingList")
      })
      .catch(({res}) => {
        this.$toast.error(res.data.massege)
        console.log(res);
      })
  },

  deleteCuttingSizes({dispatch}, id) {
    this.$axios.delete(`/api/v1/cutting-operation/delete?id=${id}`)
      .then((res) => {
        console.log(res);
        this.$toast.success(res.data.massege)
        dispatch("getCuttingList")
      })
      .catch(({res}) => {
        this.$toast.error(res.data.massege)
        console.log(res);
      })
  }
}
