export const state = () => ({
  ordersList: [],
  loading: true,
  oneOrder: {},
  newOrderId: null,
  newModelId: null,
  usersList: [],
  clientList: [],
  modelList: [],
  modelId: null,
  orderCondation: false,
  infoToOrder: {},
});

export const getters = {
  ordersList: (state) => state.ordersList.content,
  loading: (state) => state.loading,
  totalElements: (state) => state.ordersList.totalElements,
  oneOrder: (state) => state.oneOrder,
  newOrderId: (state) => state.newOrderId,
  usersList: (state) => state.usersList.content,
  clientList: (state) => state.clientList.data,
  modelList: (state) => state.modelList.data,
  modelId: (state) => state.modelId,
  newModelId: (state) => state.newModelId,
  infoToOrder: (state) => state.infoToOrder,
};

export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings;
  },
  setOrders(state, order) {
    state.ordersList = order;
  },
  setOneOrder(state, details) {
    state.oneOrder = details;
  },
  setNewOrderId(state, id) {
    state.newOrderId = id;
  },
  setNewModelId(state, modelId) {
    state.newModelId = modelId;
  },
  setUsersList(state, item) {
    state.usersList = item;
  },
  setClientList(state, item) {
    state.clientList = item;
  },
  setModelList(state, item) {
    state.modelList = item;
  },
  setModelId(state, id) {
    state.modelId = id;
  },
  setOrderCondation(state, item) {
    state.orderCondation = item;
  },
  setInfoToOrder(state, item) {
    state.infoToOrder = item;
  },
};

export const actions = {
  async getOneOrder({ commit }, { id, modelId }) {
    await this.$axios
      .$get(`/api/v1/orders/get-one?orderId=${id}&modelId=${modelId}`)
      .then((res) => {
        commit("setOneOrder", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async changeStatusOrder({ dispatch }, { id, status,modelId }) {
    const data = {
      modelId,
      orderStatus:status
    }
    await this.$axios.$put(`/api/v1/orders/change-status/${id}`,data)
      .then((res) => {
        this.$toast.success(res.data.data.message);
        dispatch("getOrdersList",{page:0, size:10})
      })
      .catch(({ response }) => {
        console.log(response)
        dispatch("getOrdersList",{page:0, size:10})
      });
  },
  async createdOrder({ commit, dispatch }, data) {
    const order = {
      deadline: data.deadline,
      description: data.description,
      orderDate:data.orderDate,
      priceWithDiscount: data.priceWithDiscount,
      priceWithDiscountCurrency: data.priceWithDiscountCurrency,
      headOfProductionDepartmentId: data.headOfDepartment.id,
      modelId: data.modelId,
      orderNumber: data.orderNumber,
      priority: data.priority,
      overproductionPercent: data.overproductionPercent,
    };
    this.$axios
      .post("/api/v1/orders/create", order)
      .then((res) => {
        commit("setNewOrderId", res.data.data.id);
        commit("setNewModelId", res.data.data.modelId);
        dispatch(
          "getOneOrder",
          { id: res.data.data.id, modelId: res.data.data.modelId });
        dispatch(
          "sizeDistribution/getSizeDistribution",
          { modelId: res.data.data.modelId },
          { root: true }
        );
        dispatch(
          "sizeDistribution/getSizeDistirbutionValue",
          { orderId: res.data.data.id, modelId: res.data.data.modelId },
          { root: true }
        );

        dispatch(
          "documents/getDocuments",
          { modelId: res.data.data.modelId },
          { root: true }
        );
        this.$toast.success(res.data.message);
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  async getUsersList({ commit }) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 100,
    };
    await this.$axios
      .put(`/api/v1/user/get-users`, body)
      .then((res) => {
        commit("setUsersList", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async getClient({ commit }) {
    await this.$axios
      .get(`/api/v1/partners/list-by-type?partnerType=client`)
      .then((res) => {
        commit("setClientList", res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async getModelId({ commit }) {
    await this.$axios
      .get(`/api/v1/models/pre-financed-models`)
      .then((res) => {
        commit("setModelList", res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async updateOrder({ dispatch }, data) {
    const order = {
      clientId: data.clientId,
      deadline: data.deadline,
      description: data.description,
      priceWithDiscount: data.priceWithDiscount,
      priceWithDiscountCurrency: data.priceWithDiscountCurrency,
      headOfProductionDepartmentId: data.headOfDepartment.id,
      id: data.id,
      orderDate:data.orderDate,
      modelId: data.modelId,
      orderNumber: data.orderNumber,
      priority: data.priority,
      overproductionPercent:data.overproductionPercent,
    };
    await this.$axios
      .put("/api/v1/orders/update", order)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getOneOrder", {
          id: res.data.data.id,
          modelId: res.data.data.modelId,
        });
        dispatch(
          "sizeDistribution/getSizeDistirbutionValue",
          { orderId: res.data.data.id, modelId: res.data.data.modelId },
          { root: true }
        );
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.message);
      });
  },
  async getGivePrice({ commit }, { id }) {
    await this.$axios
      .get(`/api/v1/models/info-to-order?id=${id}`)
      .then((res) => {
        commit("setInfoToOrder", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async filterOrderList({ commit }, { page, size, data }) {
    const body = {
      orderNumber:data.orderNumber,
      modelNumber:data.modelNumber,
      modelGroup:data.modelGroup,
      creatorId:data.creatorId?.id,
      clientName:data.clientName?.name,
      page,
      size,
    };
    await this.$axios
      .$put(`/api/v1/orders/list`, body)
      .then((res) => {
        commit("setOrders", res.data);
      })
      .catch(({ response }) => {
        commit("setLoading", false);
        console.log(response);
      });
  },
  async getOrdersList({ commit }, { page, size,  }) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    };
    await this.$axios.$put(`/api/v1/orders/list`, body)
      .then((res) => {
        commit("setOrders", res.data);
        commit("setLoading", false);
      })
  },
};
