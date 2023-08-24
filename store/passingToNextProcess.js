export const state=()=>({
  passingList:[],

})


export const getters={
  passingList: state=>state.passingList,
}

export const mutations={
  setPassingList(state,item){
    state.passingList=item
  },

}

export const actions={
  getPassingList({commit},id){
    this.$axios.get(`/api/v1/processable-entity/fabric-pass-next-process?planningProcessId=${id}`)
    .then((res)=>{
      commit("setPassingList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  setUpdatePass({dispatch},data){
    this.$axios.put(`/api/v1/processable-entity/pass-next-process`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getPassingList",data.planningProcessId)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  }
}