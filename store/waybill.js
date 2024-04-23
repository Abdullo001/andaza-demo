export const state = () => ({
  waybillList: [],
  waybillInfo: {},
  additionList: [],
  oneWaybill:{},
  newWaybillId:"",
  waybillItems:[],
  secondWaybillItems:[],
});

export const getters = {
  waybillList: (state) => state.waybillList.content,
  totalElements: (state) => state.waybillList.totalElements,
  waybillInfo: (state) => state.waybillInfo,
  additionList: (state) => state.additionList,
  oneWaybill: (state) => state.oneWaybill,
  newWaybillId: (state) => state.newWaybillId,
  waybillItems: (state) => state.waybillItems,
  secondWaybillItems: (state) => state.secondWaybillItems,
};

export const mutations = {
  setWaybillList(state, item) {
    state.waybillList = item;
  },
  setWaybillInfo(state, item) {
    state.waybillInfo = item;
  },
  setAdditionList(state, item) {
    state.additionList = item;
  },
  setOneWaybill(state, item) {
    state.oneWaybill = item;
  },
  setNewWaybillId(state, item) {
    state.newWaybillId = item;
  },
  setWaybillItems(state, item) {
    state.waybillItems = item;
  },
  setSecondWaybillItems(state, item) {
    state.secondWaybillItems = item;
  },
};

export const actions = {
  getWaybillList({ commit },{ fromDate, modelNumber, page, size, number, toDate, type, partnerName }
  ) {
    const data = {
      fromDate: fromDate ?? null,
      last: true,
      modelNumber: modelNumber ?? "",
      number: number ?? "",
      page,
      partnerName: partnerName ?? "",
      size,
      toDate: toDate ?? null,
      type,
    };
    this.$axios.put(`/api/v1/waybill`, data)
      .then((res) => {
        commit("setWaybillList", res.data.data);
      })
      .catch((response) => {
        console.log(response);
      });
  },
  createWaybillList({ commit }, data) {
    this.$axios.post(`/api/v1/waybill`, data)
      .then((res) => {
        commit("setNewWaybillId",res.data.data.id)
        this.$toast.success(res.data.message);
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  getOneWaybill({ commit }, id) {
    this.$axios.get(`/api/v1/waybill/${id}`)
      .then((res) => {
        commit("setOneWaybill",res.data.data)
      })
      .catch((response) => {
        console.log(response);
      });
  },
  updateWaybill({dispatch},{data,id}){
    this.$axios.put(`/api/v1/waybill/${id}`,data)
    .then((res)=>{
      this.$toast.success(res.data.message);
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message);
    })
  },
  getAdditionalList({ commit }, id) {
    this.$axios.get(`/api/v1/waybill/addition/${id}`)
      .then((res) => {
        commit("setAdditionList", res.data.data);
      })
      .catch((response) => {
        console.log(response);
      });
  },
  createAddition({ dispatch }, { id, data }) {
    this.$axios.post(`/api/v1/waybill/addition/${id}`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch("getAdditionalList", id);
      })
      .catch((response) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  getWaybillInfos({ commit }, id) {
    this.$axios.get(`/api/v1/waybill/info/${id}`)
      .then((res) => {
        commit("setWaybillInfo", res.data.data);
      })
      .catch((response) => {
        console.log(response);
      });
  },
  setWaybillInfos({ dispatch }, { id, data }) {
    this.$axios
      .put(`/api/v1/waybill/info/${id}`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
      })
      .catch(({ response }) => {
        this.$toast.error(response.data.message);

        console.log(response);
      });
  },
  getWaybillItems({commit},{id,type}){
    this.$axios.get(`/api/v1/waybill/item/${id}?type=${type}`)
    .then((res)=>{
      if(type==="FIRST_CLASS"){
        commit("setWaybillItems",res.data.data)
      }
      if(type==="SECOND_CLASS"){
        commit("setSecondWaybillItems",res.data.data)
      }

    })
    .catch((response)=>{
      console.log(response);
    })
  }

};
