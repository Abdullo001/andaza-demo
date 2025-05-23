export const state = () => ({
  partName: [],
  modelPartsList: [],
  yarnNumbersList: [],
  canvasTypeList: [],
  yarnType: [],
  compositionList: [],
  oneModelParts: {},
  modelPartsTemplates:[],

});
export const getters = {
  partName: state => state.partName,
  modelPartsList: state => state.modelPartsList,
  yarnNumbersList: state => state.yarnNumbersList,
  canvasTypeList: state => state.canvasTypeList,
  yarnType: state => state.yarnType,
  compositionList: state => state.compositionList,
  oneModelParts: state => state.oneModelParts,
  modelPartsTemplates: state => state.modelPartsTemplates,

}
export const mutations = {
  setPartName(state, parts) {
    state.partName = parts;
  },
  setModelPartsList(state, item) {
    state.modelPartsList = item;
  },
  setYarnNumbers(state, item) {
    state.yarnNumbersList = item;
  },
  setCanvasType(state, item) {
    state.canvasTypeList = item;
  },
  setYarnType(state, item) {
    state.yarnType = item;
  },
  setComposition(state, item) {
    state.compositionList = item;
  },
  setOneModelParts(state, elem) {
    state.oneModelParts = elem;
  },
  setModelPartsTemplates(state, elem) {
    state.modelPartsTemplates = elem;
  },
};
export const actions = {
  getPartName({commit},name) {
    const body = {
      filters: [
        {
          key: 'partName',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    this.$axios.$put('/api/v1/body-parts/list', body)
      .then(res => {
        commit('setPartName', res.data.content);
      })
      .catch(({response}) => console.log(response))
  },
  async getModelPart({commit}, id) {
    const body = {
      filters: [
        {
          key: "status",
          operator: "EQUAL",
          propertyType: "STATUS",
          value: "ACTIVE"
        }
      ],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put(`/api/v1/model-parts/list?modelId=${id}`, body)
      .then(res => {
        commit('setModelPartsList', res.data);
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message)
      })
  },
  async createModelParts({commit, dispatch}, data) {
    delete data.createdBy;
    delete data.createAt;
    delete data.partComposition;
    delete data.yarnTypeId
    data.bodyPartId=data.bodyPartId?.id
    data.compositionId=data.compositionId?.id
    data.yarnNumberId=data.yarnNumberId?.id
    data.canvasTypeId=data.canvasTypeId?.id

    await this.$axios.$post(`/api/v1/model-parts/create`, data)
      .then(res => {
        this.$toast.success(res.data.message, {theme: 'toasted-primary'});
        dispatch('getModelPart', data.modelId);
      })
      .catch(({response}) => this.$toast.error(response.data.errorMessage))
  },
  async updateModelParts({dispatch}, data) {
    const body = {
      bodyPartId: data.bodyPartId?.id,
      canvasTypeId: data.canvasTypeId?.id,
      compositionId: data.compositionId?.id,
      density: data.density,
      description: data.description,
      id: data.id,
      modelId: data.modelId,
      peachEffectEnabled: data.peachEffectEnabled,
      withFleece: data.withFleece,
      yarnNumberId: data.yarnNumberId?.id,
    }
    await this.$axios.$put(`/api/v1/model-parts/update`, body)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'});
        dispatch('getModelPart', data.modelId)
      })
      .catch(({response}) => console.log(response))
  },
  async deletePartModel({dispatch}, {partId, modelId}) {
    this.$axios.$put(`/api/v1/model-parts/change-status?id=${partId}&status=DISABLED`)
      .then(res => {
        dispatch('getModelPart', modelId)
        this.$toast.success(res.message, {theme: 'toasted-primary'})

      }).catch(({response}) => this.$toast.error(response.data.message))
  },
  async getYarnNumbers({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put('/api/v1/yarn-numbers/list', body)
      .then(res => {
        commit('setYarnNumbers', res.data.content);
      }).catch(({response}) => console.log(response))
  },
  async getCanvasType({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put('/api/v1/canvas-type/list', body)
      .then(res => {
        commit('setCanvasType', res.data.content);
      }).catch(({response}) => console.log(response))
  },
  async getYarnType({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put('/api/v1/yarn-type/list', body)
      .then(res => {
        commit('setYarnType', res.data.content);
      }).catch(({response}) => console.log(response))
  },
  async getComposition({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put('/api/v1/composition/list', body)
      .then(res => {
        commit('setComposition', res.data.content);
      }).catch(({response}) => console.log(response))
  },
  async getOneModelParts({commit}, id) {
    await this.$axios.$get(`/api/v1/model-parts/get?id=${id}`)
      .then(res => {
        commit('setOneModelParts', res.data)
      }).catch(({response}) => console.log(response))
  },
  async getModelPartsTemplates({commit}){
    this.$axios.get(`/api/v1/templates/model-part`)
    .then((res)=>{
      commit("setModelPartsTemplates",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  async setModelPartsTemplate({dispatch},{modelId,templateName}){
    this.$axios.put(`/api/v1/templates/model-part`,{modelId,templateName})
    .then((res)=>{
      dispatch("getModelPart",modelId)
      this.$toast.succes(res.data.succes)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  async createModelPartsTemplate({dispatch},{modelId,templateName}){
    this.$axios.post(`/api/v1/templates/model-part`,{modelId,templateName})
    .then((_res)=>{
      dispatch("getModelPartsTemplates")
    })
    .catch(({response})=>{
      console.log(response);
    })
  }
};
