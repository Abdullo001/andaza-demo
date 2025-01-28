export const state=()=>({
  pageName: '',
  pageNumber: 0,
  pageSize: 10,
})

export const getters={
  pageName: (state) => state.pageName,
  pageNumber: (state) => state.pageNumber,
  pageSize: (state) => state.pageSize,
}

export const mutations={
  setPageName(state,name){
    state.pageName = name
  },
  setPageNumber(state,number){
    state.pageNumber = number
  },
  setPageSize(state,size){
    state.pageSize = size
  },
}
