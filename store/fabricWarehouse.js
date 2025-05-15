export const state = () => ({
  fabricWarehouseList: [],
  sipNumbers: [],
  toSipNumbers: [],
  historyList:[],
  modelParts:[],
  modelPartsQuantity:null,
  modelsBySipNmber:[]
});

export const getters = {
  fabricWarehouseList: (state) => state.fabricWarehouseList.content,
  totalElements: (state) => state.fabricWarehouseList.totalElements,
  sipNumbers: (state) => state.sipNumbers.content,
  toSipNumbers: (state) => state.toSipNumbers,
  historyList: (state) => state.historyList,
  modelParts: (state) => state.modelParts,
  modelPartsQuantity: (state) => state.modelPartsQuantity,
  modelsBySipNmber: (state) => state.modelsBySipNmber,
};

export const mutations = {
  setFabricWarehouseList(state, item) {
    state.fabricWarehouseList = item;
  },
  setSipNumbers(state, item) {
    state.sipNumbers = item;
  },
  setToSipNumbers(state, item) {
    state.toSipNumbers = item;
  },
  setHistoryList(state, item) {
    state.historyList = item;
  },
  setModelParts(state, item) {
    state.modelParts = item;
  },
  setModelPartsQuantity(state, item) {
    state.modelPartsQuantity = item;
  },
  setModelsBySipNmber(state, item) {
    state.modelsBySipNmber = item;
  },
};

export const actions = {
  getFabricWarehouseList({ commit }, { sipNumber, batchNumber, orderNumber,page,size }) {
    const body = {
      sipNumber:sipNumber,
      batchNumber:batchNumber,
      orderNumber:orderNumber,
      page,
      size,
    };
    this.$axios
      .put(`/api/v1/fabric-warehouse/list`, body)
      .then((res) => {
        commit("setFabricWarehouseList", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  createFabricWarehouse({ dispatch }, data) {
    this.$axios
      .post(`/api/v1/fabric-warehouse/create`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
          page:0,
          size:10,
        });
      })
      .catch((res) => {
        this.$toast.error(res.data.message);
        console.log(res);
      });
  },
  updateFabricWarehouse({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-warehouse/${data.id}`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
          page:0,
          size:10,
        });
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message);
      });
  },

  deleteFabricWarehouse({ dispatch }, id) {
    this.$axios
      .delete(`/api/v1/fabric-warehouse/delete?id=${id}`)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
          page:0,
          size:10,
        });
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message);
      });
  },

  getToSipNumbers({ commit }) {
    this.$axios
      .get(`/api/v1/fabric-warehouse/sip-numbers`)
      .then((res) => {
        commit("setToSipNumbers", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  setSpendingFabric({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-warehouse/spend-fabric`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
          page:0,
          size:10,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },

  setFabricToWorkshop({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-warehouse/give-own-cutting`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
          page:0,
          size:10,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },

  setFabricToSubcontract({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-warehouse/give-subcontractor`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
          page:0,
          size:10,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },

  getHistory({commit},id){
    this.$axios.get(`/api/v1/fabric-warehouse/history?warehouseId=${id}`)
    .then((res)=>{
      commit("setHistoryList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  async getModelPartsList({commit},{modelNumber,color}){
    await this.$axios.get(`/api/v1/model-parts/by-model-number?modelNumber=${encodeURIComponent(modelNumber)}&color=${encodeURIComponent(color)}`)
    .then((res)=>{
      commit("setModelParts",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getTotalQuantityByModelParts({commit},{modelNumber, modelPartId, modelPartName}){
    const data = {
      modelNumber,
      modelPartId,
      modelPartName
    }
    this.$axios.put(`/api/v1/fabric-planning-chart/get-total-fabric`,data)
    .then((res)=>{
      commit("setModelPartsQuantity",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  transferToStock({dispatch},fabricWarehouseId){
    this.$axios.put(`/api/v1/fabric-warehouse/give/fabric-stock/${fabricWarehouseId}`)
    .then((_res)=>{
      dispatch("getFabricWarehouseList",{page:0,size:10})
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  getModelsBySipNumber({commit}, sipNumber){
    this.$axios.get(`/api/v1/fabric-warehouse/models-by-sip-number?sipNumber=${sipNumber}`)
    .then((res) => {
      commit("setModelsBySipNmber", res.data.data);
    })
    .catch((res) => {
      console.log(res);
    })
  }
};
