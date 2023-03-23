export const state = () => ({
  fabricList: [],
  fabricData: [],
  modelId: '',
});

export const getters = {
  fabricList: state => state.fabricList.content,
  totalElements: state => state.fabricList.totalElements,
  fabricData: state => state.fabricData,
  modelId: state => state.modelId
};
export const mutations = {
  setFabricList(state, fabric) {
    state.fabricList = fabric;
  },
  setFabricData(state, data) {
    state.fabricData = data
  },
  setModelId(state, id) {
    state.modelId = id;
  }
};
export const actions = {
  getFabricList({commit}, {page, size}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size
    }
    this.$axios.$put('/api/v1/fabric-planning/list', body)
      .then(res => {
        commit('setFabricList', res.data);
      }).catch(({response}) => console.log(response))
  },
  async getOrderNames({commit}, id) {
    if(!!id) {
      await this.$axios.$get(`/api/v1/fabric-planning/model-order-info?modelId=${id}`)
        .then(res => {
          commit('setFabricData', res.data)
        }).catch(({response}) => {
          this.$toast.error(response.data.message)
      })
    }
  },
  async savePlanning({commit}, data) {
    await this.$axios.$post('/api/v1/fabric-planning/create', data)
      .then(res => {
        console.log(res);
      }).catch(({response}) => console.log(response))
  },
  async createPlanningChart({commit}, data) {
    await this.$axios.$post('/api/v1/fabric-planning-chart/create', data)
      .then(res => {
        console.log(res);
      }).catch(({response}) => {
        this.$toast.error(response.data.message);
      })
  }
};
