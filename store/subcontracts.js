export const state = () => ({
  cooperation_type: [],
  partnerList: [],
  measurementUnitList: [],
  subcontractsList: [],
  modelList: {},
});

export const getters = {
  cooperation_type: (state) => state.cooperation_type.data,
  partnerList: (state) => state.partnerList.content,
  measurementUnitList: (state) => state.measurementUnitList.data,
  subcontractsList: (state) => state.subcontractsList.data,
  modelList: (state) => state.modelList.content,
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
  setSubcontractsList(state, data) {
    state.subcontractsList = data;
  },
  setModelList(state, item) {
    state.modelList = item;
  },
};

export const actions = {
  async getSubcontractsList({ commit }, { modelNumber,modelId }) {
    modelNumber = modelNumber === null ? "" : modelNumber;

    this.$axios
      .get(`/api/v1/subcontracts/get-modelNumber?modelId=${modelId}&modelNumber=${modelNumber}`)
      .then((res) => {
        commit("setSubcontractsList", res.data);
      })
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

  async createSubcontracts({ dispatch }, data) {
    this.$axios
      .post("/api/v1/subcontracts/create", data)
      .then((res) => {
        console.log(res);
        dispatch("getSubcontractsList", { modelNumber: "",modelId:res.data.data.modelId });
        this.$toast.success(res.data.message);
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message, { theme: "toasted-primary" });
      });
  },

  async getModelList({ commit }) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 50,
    };
    await this.$axios
      .put(`/api/v1/models/list?partner=`, body)
      .then((res) => {
        commit("setModelList", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  async updateSubcontracts({ dispatch },  data ) {
    const body = {
      cooperationTypeId: data.cooperationTypeId,
      description: data.description,
      dispatchedDate: data.dispatchedDate,
      id: data.id,
      measurementUnitId: data.measurementUnitId,
      modelId: data.modelId,
      partnerId: data.partnerId,
      quantity: data.quantity,
    };
    await this.$axios
      .put(`/api/v1/subcontracts/update`, body)
      .then((res) => {
        console.log(res);
        dispatch("getSubcontractsList",{modelNumber:"",modelId:body.modelId})
        this.$toast.success(res.message, { theme: "toasted-primary" });
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message, { theme: "toasted-primary" });
      });
  },

  async deleteSubcontractServer({dispatch},{id,modelId}){
    await this.$axios.delete(`/api/v1/subcontracts/delete?id=${id}`)
    .then((res)=>{
      console.log(res);
      dispatch("getSubcontractsList",{modelNumber:"",modelId:modelId})
    })
    .catch((res)=>{
      console.log(res);
    })
  }
};
