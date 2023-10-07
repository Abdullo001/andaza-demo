export const state=()=>({
  pdfList:[],
  printPdfList:[],
})

export const getters={
  pdfList:state=>state.pdfList,
  printPdfList:state=>state.printPdfList,
}

export const mutations={
  setPdfList(state,item){
    state.pdfList=item
  },
  setPrintPdfList(state,item){
    state.printPdfList=item
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
  },
  getPrintPdfList({commit},data){
    this.$axios.put(`/api/v1/orders/generate-print-pdf`,data)
    .then((res)=>{
      const binaryCode=atob(res.data)
      commit("setPrintPdfList",binaryCode)
      
    })
    .catch((res)=>{
      console.log(res);
    })
  },
}