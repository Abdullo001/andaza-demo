export const state = () => ({
  pdfList: [],
  printPdfList: [],
  calculationsPdfList: [],
  orderedFabricPdfList: [],
  orderedPdfList: [],
  recievedFabricPdfList:[],
  orderedAccessoryPdfList:[],
  recievedAccessoryPdfList:[],
  dailyProductionPdfList:[],
  productionPdfList:[],
  cuttingPdfList:[],
  productionStatusList:[],
  pdfData:"",
});

export const getters = {
  pdfList: (state) => state.pdfList,
  printPdfList: (state) => state.printPdfList,
  calculationsPdfList: (state) => state.calculationsPdfList,
  orderedFabricPdfList: (state) => state.orderedFabricPdfList,
  orderedPdfList: (state) => state.orderedPdfList,
  recievedFabricPdfList: (state) => state.recievedFabricPdfList,
  orderedAccessoryPdfList: (state) => state.orderedAccessoryPdfList,
  recievedAccessoryPdfList: (state) => state.recievedAccessoryPdfList,
  dailyProductionPdfList: (state) => state.dailyProductionPdfList,
  productionPdfList: (state) => state.productionPdfList,
  cuttingPdfList: (state) => state.cuttingPdfList,
  productionStatusList: (state) => state.productionStatusList,
  pdfData: (state) => state.pdfData,
};

export const mutations = {
  setPdfList(state, item) {
    state.pdfList = item;
  },
  setPrintPdfList(state, item) {
    state.printPdfList = item;
  },
  setCalculationsPdfList(state, item) {
    state.calculationsPdfList = item;
  },
  setOrderedFabricPdfList(state, item) {
    state.orderedFabricPdfList = item;
  },
  setOrderedPdfList(state, item) {
    state.orderedPdfList = item;
  },
  setRecievedFabricPdfList(state, item) {
    state.recievedFabricPdfList = item;
  },
  setOrderedAccessoryPdfList(state, item) {
    state.orderedAccessoryPdfList = item;
  },
  setRecievedAccessoryPdfList(state, item) {
    state.recievedAccessoryPdfList = item;
  },
  setDailyProductionPdfList(state, item) {
    state.dailyProductionPdfList = item;
  },
  setProductionPdfList(state, item) {
    state.productionPdfList = item;
  },
  setCuttingPdfList(state, item) {
    state.cuttingPdfList = item;
  },
  setProductionStatusList(state, item) {
    state.productionStatusList = item;
  },
  setPdfData(state, item) {
    state.pdfData = item;
  },
};

export const actions = {
  getPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/orders/generate-placed-orders`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getPrintPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/orders/generate-print-pdf`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setPrintPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getCalculationsPdfList({ commit }, data) {
    this.$axios.post(`/api/v1/forms/calculations`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setCalculationsPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getOrderedFabricPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/fabric-order/generate-supplier-pdf`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setOrderedFabricPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getOrderedPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/fabric-order/ordered-fabric-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setOrderedPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getRecievedFabricPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/fabric-warehouse/received-fabric-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setRecievedFabricPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getOrderedAccessoryList({ commit }, data) {
    this.$axios.post(`/api/v1/accessory-planning-charts/ordered-accessory-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setOrderedAccessoryPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getRecievedAccessoryPdfList({ commit }, data) {
    this.$axios.post(`/api/v1/accessory-planning-charts/received-accessory-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setRecievedAccessoryPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getDailyProductionPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/production/production-quantity-pdf?from=${data.from}&to=${data.to}`)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setDailyProductionPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getProductionPdfList({ commit },{data, fileType}) {
    this.$axios.put(`/api/v1/production/production-list-form/${fileType}`,data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setProductionPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async getCuttingPdf({ commit },data) {
    await this.$axios.put(`/api/v1/process-details/generate-cutting-pdf`,data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setCuttingPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getProductionStatusPdf({ commit },data) {

    this.$axios.post(`/api/v1/production/production-status-form`,data)
      .then((res) => {
        const binaryCode = atob(res.data);

        commit("setProductionStatusList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getShipmentPdf({commit},data){
    this.$axios.post(`/api/v1/shipping-form`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getStockAccessoryPdf({commit}){
    this.$axios.get(`/api/v1/accessory-stock/remains-pdf`)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getWarehouseRemainsPdf({commit}){
    this.$axios.get(`/api/v1/warehouse/warehouse-remains`)
    .then((res)=>{

      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getSubcontractorFormPdf({commit},data){
    this.$axios.put(`/api/v1/cutting/subcontractor-form`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getPrintingSubcontractorFormPdf({commit},data){
    this.$axios.put(`/api/v1/printing/subcontractor-form`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getIncomingPrintingSubconPdf({commit},data){
    this.$axios.put(`/api/v1/common-process-details/print/incoming/subcontractor/form`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getSewingListSubconPdf({commit},data){
    this.$axios.put(`/api/v1/sewing/subcontractor-form`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getIncomingSewingSubconPdf({commit},data){
    this.$axios.put(`/api/v1/sewing/incoming/subcontractor-form`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getClassificationPdf({commit},data){
    this.$axios.put(`/api/v1/classification/generate-pdf`,data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getSewingListPdf({commit},modelId){
    this.$axios.get(`/api/v1/common-process-details/sewing-pdf?modelId=${modelId}`)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getCuttingOutsorcingPdf({commit},data){
    this.$axios.put(`/api/v1/common-process-operations/cutting-to-outsourcing/generate`, data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getDailySorting({commit},data){
    this.$axios.put(`/api/v1/sorting-process-details/daily-pdf`, data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getProcessForm({commit},data){
    this.$axios.put(`/api/v1/production/processes-pdf`, data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getToStreamForm({commit},data){
    this.$axios.put(`/api/v1/kitting-operation/to-stream-pdf`, data)
    .then((res)=>{
      const binaryCode = atob(res.data);
      commit("setPdfData", binaryCode);
    })
    .catch((response)=>{
      console.log(response);
    })
  },
};
