export const state = () => ({
  loading: true,
  processList: [],
  processTypeList:[],
});

export const getters = {
  loading: state => state.loading,
  processList: state => state.processList.content,
  totalElements: state => state.processList.totalElements,
  processTypeList:state=>state.processTypeList.content
};

export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setProcessList(state, item) {
    state.processList = item
  },
  setProcessTypeList(state, item) {
    state.processTypeList = item
  },
};
export const actions = {
  async deleteProcess({dispatch}, {id}) {
    await this.$axios.$delete(`/api/v1/process/delete?id=${id}`)
      .then(res => {
        dispatch("getProcessList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateProcess({dispatch}, data) {
    await this.$axios.$put(`/api/v1/process/update`, data)
      .then(res => {
        dispatch("getProcessList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createProcess({dispatch}, data) {
    await this.$axios.$post(`/api/v1/process/create`, data)
      .then(res => {
        dispatch("getProcessList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },

  async getProcessTypeList({commit}){
    const body = {
      filters: [],
      sorts: [],
      page:0,
      size:50,
    }
    await this.$axios.$put(`/api/v1/process-type/list`, body)
      .then(res => {
        commit("setProcessTypeList", res.data);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },

  async getProcessList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/process/list`, body)
      .then(res => {
        commit("setProcessList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },

  async filterProcessData({commit}, data) {
    const body = {
      filters: [
        {
          key: 'id',
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: data.id
        },
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.name
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: data.createdAt,
          valueTo: data.updatedAt
        },
        {
          key: 'createdBy',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.createdBy,
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/process/list', body)
      .then(res => {
        commit('setProcessList', res.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
