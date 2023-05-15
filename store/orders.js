export const state = () => ({
  ordersList: [],
  loading: true,
  oneOrder: {},
  newOrderId: null,
  newModelId: null,
  modelGroups: [],
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
  modelGroups: (state) => state.modelGroups.map(elem => elem.name),
  usersList: (state) => state.usersList.content,
  clientList: (state) => state.clientList.data,
  modelList: (state) => state.modelList.data,
  modelId: (state) => state.modelId,
  newModelId: (state) => state.newModelId,
  infoToOrder: (state) => state.infoToOrder,
};

export const mutations = {
  setLoading(state, loadings){
    state.loading = loadings
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
  setModelGroups(state, group) {
    state.modelGroups = group;
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
  setInfoToOrder(state,item){
    state.infoToOrder=item;
  }
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
  async changeStatusOrder({ dispatch }, { id, status }) {
    await this.$axios
      .$put(`/api/v1/orders/change-status?id=${id}&status=${status}`)
      .then((res) => {
        this.$toast.success(res.message, { theme: "toasted-primary" });
      })
      .catch(({ response }) => console.log(response));
  },
  async createdOrder({ commit, dispatch }, data) {
    const order = {
      clientId: data.clientId,
      deadline: data.deadline,
      description: data.description,
      priceWithDiscount: data.priceWithDiscount,
      priceWithDiscountCurrency: data.priceWithDiscountCurrency,
      headOfProductionDepartmentId: data.headOfDepartmentId,
      modelId: data.modelId,
      orderNumber: data.orderNumber,
      priority: data.priority,
    };
    this.$axios
      .post("/api/v1/orders/create", order)
      .then((res) => {
        commit("setNewOrderId", res.data.data.id);
        commit("setNewModelId", res.data.data.modelId);
        dispatch(
          "sizeDistirbution/getSizeDistirbution",
          { modelId: res.data.data.modelId },
          { root: true }
        );
        dispatch(
          "sizeDistirbution/getSizeDistirbutionValue",
          { orderId: res.data.data.id, modelId: res.data.data.modelId },
          { root: true }
        );
        // dispatch("detailInfo/getDetailInfo",{orderId:res.data.data.id,modelId:res.data.data.modelId},{root:true})
        dispatch(
          "shippingInfo/getShippingInfo",
          { id: res.data.data.id, modelId: res.data.data.modelId },
          { root: true }
        );
        dispatch(
          "subcontracts/getSubcontractsList",
          { modelNumber: "", modelId: res.data.data.modelId },
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
      size: 50,
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
      .get(`/api/v1/partner/list-by-type?type=client`)
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
      headOfProductionDepartmentId: data.headOfDepartmentId,
      id: data.id,
      modelId: data.modelId,
      orderNumber: data.orderNumber,
      priority: data.priority,
    };
    await this.$axios
      .put("/api/v1/orders/update", order)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getOneOrder", {
          id: res.data.data.id,
          modelId: res.data.data.modelId,
        });
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
        commit("setInfoToOrder",res.data.data)
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async filterOrderList({ commit }, {page, size, data}) {
    const body = {
      filters: [
        {
          key: "orderNumber",
          operator: "LIKE",
          property_type: "STRING",
          value: data.orderNumber,
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: data.createdAt,
          valueTo: data.updatedAt
        },
      ],
      sorts: [],
      page,
      size,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    const modelGroup = data.modelGroup !== null ? data.modelGroup : ""
    await this.$axios
      .$put(`/api/v1/orders/list?modelGroup=${modelGroup}`, body)
      .then((res) => {
        commit("setOrders", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async getOrdersList({ commit }, { page, size, modelGroup = "" }) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    };
    await this.$axios
      .$put(`/api/v1/orders/list?modelGroup=${modelGroup}`, body)
      .then((res) => {
        commit("setOrders", res.data);
        commit("setLoading", false);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async getModelGroup({ commit }) {
    const body = {
      filter: [],
      sorts: [],
      page: 0,
      size: 50,
    };
    await this.$axios
      .$put(`/api/v1/model-groups/list`, body)
      .then((res) => {
        commit("setModelGroups", res.data.content);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
};
