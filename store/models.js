export const state = () => ({
  modelsList: [],
  oneModel: {},
  partner_enums: [],
  newModelId: null,
  compositions: [],
  brandList:[],
  pdfLoading:false,
  modelTemplatesList:[],
  modelTemplateItem:{},
})

export const getters = {
  modelsList: state => state.modelsList.content,
  totalElements: state => state.modelsList.totalElements,
  oneModel: state => state.oneModel,
  partner_enums: state => state.partner_enums.content,
  newModelId: state => state.newModelId,
  compositionList: state => state.compositions,
  brandList: state => state.brandList,
  pdfLoading: state => state.pdfLoading,
  modelTemplatesList: state => state.modelTemplatesList,
  modelTemplateItem: state => state.modelTemplateItem,
}

export const mutations = {
  setModels(state, model) {
    state.modelsList = model
  },
  setOneModel(state, details) {
    state.oneModel = details
  },
  setPartnerEnums(state, partner) {
    state.partner_enums = partner
  },
  setNewModelId(state, id) {
    state.newModelId = id
  },
  setCompositions(state, item) {
    state.compositions = item;
  },
  setBrandList(state, item) {
    state.brandList = item;
  },
  setPdfLoading(state, item) {
    state.pdfLoading = item;
  },
  setModelTemplatesList(state, item) {
    state.modelTemplatesList = item;
  },
  setModelTemplateItem(state, item) {
    state.modelTemplateItem = item;
  },
}

export const actions = {
  async getModelsList({commit}, {page, size, modelNumber, partner, status}) {
    const body = {
      client:partner,
      modelNumber:modelNumber,
      page,
      size,

    }
    partner = partner === null ? '' : partner
    await this.$axios.$put(`/api/v1/models/list`, body)
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
    const model = {
      compositionId: data.compositionId,
      description: data.description,
      gender: data.gender,
      groupId: data.groupId,
      licenseRequired: false,
      modelNumber: data.number,
      name: data.name,
      partnerId: data.partnerId,
      season: data.season,
      status: "ACTIVE",
      brandName:data.brandName,
      canvasTypeId:data.canvasTypeId,
      fabricReworkId:data.fabricReworkId,
      mainFabricDensity:data.mainFabricDensity,
      inspectionDate:data.inspectionDate,
      orderedQuantity:Number(data.orderedQuantity),
      partnerContractId:data.partnerContractId,
      modelOperationId:data.modelOperationId,

    }
    this.$axios.$post('/api/v1/models/create', model)
      .then(res => {
        commit('setNewModelId', res.data.id);
        commit('setOneModel', res.data);
        this.$toast.success(res.data.message, {theme: 'toasted-primary'});
      }).catch(({response}) =>{
        console.log(response)
        this.$toast.error(response.data.errorMessage)
      })
  },
  async updateModel({commit}, {data, id}) {
    const model = {
      compositionId: data.compositionId,
      description: data.description,
      gender: data.gender,
      groupId: data.groupId,
      licenseRequired: "false",
      modelNumber: data.number,
      name: data.name,
      partnerId: data.partnerId,
      season: data.season,
      id: id,
      status: "ACTIVE",
      brandName:data.brandName,
      canvasTypeId:data.canvasTypeId,
      fabricReworkId:data.fabricReworkId,
      mainFabricDensity:data.mainFabricDensity,
      inspectionDate:data.inspectionDate,
      orderedQuantity:Number(data.orderedQuantity),
      partnerContractId:data.partnerContractId
    }
    this.$axios.$put('/api/v1/models/update', model)
      .then(res => {
        this.$toast.success(res.data.message, {theme: 'toasted-primary'});
      }).catch(({response}) => {
      console.log(response);
      this.$toast.error(response.data.errorMessage, {theme: 'toasted-primary'})
    })
  },
  getCompositionList({commit}) {
    this.$axios.$get('/api/v1/composition/thin-list')
      .then(res => {
        commit('setCompositions', res.data);
      }).catch(({response}) => console.log(response))
  },
  getBrandList({commit},id){
    this.$axios.get(`/api/v1/partners/brand-names/${id}`)
      .then((res)=>{
        commit("setBrandList",res.data.data)
      })
      .catch((res)=>{
        console.log(res);
      })
  },

  getModelPassport({commit},id){
    commit("setPdfLoading",true)
    this.$axios.get(`/api/v1/models/generate-model-passport/${id}`)
    .then((res)=>{
      commit("setPdfLoading",false)
      const binaryCode = atob(res.data);
      const blob = new Blob(
        [new Uint8Array([...binaryCode].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
    })
    .catch((response)=>{
      console.log(response);
      commit("setPdfLoading",false)

    })
  },

  getModelTemplates({commit}){
    this.$axios.get(`/api/v1/templates/model`)
    .then((res)=>{
      commit("setModelTemplatesList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);

    })
  },
  getModelTemplateWithId({commit},templateId){
    this.$axios.get(`/api/v1/templates/model/${templateId}`)
    .then((res)=>{
      commit("setModelTemplateItem",res.data.data)
    })
    .catch((response)=>{
      console.log(response);

    })
  },
  createModelTemplate({dispatch},data){
    this.$axios.post(`/api/v1/templates/model`,data)
    .then((res)=>{
      dispatch("getModelTemplates")
    })
    .catch(({response})=>{
      console.log(response);

    })
  }
}
