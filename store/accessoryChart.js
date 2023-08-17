export const state = () => ({
  loading: true,
  nameData: [],
  specificationData:[],
  accessoryAllData: [],
  colorsList: [],
})
export const getters = {
  loading: state => state.loading,
  nameData: state => state.nameData,
  specificationData: state => state.specificationData,
  accessoryAllData: state => state.accessoryAllData,
  colorsList: state => state.colorsList
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
  }
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
      filters : [
        // {
        //   key:"id",
        //   operator:"EQUAL",
        //   propertyType:"LONG",
        //   value:a,
        // }
      ],
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

  async getAccessoryComposition({commit},id){

    const body = {
      filters : [
        {
          key:"id",
          operator:"EQUAL",
          propertyType:"LONG",
          value:id,
        }
      ],
      sorts: [],
      page: 0,
      size: 100
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put(`/api/v1/accessory/list`, body)
      .then(res => {
        commit("setAccessorySpecification", res.data.content[0]?.specification)

      })
      .catch(({response}) => {
        console.log(response)
      })
  },

  async getChartAllData({commit}, id){
    await this.$axios.get(`/api/v1/accessory-planning-chart/list?accessoryPlanningId=${id}`)
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
        console.log(res)
      })
      .catch((res)=>{
        console.log(res)
      })

  }
}
