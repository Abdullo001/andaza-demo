export const state = () => ({
  modelsList: []
})

export const getters = {
  modelsList: state => state.modelsList.content
}

export const mutations = {
  setModels(state, model) {
    state.modelsList = model
  }
}

export const actions = {
  getModelsList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put(`/api/v1/models/list`, body)
      .then(res => {
        commit('setModels', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  }
}
