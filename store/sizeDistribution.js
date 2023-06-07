export const state = () => ({
  sizeDistributionInfo: {},
  bodyParts: {},
  sizes: [],
  sizeValues: [],
  bodyPartValues: {},
  total: null,
  overproductionPercent: null,
  totalWithOverproductionPercent: null,
  order: [],
});

export const getters = {
  bodyParts: (state) => state.bodyParts.parts,
  sizes: (state) => state.sizes.sizes,
  sizeValues: (state) => state.sizeValues.sizeDistributions,
  bodyPartValues: (state) => state.bodyPartValues.bodyPartsCodes,
  total: (state) => state.total,
  overproductionPercent: (state) => state.overproductionPercent,
  totalWithOverproductionPercent: (state) => state.totalWithOverproductionPercent,
  modelId: (state) => state.order?.content[0]?.modelId,
};

export const mutations = {
  setBodyParts(state, item) {
    state.bodyParts = item;
  },
  setSizes(state, item) {
    state.sizes = item;
  },
  setTotal(state, item) {
    state.total = item;
  },
  setOverproductionPercent(state, item) {
    state.overproductionPercent = item
  },
  totalWithOverproductionPercent(state, item) {
    state.totalWithOverproductionPercent = item
  },
  setSizeValues(state, item) {
    state.sizeValues = item;
  },
  setBodyPartsValues(state, item) {
    state.bodyPartValues = item;
  },
  setOneOrder(state, item) {
    state.order = item;
  },
};

export const actions = {
  async getSizeDistribution({commit}, {modelId}) {
    await this.$axios
      .get(`/api/v1/orders/size-distributions-info?modelId=${modelId}`)
      .then((res) => {
        commit("setSizes", res.data.data);
        commit("setBodyParts", res.data.data);
      })
      .catch((response) => {
        console.log(response);
      });
  },
  async getSizeDistributionValue({commit}, {modelId, orderId}) {
    await this.$axios
      .get(
        `/api/v1/orders/get-size-distributions?orderId=${orderId}&modelId=${modelId}`
      )
      .then((res) => {
        commit("setSizeValues", res.data.data);
        commit("setBodyPartsValues", res.data.data);
        commit("setTotal", res.data.data);
        commit("setOverproductionPercent", res.data.data);
        commit("totalWithOverproductionPercent", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async updateSizeDistributionValue({dispatch}, data) {
    await this.$axios
      .$put(`/api/v1/orders/set-size-distributions`, data)
      .then((res) => {
        dispatch("getSizeDistributionValue", {
          modelId: data.modelId,
          orderId: data.orderId,
        });
        dispatch(
          "orders/getOneOrder",
          { id: data.orderId, modelId: data.modelId },
          {root:true});
        this.$toast.success(res.message);
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.message);
      });
  },
  async deleteSizeDistributionFunc({dispatch}, {orderId, modelId}) {
    await this.$axios.$delete(
      `api/v1/orders/delete-size-distributions?modelId=${modelId}&orderId=${orderId}`)
      .then((res) => {
        dispatch("getSizeDistributionValue", {orderId, modelId})
        this.$toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message);

      })
  },
};
