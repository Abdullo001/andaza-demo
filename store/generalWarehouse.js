export const state = () => ({
  itemsList: [],
  newId:null,
  item:{},
});

export const getters = {
  itemsList: (state) => state.itemsList.content,
  totalElements: (state) => state.itemsList.totalElements,
  newId: (state) => state.newId,
  item: (state) => state.item,
};

export const mutations = {
  setItemsList(state, item) {
    state.itemsList = item;
  },
  setNewId(state, item) {
    state.newId = item;
  },
  setItem(state, item) {
    state.item = item;
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
      commit("setItemsList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createItem({commit},data){
    this.$axios.post(`/api/v1/general`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      commit("setNewId",res.data.data.id)
    })
    .catch((response)=>{
      this.$toast.error(response.data.message)
    })
  },

  getOneItem({commit},id){
    this.$axios.get(`/api/v1/general/${id}`)
    .then((res)=>{
      commit("setItem",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  updateItem({dispatch},{data,id}){
    this.$axios.put(`/api/v1/general/${id}`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch((response)=>{
      this.$toast.error(response.data.message)
    })
  },

  productionToWaybill({dispatch},{data,id}){
    this.$axios.put(`/api/v1/processable-entity/spend-waybill/${id}`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  }
};
