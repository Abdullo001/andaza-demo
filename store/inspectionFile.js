
export const state = () => ({
  inspectionFileList: [],
  inspectionList:[],
  model:{},
});
export const getters = {
  inspectionFileList: state => state.inspectionFileList,
  model: state => state.model,
  inspectionList: state => state.inspectionList.items,
  totalElements: state => state.inspectionList.totalElements,

};
export const mutations = {
  setInspectionFileList(state, item) {
    state.inspectionFileList = item
  },
  setInspectionList(state, item) {
    state.inspectionList = item
  },
  setModel(state, item) {
    state.model = item
  },
};
export const actions = {
    async getInspectionFileList({commit}, id) {
    await this.$axios.get(`/api/v1/inspections/${id}`)
      .then(res => {
        commit('setInspectionFileList', res.data.data)
        
      })
      .catch(res => console.log(res.message))
  },
  async uploadInspectionFile({commit, dispatch}, {data, id} ) {
    await this.$axios.post('/api/v1/inspections', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getInspectionFileList', id)
      })
      .catch(res => this.$toast.error(res.message))
  },
  async updateInspectionFile({commit, dispatch}, {data, id,inspectionId} ) {
    await this.$axios.put(`/api/v1/inspections/${inspectionId}`, data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getInspectionFileList', id)
      })
      .catch(res => this.$toast.error(res.message))
  },

  getInspectionList({commit},{clientName="",modelNumber="",page,size}){
      clientName=clientName??"",
      modelNumber=modelNumber??"",
    this.$axios.get(`/api/v1/inspections?page=${page}&size=${size}&clientName=${clientName}&modelNumber=${modelNumber}`)
    .then((res)=>{
      commit("setInspectionList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  }
};
