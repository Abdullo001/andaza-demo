export const state = () => ({
  loading: true,
  partner_list: [],
  partner_type: [],
  cooperationType:[],
  partner_one_list: [],
  countryList:[],
});
export const getters = {
  loading: state => state.loading,
  partnerList: state => state.partner_list.items,
  totalElements: state => state.partner_list.totalElements,
  partner_type: state => state.partner_type.content,
  partner_one_list: state => state.partner_one_list,
  cooperationType: state=>state.cooperationType,
  countryList: state=>state.countryList,
};
export const mutations = {
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
  }
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

  async getCooperationType({commit}){
    await this.$axios.get(`/api/v1/cooperation-types/thin-list`)
    .then((res)=>{
      commit("setCooperationType",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  }
};
