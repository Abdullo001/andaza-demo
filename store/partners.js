export const state = () => ({
  loading: true,
  partner_list: [],
});
export const getters = {
  loading: state => state.loading,
  partner_list: state => state.partner_list.content,
  totalElements: state => state.partner_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setPartnersList(state, partnersList) {
    state.partner_list = partnersList
  },
};
export const actions = {
  async changeStatus({dispatch}, data){
    const { id, status } = data
    await this.$axios.$put(`/api/v1/partner/change-status?id=${id}&status=${status}`)
      .then(res => {
        console.log(res)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updatePartnerList({dispatch}, data) {
    await this.$axios.$put('/api/v1/partner/update', data)
      .then(res => {
        dispatch("getAccessoryThinList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message);
      })
  },
  async createAccessoryList({dispatch}, data) {
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
    const {code, name, createdAt, updatedAt} = data;
    const body = {
      filters: [
        {
          key: "colorCodeHex",
          operator: 'LIKE',
          propertyType: 'STRING',
          value: code,
        },
        {
          key: "groupName",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: createdAt,
          valueTo: updatedAt === null ? "" : updatedAt
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.get('/api/v1/colors/thin-list', body)
      .then(res => {
        commit("setColorsThinList", res.data.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
