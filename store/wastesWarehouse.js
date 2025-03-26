export const state = () => ({
  wastesList: [],
  historyList:[],
  productionWastesList:[],
  productionHistoryList:[],
  pdfData:"",
});

export const getters = {
  wastesList: (state) => state.wastesList.content,
  totalElements: (state) => state.wastesList.totalElements,
  productionWastesList: (state) => state.productionWastesList,
  productionHistoryList: (state) => state.productionHistoryList,
  historyList: (state) => state.historyList,
  pdfData: (state) => state.pdfData,
};

export const mutations = {
  setWastesList(state, item) {
    state.wastesList = item;
  },
  setProductionWastesList(state, item) {
    state.productionWastesList = item;
  },
  setProductionHistoryList(state, item) {
    state.productionHistoryList = item;
  },
  setHistoryList(state, item) {
    state.historyList = item;
  },
  setPdfData(state, item) {
    state.pdfData = item;
  },
};

export const actions = {
  getWastesList({ commit }, {batchNumber,fromDate,modelNumber,name,page,size,toDate}) {
    const data = {
      batchNumber:batchNumber??"" ,
      fromDate: fromDate??null,
      modelNumber: modelNumber??"",
      name: name??"",
      page,
      size,
      toDate: toDate??null,
    };
    this.$axios.put(`/api/v1/waste-warehouse`,data)
    .then((res)=>{
      commit("setWastesList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createWaste({dispatch},data){
    this.$axios.post('/api/v1/waste-warehouse',data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getWastesList",{page:0,size:10})
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)

    })
  },

  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/waste-warehouse/${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  updateWaste({dispatch},{data,id}){
    this.$axios.put(`/api/v1/waste-warehouse/${id}`,data)
    .then((res)=>{
      dispatch("getWastesList",{page:0,size:10})
      this.$toast.success(res.data.message)

    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  },

  sellWaste({dispatch},{data,id}){
    this.$axios.put(`/api/v1/waste-warehouse/sell/${id}`,data)
    .then((res)=>{
      dispatch("getWastesList",{page:0,size:10})
      this.$toast.success(res.data.message)
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message)
    })
  },



  getProductionWastesList({commit},modelId){
    this.$axios.get(`/api/v1/waste-processable-entity/list/${modelId}`)
    .then((res)=>{
      commit("setProductionWastesList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getProductionHistoryList({commit},id){
    this.$axios.get(`/api/v1/waste-processable-entity/history/${id}`)
    .then((res)=>{
      commit("setProductionHistoryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  sendToSupply({dispatch},{data,modelId}){
    this.$axios.post(`/api/v1/waste-processable-entity/send/warehouse`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getProductionWastesList",modelId)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.success(response.data.message)

    })
  },
  generatePdf({commit}){
    this.$axios.put(`/api/v1/waste-warehouse/form`)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  generateSellPdf({commit}){
    this.$axios.put(`/api/v1/waste-warehouse/sell/form`)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  }


};
