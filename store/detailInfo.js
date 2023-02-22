export const state = () => ({
  detailInfo: {},
  modelGroups: [],
  orderId: "",
  modelId: "",
});

export const getters = {
  detailInfo: (state) => state.detailInfo.data,
  orderId: (state) => state.orderId,
  modelId: (state) => state.modelId,
  modelGroups: (state) => state.modelGroups.content,
};

export const mutations = {
  setDetailInfo(state, details) {
    state.detailInfo = details;
  },
  setModelGroups(state, group) {
    state.modelGroups = group;
  },
  setOrderId(state, id) {
    state.orderId = id;
  },
  setModelId(state, id) {
    state.modelId = id;
  },
};

export const actions = {
  async getDetailInfo({ commit }, { orderId, modelId }) {
    await this.$axios
      .get(`/api/v1/orders/detail-info?orderId=${orderId}&modelId=${modelId}`)
      .then((res) => {
        commit("setDetailInfo", res.data);
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
        commit("setModelGroups", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
};
