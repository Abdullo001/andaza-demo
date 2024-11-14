export const state = () => ({
  loading: true,
  partner_list: [],
  partner_type: [],
  cooperationType:[],
  partner_one_list: [],
  countryList:[],
  partnerTypes:[],
  partnerId:null,
  partnerContractList:[],
  deliveryTermList:[],
  currencyList:[],
  contractByModelList:[],
  partnerWithTypes:[],
});
export const getters = {
  loading: state => state.loading,
  partnerList: state => state.partner_list.items,
  totalElements: state => state.partner_list.totalElements,
  partner_type: state => state.partner_type.content,
  partner_one_list: state => state.partner_one_list,
  cooperationType: state=>state.cooperationType,
  countryList: state=>state.countryList,
  partnerTypes: state=> state.partnerTypes,
  partnerId: state=> state.partnerId,
  partnerContractList: state=> state.partnerContractList,
  deliveryTermList: state=> state.deliveryTermList,
  currencyList: state=> state.currencyList,
  contractByModelList: state=> state.contractByModelList,
  partnerWithTypes: state=> state.partnerWithTypes,
};
export const mutations = {
  setPartnerId(state, item) {
    state.partnerId = item
  },
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setPartnersList(state, partnersList) {
    state.partner_list = partnersList
  },
  setPartnerType(state, partnerType){
    state.partner_type = partnerType
  },
  setPartnerOneList(state, partnerOne){
    state.partner_one_list = partnerOne
  },
  setCooperationType(state,item){
    state.cooperationType=item
  },
  setCountryList(state,item){
    state.countryList=item
  },
  setPartnerTypes(state,item){
    state.partnerTypes=item
  },
  setPartnerContractList(state,item){
    state.partnerContractList=item
  },
  setDeliveryTermList(state,item){
    state.deliveryTermList=item
  },
  setCurrencyList(state,item){
    state.currencyList=item
  },
  setContractByModelList(state,item){
    state.contractByModelList=item
  },
  setPartnerWithTypes(state,item){
    state.partnerWithTypes=item
  },
};
export const actions = {

  async getPartnerList({commit}, {page, size,partnerName="",partnerEmail="",phoneNumber="",status=""}) {
    partnerName=partnerName??""
    partnerEmail=partnerEmail??""
    phoneNumber=phoneNumber??""
    status=status??""
    await this.$axios.get(`/api/v1/partners?page=${page}&size=${size}&partnerName=${partnerName}&partnerEmail=${partnerEmail}&phoneNumber=${phoneNumber}&status=${status}`)
      .then(res => {
        commit("setPartnersList", res.data.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async createPartnerList({dispatch}, data) {
    await this.$axios.$post('/api/v1/partners', data)
      .then(res => {
        dispatch("getPartnerList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },

  async deletePartnerList({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/partners/${id}`)
      .then(res => {
        dispatch("getPartnerList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getPartnerType({commit}, {page, size}){
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/partner-type/list`, body)
      .then(res => {
        commit("setPartnerType", res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  
  async updatePartnerList({dispatch}, {id,data}) {
    await this.$axios.$put(`/api/v1/partners/${id}`, data)
      .then(res => {
        dispatch("getPartnerList", {page: 0, size: 10});
        this.$toast.success(res.code);
        
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },
  async getPartnerOneList({commit}, id){
    await this.$axios.get(`/api/v1/partners/${id}`)
      .then(res => {
        commit("setPartnerOneList", res.data.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  

  async changeStatus({dispatch}, data){
    const { id, status } = data
    await this.$axios.patch(`/api/v1/partners/change-status/${id}?status=${status}`)
      .then(res => {
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  
  async filterPartnerList({commit}, data) {
    const {phoneNumber, name, status, email} = data;
    const body = {
      filters: [
        {
          key: "phoneNumber",
          operator: 'LIKE',
          propertyType: 'STRING',
          value: phoneNumber,
        },
        {
          key: "name",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        },
        {
          key: 'email',
          operator: "LIKE",
          propertyType: "STRING",
          value: email
        },
        {
          key: 'status',
          operator: 'EQUAL',
          propertyType: 'STATUS',
          value: status
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/partner/list', body)
      .then(res => {
        commit("setPartnersList", res.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },

  async getCountryList({commit},{name}){
    await this.$axios.get(`/api/v1/country/list?name=${name}&size=245`)
    .then((res)=>{
      commit("setCountryList",res.data.data.content)

    })
    .catch((res)=>{
      console.log(res);
    })
  },

  async getCooperationType({commit},code){
    await this.$axios.get(`/api/v1/cooperation-types?partnerTypeCode=${code}`)
    .then((res)=>{
      commit("setCooperationType",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  async getPartnersType({commit}){
    await this.$axios.get(`/api/v1/partner-types`)
    .then((res)=>{
      commit("setPartnerTypes",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  getPartnersWithTypes({commit},types){
    const data={
      partnerTypeCodes:[
        ...types
      ]
    }
    this.$axios.post(`/api/v1/partners/partners-by-partner-type-codes`,data)
    .then((res)=>{
      commit("setPartnerWithTypes",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  createPartnerContract({dispatch},{data,partnerId}){
    this.$axios.post(`/api/v1/partner-contracts`,data)
    .then((res)=>{
      this.$toast.success(res.data.code)
      dispatch("getPartnerContractList",partnerId)

    })
    .catch(({response})=>{
      console.log(response);
    })
  },

  getPartnerContractList({commit},id){
    this.$axios.get(`/api/v1/partner-contracts/partners/${id}`)
    .then((res)=>{
      commit("setPartnerContractList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getDeliveryTermList({commit}){
    this.$axios.get(`/api/v1/enums/delivery-terms`)
    .then((res)=>{
      commit("setDeliveryTermList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getCurrencyList({commit}){
    this.$axios.get(`/api/v1/enums/currencies`)
    .then((res)=>{
      commit("setCurrencyList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getContractFile({commit},contractId){
    this.$axios.get(`/api/v1/partner-contracts/${contractId}`)
    .then((res)=>{
      console.log(res);
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  deleteContract({dispatch},{contractId,partnerId}){
    this.$axios.delete(`/api/v1/partner-contracts/${contractId}`)
    .then((res)=>{
      dispatch("getPartnerContractList",partnerId)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },

  updateContract({dispatch},{contractId,partnerId,data}){
    this.$axios.put(`/api/v1/partner-contracts/${contractId}`,data)
    .then((res)=>{
      dispatch("getPartnerContractList",partnerId)
      this.$toast.success(res.data.code)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },

  getContractsByModel({commit},modelId){
    this.$axios.get(`/api/v1/partner-contracts/models/${modelId}`)
    .then((res)=>{
      commit("setContractByModelList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  }

};
