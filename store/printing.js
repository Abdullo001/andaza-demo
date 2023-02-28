export const state = () => ({
  printingList: [],
  printOne: [],
  printType: {
    content: [
      {id: 1, name: ''},
      {id: 2, name: ''}
    ]
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
    state.printOne = [{...print}]
  },
  setPrintType(state, type) {
    state.printType = type;
  }
};
export const actions = {
  getPrintingList({commit}, {page= 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    this.$axios.$put('/api/v1/prints/list', body)
      .then(res => {
        commit('setPrinting', res.data.content);
        commit('setPrintOne', [])
      })
      .catch(({response}) => console.log(response))
  },
  getPrintOne({commit}, {id}) {
    this.$axios.$get(`/api/v1/prints/list-by-model?modelId=${id}`)
      .then(res => {
        // commit('setPrintOne', res.data);
        commit('setPrinting', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  getPrintType({commit}, {page = 0, size = 10}) {
    const body = {
      filters: [],
      sorts: [],
      page, size
    }
    this.$axios.$put(`/api/v1/print-type/list`, body)
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
  createPrints({commit, dispatch}, data) {
    this.$axios.$post(`/api/v1/prints/create`, data)
      .then(res => {
        dispatch('getModelPrints', data.modelId);
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  },
  updatePrints({dispatch}, item) {
    const data = {
      colorQuantity: item.colorQuantity,
      currency: item.currency,
      description: item.description,
      id: item.id,
      modelId: item.modelId,
      partnerId: item.partnerId,
      price: item.price,
      printTypeId: item.printTypeId,
      sentDate: item.sentDate
    }
    this.$axios.$put(`/api/v1/prints/update`, data)
      .then(res => {
        dispatch('getModelPrints', item.modelId);
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

























