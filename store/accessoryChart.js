export const state = () => ({
  loading: true,
  nameData: [],
  accessoryAllData: [],
})
export const getters = {
  loading: state => state.loading,
  nameData: state => state.nameData,
  accessoryAllData: state => state.accessoryAllData,
}
export const mutations = {
  setLoading(state, status) {
    state.loading = status
  },
  setAccessoryName(state, items){
    state.nameData = items
  },
  setAllChartAccessory(state, data){
    state.accessoryAllData = data
  },
}
export const actions = {
  async deleteChartAccessory({dispatch}, {id, accessoryPlanningId}){
    await this.$axios.$delete(`/api/v1/accessory-planning-chart/delete?id=${id}`)
      .then(res => {
        dispatch("getChartAllData", accessoryPlanningId);
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message)
      })
  },
  async updateChartAccessory({dispatch}, data){
    await this.$axios.$put('/api/v1/accessory-planning-chart/update', data)
      .then(res => {
        dispatch("getChartAllData", data.accessoryPlanningId);
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message)
      })
  },
  async createChartAccessory({dispatch}, data){
    await this.$axios.$post('/api/v1/accessory-planning-chart/create', data)
      .then(res => {
        dispatch("getChartAllData", data.accessoryPlanningId);
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message)
      })
  },
  async getAccessoryList({commit}){
    const body = {
      filters : [],
      sorts: [],
      page: 0,
      size: 100
    }
    await this.$axios.$put(`/api/v1/accessory/list`, body)
      .then(res => {
        commit("setAccessoryName", res.data.content)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getChartAllData({commit}, id){
    await this.$axios.get(`/api/v1/accessory-planning-chart/list?accessoryPlanningId=${id}`)
      .then(res => {
        console.log(res);
        commit("setAllChartAccessory", res.data.data);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },
}
