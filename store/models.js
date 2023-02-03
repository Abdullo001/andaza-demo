export const state = () => ({
  modelsList: [],
  oneModel: {},
  modelGroups: []
})

export const getters = {
  modelsList: state => state.modelsList.content,
  oneModel: state => state.oneModel,
  modelGroups: state => state.modelGroups.content,

}

export const mutations = {
  setModels(state, model) {
    state.modelsList = model
  },
  setOneModel(state, details) {
    state.oneModel = details
  },
  setModelGroups(state, group) {
    state.modelGroups = group
  }
}

export const actions = {
  getModelsList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put(`/api/v1/models/list?partner=`, body)
      .then(res => {
        commit('setModels', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  getOneModel({commit}, id) {
    this.$axios.$get(`/api/v1/models/get?id=${id}`)
      .then(res => {
        commit('setOneModel', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  getModelGroup({commit}) {
    const body = {
      filter: [],
      sorts: [],
      page: 0,
      size: 50
    }
    this.$axios.$put(`/api/v1/model-groups/list`, body)
      .then(res => {
        commit('setModelGroups', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  }
}
