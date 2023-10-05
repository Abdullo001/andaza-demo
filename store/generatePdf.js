export const state=()=>({
  pdfList:[],
})

export const getters={
  pdfList:state=>state.pdfList,
}

export const mutations={
  setPdfList(state,item){
    state.pdfList=item
  },
}

export const actions={
  getPdfList({commit},data){
    this.$axios.put(`/api/v1/orders/generate-pdf`,data)
    .then((res)=>{
      const binaryCode=atob(res.data)
      commit("setPdfList",binaryCode)
      
    })
    .catch((res)=>{
      console.log(res);
    })
  }
}