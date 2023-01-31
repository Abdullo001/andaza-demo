
export const state = () => ({
  preFinances: [],
  modelName: [],
  preFinanceId: '',
  expenseGroup: {},
  expenseList: [],
  measurementUnit: [],
  detailsList: [
    {
      totalPrice: 0
    }
  ],
})
export const getters = {
  preFinancesContent: state => state.preFinances.content,
  modelNames: state => state.modelName.map(el => el.modelNumber),
  modelData: state => state.modelName,
  preFinanceId: state => state.preFinanceId,
  expenseGroup: state => state.expenseGroup.content,
  expenseList: state => state.expenseList,
  measurementUnit: state => state.measurementUnit,
  detailsList: state => state.detailsList,
  totalPrice: state => state.detailsList[0].totalPrice
}
export const mutations = {
  setRefinances(state, item) {
    state.preFinances = item;
  },
  setModelName(state, name) {
    state.modelName = name
  },
  setPreFinanceId(state, id) {
    state.preFinanceId = id
  },
  setExpenseGroup(state, item) {
    state.expenseGroup = item
  },
  setExpenseList(state, item) {
    state.expenseList = item;
  },
  setMeasurementUnit(state, item) {
    state.measurementUnit = item;
  },
  setDetailsList(state, detail) {
    state.detailsList = detail
  }
}
export const actions = {
  getPreFinancesList({commit}, {size, page}) {
    const body = {
      filter: [],
      sort: [],
      size,
      page,
    }
    this.$axios.$put(`/api/v1/pre-finances/list`, body)
      .then(res => {
        commit('setRefinances', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  getModelName({commit}, name) {
    const body = {
      filters: [
        {
          key: 'modelNumber',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    this.$axios.$put(`/api/v1/models/list`, body)
      .then(res => {
        commit('setModelName', res.data.content);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async createPreFinance({commit, dispatch}, data) {
    const body = {
      modelId: data.preFinanceNumber,
      primaryCurrency: data.primaryCurrency,
      secondaryCurrency: data.secondaryCurrency,
      tertiaryCurrency: data.tertiaryCurrency,
      primaryRate: data.primaryRate,
      secondaryRate: data.secondaryRate,
      tertiaryRate: data.tertiaryRate,
      description: data.description
    }
    await this.$axios.$post('/api/v1/pre-finances/create', body)
      .then(res => {
        commit('setPreFinanceId', res.data.id)
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch('getAllDetails', res.data.id)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: 'toasted-primary'})
      })
  },
  saveCalculation({commit}, {data, id, currency}) {
    const body = {
      overProductionPercent: data[0].editable,
      lossPercent: data[1].editable,
      generalExpensePercent: data[2].editable,
      extraExpensePercent: data[3].editable,
      targetProfitPercent: data[4].editable,
      givenPrice: data[5].firstCurrency,
      discountPercent: data[6].editable,
      givenPriceCurrency: currency,
      preFinanceId: id,
    };
    this.$axios.$put(`/api/v1/pre-finances/prefinance-calculations`, body)
      .then(res => {
        console.log(res);
      })
      .catch(({response}) => console.log(response))
  },
  getExpenseGroup({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    this.$axios.$put('/api/v1/expense-group/list', body)
      .then(res => {
        commit('setExpenseGroup', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  getExpenseList({commit}, id) {
    this.$axios.$get(`api/v1/expense/list?groupId=${id}`)
      .then(res => {
        commit('setExpenseList', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  getMeasurementUnit({commit}) {
    const body = {
      filters: [],
      posts: [],
      page: 0,
      size: 50
    }
    this.$axios.$put(`api/v1/measurement-unit/list`, body)
      .then(res => {
        commit('setMeasurementUnit', res.data.content)
      })
      .catch(({response}) => console.log(response))
  },
  getAllDetails({commit}, id) {
    this.$axios.$get(`/api/v1/possible-expense/list?preFinanceId=${id}`)
      .then(res => {
        if (!!res.data.length) {
          commit('setDetailsList', res.data)
        }
      })
      .catch(({response}) => console.log(response))
  },
  createDetails({commit, dispatch, state}, data) {
    this.$axios.$post('/api/v1/possible-expense/create', data)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch('getAllDetails', state.preFinanceId)
      })
      .catch(({response}) => console.log(response))
  },
  changeStatus({commit}, {id, status}) {
    this.$axios.$put(`/api/v1/pre-finances/change-status?id=${id}&status=${status}`)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
        console.log(response);
      })
  }
}
