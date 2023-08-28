export const state=()=>({
  historyList:[],
})

export const getters={
  historyList: state=>state.historyList,
}

export const mutations={
  setHistoryList(state,item){
    state.historyList=item
  },

}

export const actions={
  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/common-process-operations/list?processableEntityId=${id}`)
    .then((res)=>{
      console.log(res);
      commit("setHistoryList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  }
}