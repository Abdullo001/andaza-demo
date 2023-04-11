export const state = () => ({
  planningList: [],
  modelInfo: {},
  processList: {},
  workshopList: [],
  colorsList: {},
  productionId: '',
  processingList: {}
});
export const getters = {
  planningList: state => state.planningList.content,
  totalElements: state => state.planningList.totalElements,
  modelInfo: state => state.modelInfo,
  processList: state => state.processList.content,
  workshopList: state => state.workshopList,
  colorsList: state => state.colorsList.content,
  productionId: state => state.productionId,
  processingList: state => state.processingList.content,
  processingTotalElements: state => state.processingList.totalElements
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
  }
}
export const actions = {
  getPlanningList({commit}, {page= 0, size= 10}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put('/api/v1/production/list', body)
      .then(res => {
        commit('setPlanningList', res.data);
      }).catch(({response}) => console.log(response))
  },
  getModelInfo({commit}, id) {
    this.$axios.$get(`/api/v1/production/model-order-info?modelId=${id}`)
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
    this.$axios.$get('/api/v1/partner/list-by-type?type=workshop')
      .then(res => {
        commit('setWorkshopList', res.data);
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
  getProcessingList({commit}, {id, page = 0, size= 10}) {
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
}
