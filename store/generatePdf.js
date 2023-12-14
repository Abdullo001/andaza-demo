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
};

export const actions = {
  getPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/orders/generate-pdf`, data)
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
    this.$axios.put(`/api/v1/pre-finances/generate-calculation-list`, data)
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
    this.$axios.put(`/api/v1/fabric-order/ordered-fabric-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setRecievedFabricPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getOrderedAccessoryList({ commit }, data) {
    this.$axios.put(`/api/v1/accessory-planning-chart/ordered-accessory-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setOrderedAccessoryPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getRecievedAccessoryPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/accessory-planning-chart/received-accessory-form`, data)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setRecievedAccessoryPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getDailyProductionPdfList({ commit }, data) {
    this.$axios.put(`/api/v1/production/production-quantity-pdf?dateTime=${data.dateTime}`)
      .then((res) => {
        const binaryCode = atob(res.data);
        commit("setDailyProductionPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  getProductionPdfList({ commit },data) {
    this.$axios.put(`/api/v1/production/production-list-form`,data)
      .then((res) => {
        const binaryCode = atob(res.data);
        console.log(res);
        commit("setProductionPdfList", binaryCode);
      })
      .catch((res) => {
        console.log(res);
      });
  },
};
