export const state = () => ({
  modelsList: [],
  oneModel: {},
  modelGroups: [],
  partner_enums: [],
  newModelId: null,
  compositions: []
})

export const getters = {
  modelsList: state => state.modelsList.content,
  oneModel: state => state.oneModel,
  modelGroups: state => state.modelGroups.content,
  partner_enums: state => state.partner_enums.content,
  newModelId: state => state.newModelId,
  compositionList: state => state.compositions
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
  },
  setPartnerEnums(state, partner) {
    state.partner_enums = partner
  },
  setNewModelId(state, id) {
    state.newModelId = id
  },
  setCompositions(state, item) {
    state.compositions = item;
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
          propertyType: 'STATUS',
          value: status
        },
      ],
      sorts: [],
      page, size
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    partner = partner === null ? '' : partner
    await this.$axios.$put(`/api/v1/models/list?partner=${partner}&status=${status}`, body)
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
  },
  async getPartnerList({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 15
    }
    await this.$axios.$put('/api/v1/partner/list', body)
      .then(res => {
        commit('setPartnerEnums', res.data);
      })
      .catch(({response}) => console.log(response))
  },
  async createModel({commit}, data) {
    console.log(data);
    const model = {
      compositionId: data.compositionId,
      description: data.description,
      gender: data.gender,
      groupId: data.group,
      licenseRequired: data.licence,
      modelNumber: data.number,
      name: data.name,
      partnerId: data.partnerId,
      season: data.season,
      status: "ACTIVE"
    }
    this.$axios.$post('/api/v1/models/create', model)
      .then(res => {
        commit('setNewModelId', res.data.id);
        this.$toast.success(res.message, {theme: 'toasted-primary'});
      }).catch(({response}) => console.log(response))
  },
  async updateModel({commit}, {data, id}) {
    const model = {
      compositionId: data.compositionId,
      description: data.description,
      gender: data.gender,
      groupId: data.group,
      licenseRequired: data.licence,
      modelNumber: data.number,
      name: data.name,
      partnerId: data.partnerId,
      season: data.season,
      id: id,
      status: "ACTIVE"
    }
    this.$axios.$put('/api/v1/models/update', model)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'});
      }).catch(({response}) => {
      console.log(response);
      this.$toast.error(response.data.message, {theme: 'toasted-primary'})
    })
  },
  getCompositionList({commit}) {
    this.$axios.$get('/api/v1/composition/thin-list')
      .then(res => {
        commit('setCompositions', res.data);
      }).catch(({response}) => console.log(response))
  }
}
