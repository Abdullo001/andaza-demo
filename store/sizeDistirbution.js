export const state = () => ({
  sizeDistirbutionInfo: {},
  bodyParts: {},
  sizes: [],
  sizeValues: [],
  bodyPartValues: {},
  total: null,
  order:[],
});

export const getters = {
  bodyParts: (state) => state.bodyParts.parts,
  sizes: (state) => state.sizes.sizes,
  sizeValues: (state) => state.sizeValues.sizeDistributions,
  bodyPartValues: (state) => state.bodyPartValues.bodyPartsCodes,
  total: (state) => state.total,
  modelId: (state)=>state.order?.content[0]?.modelId
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

  setSizeValues(state, item) {
    state.sizeValues = item;
  },

  setBodyPartsValues(state, item) {
    state.bodyPartValues = item;
  },
  setOneOrder(state,item){
    state.order=item
  }
};

export const actions = {
  async getSizeDistirbution({ commit }, { modelId }) {
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

  async getSizeDistirbutionValue({ commit }, { modelId, orderId }) {
    await this.$axios
      .get(
        `/api/v1/orders/get-size-distributions?orderId=${orderId}&modelId=${modelId}`
      )
      .then((res) => {
        commit("setSizeValues", res.data.data);
        commit("setBodyPartsValues", res.data.data);
        commit("setTotal", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  async updateSizeDistirbutionValue({ dispatch }, data) {
    await this.$axios
      .put(`/api/v1/orders/set-size-distributions`, data)
      .then((res) => {
        dispatch("getSizeDistirbutionValue", {
          modelId: data.modelId,
          orderId: data.orderId,
        });
        this.$toast.success(res.message, { theme: "toasted-primary" });
      })
      .catch((res) => {
        console.log(res);
      });
  },

  async getOneOrder({ commit }, { page, size, id }) {
    const body = {
      filters: [
        {
          key: "id",
          propertyType: "LONG",
          operator: "EQUAL",
          value: id,
        },
      ],
      sorts: [],
      page,
      size,
    };
    body.filters = body.filters.filter(
      (item) => item.value !== "" && item.value !== null
    );

    await this.$axios
      .$put(`/api/v1/orders/list?modelGroup=`, body)
      .then((res) => {
        commit("setOneOrder", res.data);
        console.log(res);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
};
