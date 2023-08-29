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
    this.$axios.get(`/api/v1/common-operation/list?detailsId=${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  deleteHistoryItem({dispatch},{id,processId}){
    this.$axios.delete(`/api/v1/common-operation/delete?id=${id}`)
    .then((res)=>{
      dispatch("getHistoryList",processId)
      dispatch("commonProcess/getOwnList",'',{root:true})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  editHistoryItem({dispatch},data){
    this.$axios.put(`/api/v1/common-operation/update`,data)
    .then((res)=>{
      dispatch("commonProcess/getOwnList",'',{root:true})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

 
}