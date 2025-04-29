export const state = () => ({
  totalAnalysis: [],
  modelsAnalysis: [],
});

export const getters = {
  totalAnalysis: (state) => state.totalAnalysis,
  modelsAnalysisList: (state) => state.modelsAnalysis.infos,
  modelsAnalysis: (state) => state.modelsAnalysis,
};

export const mutations = {
  setTotalAnalysis(state, totalAnalysis) {
    state.totalAnalysis = totalAnalysis;
  },
  setModelsAnalysis(state, modelsAnalysis) {
    state.modelsAnalysis = modelsAnalysis;
  },
};

export const actions = {
  getTotalAnalysis({ commit }, period) {
    this.$axios.get(`/api/v1/analytics/total?period=${period}`)
      .then((res) => {
        commit("setTotalAnalysis", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  getModalsAnalytics({commit},{clientName="",from="",to=""}){
    const body = {
      clientName: clientName?? "",
      from: from?? "",
      to: to?? "",
    }
    this.$axios.put(`/api/v1/analytics/models`,body)
    .then((res)=>{
      commit("setModelsAnalysis", res.data.data);
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  getModelsAnalyticsById({commit}, id){
    this.$axios.get(`/api/v1/analytics/by-model?modelId=${id}`)
    .then((res)=>{
      commit("setModelsAnalysis", res.data.data);
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  setManualCost({dispatch}, data){
    this.$axios.put(`/api/v1/analytics/set-cost-value`,data)
    .then((res)=>{
      dispatch("getModelsAnalyticsById", data.modelId);
    })
    .catch(({response})=>{
      console.log(response);
    })
  }
};
