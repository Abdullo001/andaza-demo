export const state = () => ({
  itemsList: [],
});

export const getters = {
  itemsList: (state) => state.itemsList.content,
  totalElements: (state) => state.itemsList.totalElements,
};

export const mutations = {
  setItemsList(state, item) {
    state.itemsList = item;
  },
};

export const actions = {
  getItems({ commit }, {fromDate,page,size,type,subcontractorName,toDate,waybillNumber}) {
    const data = {
      fromDate: fromDate??null,
      page,
      size,
      subcontractorName: subcontractorName??"",
      toDate: toDate??null,
      type,
      waybillNumber: waybillNumber??"",
    };
    this.$axios.put(`/api/v1/general`, data)
    .then((res)=>{
      console.log(res);
      commit("setItemsList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createItem({dispatch},data){
    this.$axios.post(`/api/v1/general`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      console.log(res);
    })
    .catch((response)=>{
      this.$toast.error(response.data.message)
    })
  }
};
