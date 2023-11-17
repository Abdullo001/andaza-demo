export const state = () => ({
  fabricWarehouseList: [],
  fabricStockList: [],
  sipNumbers: [],
  toSipNumbers: [],
});

export const getters = {
  fabricWarehouseList: (state) => state.fabricWarehouseList.content,
  fabricStockList: (state) => state.fabricStockList.content,
  sipNumbers: (state) => state.sipNumbers,
  toSipNumbers: (state) => state.toSipNumbers,
};

export const mutations = {
  setFabricWarehouseList(state, item) {
    state.fabricWarehouseList = item;
  },
  setFabricStockList(state, item) {
    state.fabricStockList = item;
  },
  setSipNumbers(state, item) {
    state.sipNumbers = item;
  },
  setToSipNumbers(state, item) {
    state.toSipNumbers = item;
  },
};

export const actions = {
  getFabricWarehouseList({ commit }, { sipNumber, batchNumber, orderNumber }) {
    const body = {
      sipNumber:sipNumber,
      batchNumber:batchNumber,
      orderNumber:orderNumber,
      page: 0,
      size: 50,
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
  getFabricStockList({ commit }, { sipNumber, modelNumber, supplierName }) {
    const body = {
      filters: [
        {
          key: "sipNumber",
          operator: "LIKE",
          propertyType: "STRING",
          value: sipNumber,
        },
        {
          key: "modelNumber",
          operator: "LIKE",
          propertyType: "STRING",
          value: modelNumber,
        },
        {
          key: "supplierName",
          operator: "LIKE",
          propertyType: "STRING",
          value: supplierName,
        },
      ],
      sorts: [],
      page: 0,
      size: 50,
    };
    body.filters = body.filters.filter(
      (item) => item.value !== "" && item.value !== null
    );
    this.$axios
      .put(`/api/v1/fabric-stocks/list`, body)
      .then((res) => {
        commit("setFabricStockList", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  createFabricWarehouse({ dispatch }, data) {
    data.fabricOrderId=data.fabricOrderId?.fabricOrderId
    console.log(data);
    this.$axios
      .post(`/api/v1/fabric-warehouse/create`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
        });
      })
      .catch((res) => {
        this.$toast.error(res.data.message);
        console.log(res);
      });
  },

  createFabricStock({ dispatch }, data) {
    this.$axios.post(`/api/v1/fabric-stocks/create`, data).then((res) => {
      this.$toast.success(res.data.message);
      dispatch("getFabricStockList", {
        sipNumber: "",
        modelNumber: "",
        supplierName: "",
      }).catch((res) => {
        this.$toast.error(res.data.message);
      });
    });
  },

  getSipNumbers({ commit },sipNumber) {
    const data={
      sipNumber:sipNumber,
      modelNumber: "",
      orderNumber: "",
      page: 0,
      size: 20,
      status: "",
      supplierName: ""
    }
    this.$axios.put(`/api/v1/fabric-order/list`,data)
      .then((res) => {
        commit("setSipNumbers", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  updateFabricWarehouse({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-warehouse/update`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
        });
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message);
      });
  },

  updateFabricStock({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-stocks/update`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricStockList", {
          sipNumber: "",
          modelNumber: "",
          supplierName: "",
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
        });
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message);
      });
  },
  deleteFabricStock({ dispatch }, id) {
    this.$axios
      .delete(`/api/v1/fabric-stocks/delete?id=${id}`)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getFabricStockList", {
          sipNumber: "",
          modelNumber: "",
          supplierName: "",
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
        console.log(res);
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  setFabricStockToWorkshop({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-stocks/give-own`, data)
      .then((res) => {
        console.log(res);
        this.$toast.success(res.data.message);
        dispatch("getFabricStockList", {
          sipNumber: "",
          modelNumber: "",
          supplierName: "",
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
        console.log(res);
        this.$toast.success(res.data.message);
        dispatch("getFabricWarehouseList", {
          sipNumber: "",
          batchNumber: "",
          orderNumber: "",
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  setFabricStockToSubcontract({ dispatch }, data) {
    this.$axios
      .put(`/api/v1/fabric-stocks/give-subcontractor`, data)
      .then((res) => {
        console.log(res);
        this.$toast.success(res.data.message);
        dispatch("getFabricStockList", {
          sipNumber: "",
          modelNumber: "",
          supplierName: "",
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  
};
