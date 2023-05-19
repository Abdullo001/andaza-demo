export const state = () => ({
  loading: true,
  partner_list: [],
  partner_type: [],
  partner_one_list: []
});
export const getters = {
  loading: state => state.loading,
  partner_list: state => state.partner_list.content,
  totalElements: state => state.partner_list.totalElements,
  partner_type: state => state.partner_type.content,
  partner_one_list: state => state.partner_one_list,
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
};
export const actions = {
  async deletePartnerList({dispatch}, id) {
    await this.$axios.$delete(`/api/v1/partner/delete?id=${id}`)
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
  async changeStatus({dispatch}, data){
    const { id, status } = data
    await this.$axios.$put(`/api/v1/partner/change-status?id=${id}&status=${status}`)
      .then(res => {
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updatePartnerList({dispatch}, data) {
    await this.$axios.$put('/api/v1/partner/update', data)
      .then(res => {
        dispatch("getPartnerList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getPartnerOneList({commit}, id){
    await this.$axios.get(`/api/v1/partner/get?id=${id}`)
      .then(res => {
        commit("setPartnerOneList", res.data.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createPartnerList({dispatch}, data) {
    await this.$axios.$post('/api/v1/partner/create', data)
      .then(res => {
        dispatch("getPartnerList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async getPartnerList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/partner/list', body)
      .then(res => {
        commit("setPartnersList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
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
};
