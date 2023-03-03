export const state = () => ({
  cooperation_type: [],
  partnerList: [],
  measurementUnitList: [],
});

export const getters = {
  cooperation_type: (state) => state.cooperation_type.data,
  partnerList: (state) => state.partnerList.content,
  measurementUnitList: (state) => state.measurementUnitList.data,
};

export const mutations = {
  setCooperationType(state, item) {
    state.cooperation_type = item;
  },
  setPartnerList(state, item) {
    state.partnerList = item;
  },
  getMeasurementUnitList(state, data) {
    state.measurementUnitList = data;
  },
};

export const actions = {
  async getSubcontractsList({ commit }) {
    this.$axios
      .get(`/api/v1/subcontracts/get-modelNumber?modelNumber=GR-86-42`)
      .then((res) => {})
      .catch((res) => {
        console.log(res);
      });
  },

  async getCooperationTypes({ commit }) {
    this.$axios
      .get(`/api/v1/cooperation-types/thin-list`)
      .then((res) => {
        commit("setCooperationType", res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  async getPartnerList({ commit }) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 50,
    };
    this.$axios
      .put("/api/v1/partner/list", body)
      .then((res) => {
        commit("setPartnerList", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  async getMeasurementUnit({ commit }) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 50,
    };

    await this.$axios
      .get(`/api/v1/measurement-unit/thin-list`)
      .then((res) => {
        commit("getMeasurementUnitList", res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  //   async createSubcontracts({ dispatch }, subcontracts) {
  //     const body = {
  //       cooperationTypeId: 1,
  //       description: "test",
  //       dispatchedDate: "2023-02-27 12:04:32",
  //       measurementUnitId: 1,
  //       modelId: 1,
  //       partnerId: 1,
  //       quantity: 100,
  //       // cooperationTypeId: subcontracts.cooperationTypeId,
  //       // description: subcontracts.comment,
  //       // dispatchedDate: subcontracts.dispatchedDate,
  //       // measurementUnitId: subcontracts.measurementUnitId,
  //       // modelId: subcontracts.modelId,
  //       // partnerId: subcontracts.partnerId,
  //       // quantity: subcontracts.quantity,
  //     };

  //     await this.$axios
  //       .post(`/api/v1/subcontracts/create`, body)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((res) => {
  //         console.log(res);
  //       });
  //   },

  async createSubcontracts({ commit }, data) {
    const item = {
      cooperationTypeId: 1,
      description: "test",
      dispatchedDate: "2023-02-28 20:04:03",
      measurementUnitId: 2,
      modelId: 1,
      partnerId: 2,
      quantity: 100,
    };
    this.$axios
      .post("/api/v1/subcontracts/create", item)
      .then((res) => {
        console.log(res);
        this.$toast.success(res.message, { theme: "toasted-primary" });
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message, { theme: "toasted-primary" });
      });
  },
};
