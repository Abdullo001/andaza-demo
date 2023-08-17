export const state = () => ({
  printingList: [],
  printOne: [],
  printType: {
    content: []
  },

});
export const getters = {
  printingList: state => state.printingList,
  printOne: state => state.printOne,
  printTypeEnums: state => state.printType.content
};
export const mutations = {
  setPrinting(state, item) {
    state.printingList = item;
  },
  setPrintOne(state, print) {
    state.printOne = print
  },
  setPrintType(state, type) {
    state.printType = type;
  }
};
export const actions = {
  async getPrintingList({commit}, {page= 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/prints/list', body)
      .then(res => {
        commit('setPrinting', res.data.content);
        commit('setPrintOne', [])
      })
      .catch(({response}) => console.log(response))
  },
  async getPrintOne({commit}, id) {
    await this.$axios.$get(`/api/v1/prints/list-by-model?modelId=${id}`)
      .then(res => {
        commit('setPrintOne', res.data);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.message)
      })
  },
  async getPrintType({commit}, {page = 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    await this.$axios.$put(`/api/v1/print-type/list`, body)
      .then(res => {
        commit('setPrintType', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  async getModelPrints({commit}, id) {
    await this.$axios.$get(`/api/v1/prints/list-by-model?modelId=${id}`)
      .then(res => {
        commit('setPrinting', res.data);
      }).catch(({response}) => console.log(response))
  },
  async createPrints({commit, dispatch}, {data,modelId}) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }
    await this.$axios.$post(`/api/v1/prints/create`, data,config)
      .then(res => {
        dispatch('getPrintOne', modelId);
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  },
  async updatePrints({dispatch}, {data,id}) {
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    }

    await this.$axios.$put(`/api/v1/prints/update`, data,config)
      .then(res => {
        dispatch('getModelPrints', id);
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  },
  async deleteOnePrinting({dispatch}, {printId, modelId}) {
    this.$axios.$delete(`/api/v1/prints/delete?id=${printId}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getModelPrints', modelId);
      })
      .catch(({response}) => console.log(response));
  }
};

























