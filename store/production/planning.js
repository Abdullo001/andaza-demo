export const state = () => ({
  planningList: [],
  modelInfo: {},
  processList: {},
  workshopList: [],
  colorsList: {},
  productionId: '',
  processingList: {},
  statusList: []
});
export const getters = {
  planningList: state => state.planningList.content,
  totalElements: state => state.planningList.totalElements,
  modelInfo: state => state.modelInfo,
  processList: state => state.processList.content,
  workshopList: state => state.workshopList,
  colorsList: state => state.colorsList.content,
  productionId: state => state.productionId,
  processingList: state => state.processingList,
  processingTotalElements: state => state.processingList.totalElements,
  statusList: state => state.statusList
}
export const mutations = {
  setPlanningList(state, planning) {
    state.planningList = planning;
  },
  setModelInfo(state, info) {
    state.modelInfo = info;
  },
  setProcessList(state, process) {
    state.processList = process;
  },
  setWorkshopList(state, workshop) {
    state.workshopList = workshop;
  },
  setColorsList(state, color) {
    state.colorsList = color;
  },
  setProductionId(state, id) {
    state.productionId = id;
  },
  setProcessingList(state, item) {
    state.processingList = item;
  },
  setStatusList(state, status) {
    state.statusList = status;
  }
}
export const actions = {
  getPlanningList({commit}, {page = 0, size = 10, modelNumber,orderNumber,client,status}) {
    const body = {
      modelNumber,
      orderNumber,
      client,
      status,
      page,
      size,
    }
    this.$axios.$put('/api/v1/production/list', body)
      .then(res => {
        commit('setPlanningList', res.data);
      }).catch(({response}) => console.log(response))
  },
  async getModelInfo({commit}, id) {
    await this.$axios.$get(`/api/v1/production/model-order-info?modelId=${id}`)
      .then(res => {
        commit('setModelInfo', res.data)
      }).catch(({response}) => {
      this.$toast.error(response.data.message);
    })
  },
  getProcessList({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0, size: 20
    }
    this.$axios.$put('/api/v1/process/list', body)
      .then(res => {
        commit('setProcessList', res.data);
      }).catch(({response}) => console.log(response));
  },
  getWorkshopList({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0, size: 100
    }
    this.$axios.put('/api/v1/partner/list',body)
      .then(res => {
        commit('setWorkshopList', res.data.data.content);
      }).catch(({response}) => console.log(response))
  },
  getColorsList({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0, size: 20
    }
    this.$axios.$put('/api/v1/colors/list', body)
      .then(res => {
        commit('setColorsList', res.data)
      }).catch(({response}) => console.log(response))
  },
  createProcessPlanning({commit, dispatch}, data) {
    this.$axios.$post('/api/v1/production/create', data)
      .then(res => {
        commit("setModelInfo", res.data.modelId);
        commit('setProductionId', res.data.id);
        dispatch('getProcessingList', {
          id: res.data.id,
          page: 0, size: 10
        });
        this.$toast.success(res.message)
      }).catch(({response}) => console.log(response));
  },
  createProcessing({dispatch}, data) {
    this.$axios.$post('/api/v1/process-planning/create', data)
      .then(res => {
        dispatch('getProcessingList', {
          id: data.productionId,
          page: 0, size: 10
        })
        this.$toast.success(res.message);
      }).catch(({response}) => console.log(response));
  },
  updateProcessing({dispatch, state}, data) {
    this.$axios.$put('/api/v1/process-planning/update', data)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getProcessingList', {
          id: state.productionId,
          page: 0, size: 10
        })
      }).catch(({response}) => console.log(response));
  },
  deleteProcessing({dispatch, state}, {id, process}) {
    this.$axios.$delete(`/api/v1/process-planning/${id}?process=${process}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getProcessingList', {
          id: state.productionId,
          page: 0, size: 10
        })
      }).catch(({response}) => console.log(response));
  },
  getProcessingList({commit}, {id, page = 0, size = 10}) {
    if(!!id) {
      const body = {
        filters: [],
        sorts: [],
        page, size,
      }
      this.$axios.$put(`/api/v1/process-planning/list?productionId=${id}`, body)
        .then(res => {
          commit('setProcessingList', res.data);
        }).catch(({response}) => console.log(response));
    }
  },
  getStatusList({commit}) {
    this.$axios.get('/api/v1/enums/model-statuses')
    .then(res => {
      commit('setStatusList', res.data.data);
    })
    .catch(({response}) => console.log(response))
  },
  updateStatus({dispatch}, {id, statusId, page, size}) {
    this.$axios.$put(`/api/v1/production/change-status?id=${id}&statusId=${statusId}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getPlanningList', {page, size})
      }).catch(({response}) => {
      console.log(response);
    })
  },

}
