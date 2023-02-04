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
  async getModelsList({commit}, {page, size, modelNumber, partner, status}) {
    const body = {
      filters: [
        {
          key: 'modelNumber',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: modelNumber
        },
        {
          key: 'status',
          operator: 'EQUAL',
          propertyType: 'STRING',
          value: status
        },
      ],
      sorts: [],
      page, size
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    partner = partner === null ? '' : partner
    await this.$axios.$put(`/api/v1/models/list?partner=${partner}`, body)
      .then(res => {
        commit('setModels', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getOneModel({commit}, id) {
    await this.$axios.$get(`/api/v1/models/get?id=${id}`)
      .then(res => {
        commit('setOneModel', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getModelGroup({commit}) {
    const body = {
      filter: [],
      sorts: [],
      page: 0,
      size: 50
    }
    await this.$axios.$put(`/api/v1/model-groups/list`, body)
      .then(res => {
        commit('setModelGroups', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async changeStatusModel({dispatch}, {id, status}) {
    await this.$axios.$put(`/api/v1/models/change-status?id=${id}&status=${status}`)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  }
}
