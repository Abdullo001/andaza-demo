export const state = () => ({
  pdfList: [],
  printPdfList: [],
  calculationsPdfList: [],
  orderedFabricPdfList: [],
});

export const getters = {
  pdfList: (state) => state.pdfList,
  printPdfList: (state) => state.printPdfList,
  calculationsPdfList: (state) => state.calculationsPdfList,
  orderedFabricPdfList: (state) => state.orderedFabricPdfList,
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
};
