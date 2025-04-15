export const state=()=>({
  historyList:[],
  historySecondList:[],
  historySentToAlterationList:[],
})

export const getters={
  historyList: state=>state.historyList,
  historySecondList: state=>state.historySecondList,
  historySentToAlterationList: state=>state.historySentToAlterationList,
}

export const mutations={
  setHistoryList(state,item){
    state.historyList=item
  },
  setHistorySecondList(state,item){
    state.historySecondList=item
  },
  setHistorySentToAlterationList(state,item){
    state.historySentToAlterationList=item
  },

}

export const actions={
  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/common-operations?commonProcessDetailsId=${id}&commonOperationType=FIRST_CLASS`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)

    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getHistorySecondList({commit},id){
    this.$axios.get(`/api/v1/common-operations?commonProcessDetailsId=${id}&commonOperationType=SECOND_CLASS`)
    .then((res)=>{
      commit("setHistorySecondList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getHistorySentToAlterationList({commit},id){
    this.$axios.get(`/api/v1/common-operations?commonProcessDetailsId=${id}&commonOperationType=SENT_TO_ALTERATION`)
    .then((res)=>{
      commit("setHistorySentToAlterationList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  deleteHistoryItem({dispatch},{id,processId}){
    this.$axios.delete(`/api/v1/common-operations/${id}`)
    .then((res)=>{
      dispatch("getHistoryList",processId)
      dispatch("commonProcess/getOwnList",'',{root:true})
      dispatch("commonProcess/getSubcontarctList",'',{root:true})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  editHistoryItem({dispatch},data){
    this.$axios.put(`/api/v1/common-operations/${data.id}`,data)
    .then((res)=>{
      dispatch("commonProcess/getOwnList",'',{root:true})
      dispatch("commonProcess/getSubcontarctList",'',{root:true})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  editHistorySecondClassItem({dispatch},data){
    this.$axios.put(`/api/v1/common-operations/${data.id}`,data)
    .then((res)=>{
      dispatch("commonProcess/getSecondClassList",'',{root:true})
      dispatch("commonProcess/getSubcontarctSecondClassList",'',{root:true})
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  getSorting({commit},sortingProcessDetailsId){
    this.$axios.get(`/api/v1/sorting-operation?sortingProcessDetailsId=${sortingProcessDetailsId}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  }


}
