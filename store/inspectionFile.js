// export const state = () => ({
//   inspectionFileList: [],
// })
//
// export const getters = {
//   inspectionFileList: state => state.inspectionFileList
// }
//
// export const mutations = {
//   setInspectionFileList(state, item) {
//     state.inspectionFileList = item
//   }
// }
//
// export const actions = {
//   async getInspectionFileList({commit}, id) {
//     await this.$axios.$get(`/api/v1/models/get/inspection?modelId=${id}`)
//       .then(res => {
//         this.$toast.success(res.message)
//         commit('setInspectionFileList', res.data)
//       })
//       .catch(res => this.$toast.error(res.message))
//   },
//   async uploadInspectionFile({commit, dispatch}, {data, id} ) {
//     await this.$axios.$put('/api/v1/models/add/inspection', data)
//       .then(res => {
//         this.$toast.success(res.message)
//         dispatch('getInspectionFileList', id)
//       })
//       .catch(res => this.$toast.error(res.message))
//   }
// }

export const state = () => ({
  inspectionFileList: [],
});
export const getters = {
  inspectionFileList: state => state.inspectionFileList

};
export const mutations = {
  setInspectionFileList(state, item) {
    state.inspectionFileList = item
  }
};
export const actions = {
    async getInspectionFileList({commit}, id) {
    await this.$axios.$get(`/api/v1/models/get/inspection?modelId=${id}`)
      .then(res => {
        commit('setInspectionFileList', res.data)
      })
      .catch(res => console.log(res.message))
  },
  async uploadInspectionFile({commit, dispatch}, {data, id} ) {
    await this.$axios.$put('/api/v1/models/add/inspection', data)
      .then(res => {
        this.$toast.success(res.message)
        dispatch('getInspectionFileList', id)
      })
      .catch(res => this.$toast.error(res.message))
  }
};
