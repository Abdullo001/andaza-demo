export const state = () => ({
  cooperation_type: [],
  partnerList: [],
  subcontractsList: [],
  modelList: {},
  planningProcessId:null,
});

export const getters = {
  cooperation_type: (state) => state.cooperation_type.data,
  partnerList: (state) => state.partnerList.content,
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
  setSubcontractsList(state, data) {
    state.subcontractsList = data;
  },
  setModelList(state, item) {
    state.modelList = item;
  },
  setPlanningProcessId(state, item) {
    state.planningProcessId = item;
  },
};

export const actions = {
  async getSubcontractsList({ commit,state }, ) {
    await this.$axios
      .get(`/api/v1/process-details/list-subcontractor?planningProcessId=${state.planningProcessId}`)
      .then((res) => {
        commit("setSubcontractsList", res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },

  async getCooperationTypes({ commit }) {
    await this.$axios
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
    await this.$axios
      .put("/api/v1/partner/list", body)
      .then((res) => {
        commit("setPartnerList", res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async createSubcontracts({ dispatch }, data) {
    await this.$axios
      .post("/api/v1/subcontracts/create", data)
      .then((res) => {
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

  setUpdateSizes({dispatch,state},data){
    this.$axios.put(`/api/v1/process-details/${data.id}`,data)
    .then((res)=>{
      dispatch("getSubcontractsList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  setClassification({commit,state}){
    this.$axios.get(`/api/v1/classification/list-subcontractor?planningProcessId=${state.planningProcessId}`)
    .then((res)=>{
      commit(
        "cuttingProcess/setClassificationList",
        res.data.data,
        { root: true }
      );
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createClassification({dispatch},data){
    this.$axios.post(`/api/v1/classification/create`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getSubcontractsList")
      dispatch("setClassification")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  updateClassificationSubcontract({dispatch},data){
    this.$axios.put(`/api/v1/classification/update`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getSubcontractsList")
      dispatch("setClassification")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  deleteClassificationSubcontracts({dispatch},id){
    this.$axios.delete(`/api/v1/classification/delete?id=${id}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getSubcontractsList")
      dispatch("setClassification")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  saveReturnFabric({dispatch},data){
    this.$axios.put(`/api/v1/process-details/return-fabric`,data)
    .then((res)=>{
      this.$toast.success(res.data.message)
      dispatch("getSubcontractsList")
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },

  async deleteSubcontractServer({dispatch},{id}){
    await this.$axios.delete(`/api/v1/process-details/delete?id=${id}`)
    .then((res)=>{
      this.$toast.success(res.data.message);
      dispatch("getSubcontractsList")

    })
    .catch((res)=>{
      console.log(res);
    })
  },

  changeStatus({dispatch},{id,status}){
    this.$axios.put(`/api/v1/process-details/change-status?id=${id}&status=${status}`)
    .then((res)=>{
      dispatch("getSubcontractsList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  setMainColor({dispatch},id){
    this.$axios.put(`/api/v1/process-details/set-main?fabricProcessDetailsId=${id}`)
    .then((res)=>{
      dispatch("getSubcontractsList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  setWasteFabric({dispatch,state},data){
    this.$axios.put(`/api/v1/process-details/set-waste-fabric`,data)
    .then((res)=>{
      dispatch("getSubcontractsList")
      this.$toast.success(res.data.message)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
};
