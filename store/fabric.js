export const state = () => ({
  fabricList: [],
  fabricData: [],
  modelId: '',
  fabricPlanningId: '',
  planningChartList: [],
  onePlanningChart: {},
  planningchartTemplatesList:[],
});

export const getters = {
  fabricList: state => state.fabricList.content,
  totalElements: state => state.fabricList.totalElements,
  fabricData: state => state.fabricData,
  modelId: state => state.modelId,
  fabricPlanningId: state => state.fabricPlanningId,
  planningChartList: state => state.planningChartList,
  onePlanningChart: state => state.onePlanningChart,
  planningchartTemplatesList: state => state.planningchartTemplatesList,
};
export const mutations = {
  setFabricList(state, fabric) {
    state.fabricList = fabric;
  },
  setFabricData(state, data) {
    state.fabricData = data
  },
  setModelId(state, id) {
    state.modelId = id;
  },
  setFabricPlanningId(state, id) {
    state.fabricPlanningId = id;
  },
  setPlanningChartList(state, chartList) {
    state.planningChartList = chartList;
  },
  setOnePlanningChart(state, item) {
    state.onePlanningChart = item;
  },
  setPlanningchartTemplatesList(state, item) {
    state.planningchartTemplatesList = item;
  },
};
export const actions = {
  async getFabricList({commit}, {page, size, data}) {
    const body = {
      orderNumber:data.orderNumber,
      modelNumber:data.modelNumber,
      clientName:data.clientName?.name,
      creatorId:data.creatorId?.id,
      page,
      size
    }
    await this.$axios.$put('/api/v1/fabric-planning/list', body)
      .then(res => {
        commit('setFabricList', res.data);
      }).catch(({response}) => console.log(response))
  },
  async getOrderNames({commit}, id) {
    if(!!id) {
      await this.$axios.$get(`/api/v1/fabric-planning/model-order-info?modelId=${id}`)
        .then(res => {
          commit('setFabricData', res.data)
        }).catch(({response}) => {
          this.$toast.error(response.data.message)
      })
    }
  },
  async savePlanning({commit, dispatch, state}, data) {
    await this.$axios.$post('/api/v1/fabric-planning/create', data)
      .then(res => {
        this.$toast.success(res.message)
        commit('setFabricPlanningId', res.data.id)
        dispatch('getPlanningChartList', res.data.id)
      }).catch(({response}) => this.$toast.error(response.data.message))
  },
  async createPlanningChart({dispatch}, {data, id}) {
    await this.$axios.$post('/api/v1/fabric-planning-chart/create', data)
      .then(res => {
        this.$toast.success('Successfully created');
        dispatch('getPlanningChartList', id);
      }).catch(({response}) => {
        this.$toast.error(response.data.message);
      })
  },
  async getPlanningChartList({commit}, id) {
    await this.$axios.$get(`/api/v1/fabric-planning-chart/list?fabricPlanningId=${id}`)
      .then(res => {
        commit('setPlanningChartList', res.data)
      }).catch(({response}) => console.log(response))
  },
  async getPlanningChartListOne({commit}, id) {
    await this.$axios.$get(`/api/v1/fabric-planning/get-one?id=${id}`)
      .then(res => {
        commit('setOnePlanningChart', res.data)
      }).catch(({response}) => console.log(response))
  },
  async deleteFabricPlanningChart({dispatch}, {itemId, fabricId}) {
    await this.$axios.$delete(`/api/v1/fabric-planning-chart/delete?id=${itemId}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getPlanningChartList', fabricId)
      }).catch(({response}) => console.log(response));
  },
  async updatePlanningChart({dispatch}, {id, data}) {
    await this.$axios.$put(`/api/v1/fabric-planning-chart/update`, data)
      .then(res => {
        dispatch('getPlanningChartList', id);
        dispatch('fabricOrdered/getFabricOrdered',id,{root:true})
        this.$toast.success(res.message);
      }).catch(({response}) => console.log(response));
  },
  async getPlanningChartTemplates({commit}){
    this.$axios.get(`/api/v1/templates/fabric-planning-chart`)
    .then((res)=>{
      commit("setPlanningchartTemplatesList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  async setPlanningChartTemplate({dispatch},{fabricPlanningId,templateName}){
    this.$axios.put(`/api/v1/templates/fabric-planning-chart`,{fabricPlanningId,templateName})
    .then((res)=>{
      dispatch("getPlanningChartList",fabricPlanningId)
      this.$toast.succes(res.data.succes)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  async createPlanningChartTemplate({dispatch},{fabricPlanningId,templateName}){
    this.$axios.post(`/api/v1/templates/fabric-planning-chart`,{fabricPlanningId,templateName})
    .then((_res)=>{
      dispatch("getPlanningChartTemplates")
    })
    .catch(({response})=>{
      console.log(response);
    })
  }
};
