export const state = () => ({
  loading: true,
  nameData: [],
  specificationData:[],
  accessoryAllData: [],
  colorsList: [],
  selectedAccessory:{},
  planningchartTemplatesList:[],
})
export const getters = {
  loading: state => state.loading,
  nameData: state => state.nameData,
  specificationData: state => state.specificationData,
  accessoryAllData: state => state.accessoryAllData,
  colorsList: state => state.colorsList,
  selectedAccessory: state => state.selectedAccessory,
  planningchartTemplatesList: state => state.planningchartTemplatesList,
}
export const mutations = {
  setLoading(state, status) {
    state.loading = status
  },
  setAccessoryName(state, items){
    state.nameData = items
  },
  setAccessorySpecification(state, items){
    state.specificationData = items
  },
  setAllChartAccessory(state, data){
    state.accessoryAllData = data
  },
  setColorList(state, items){
    state.colorsList=items
  },
  setSelectedAccessory(state, items){
    state.selectedAccessory=items
  },
  setPlanningchartTemplatesList(state, items){
    state.planningchartTemplatesList=items
  },
}
export const actions = {
  async deleteChartAccessory({dispatch}, {id, accessoryPlanningId}){
    await this.$axios.$delete(`/api/v1/accessory-planning-charts/${id}`)
      .then(res => {
        dispatch("getChartAllData", accessoryPlanningId);
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message)
      })
  },
  async updateChartAccessory({dispatch}, {data,id,accessoryPlanningChartId}){
    await this.$axios.$put(`/api/v1/accessory-planning-charts/${accessoryPlanningChartId}`, data)
      .then(res => {
        dispatch("getChartAllData", id);
        this.$toast.success(res.code);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message)
      })
  },
  async createChartAccessory({dispatch}, {data,id}){

    await this.$axios.$post('/api/v1/accessory-planning-charts', data)
      .then(res => {
        dispatch("getChartAllData", id);
        this.$toast.success(res.code);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },


  async getChartAllData({commit}, id){
    await this.$axios.get(`/api/v1/accessory-planning-charts/list/${id}`)
      .then(res => {
        commit("setAllChartAccessory", res.data.data);

      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },

  async getColorsList({commit}){
    await this.$axios.get('/api/v1/colors/thin-list')
      .then((res) =>{
        commit("setColorList",res.data.data)
      })
      .catch((res)=>{
        console.log(res)
      })
  },
  async getPlanningChartTemplates({commit}){
    this.$axios.get(`/api/v1/templates/accessory-planning-chart`)
    .then((res)=>{
      commit("setPlanningchartTemplatesList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  async setPlanningChartTemplate({dispatch},{accessoryPlanningId,templateName}){
    this.$axios.put(`/api/v1/templates/accessory-planning-chart`,{accessoryPlanningId,templateName})
    .then((res)=>{
      dispatch("getChartAllData",accessoryPlanningId)
      this.$toast.succes(res.data.succes)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  async createPlanningChartTemplate({dispatch},{accessoryPlanningId,templateName}){
    this.$axios.post(`/api/v1/templates/accessory-planning-chart`,{accessoryPlanningId,templateName})
    .then((_res)=>{
      dispatch("getPlanningChartTemplates")
    })
    .catch(({response})=>{
      console.log(response);
    })
  }
}
