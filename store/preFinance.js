export const state = () => ({
  preFinances: [],
  modelName: []
})
export const getters = {
  preFinancesContent: state => state.preFinances.content,
  modelNames: state => state.modelName.map(el => el.modelNumber),
  modelData: state => state.modelName,
}
export const mutations = {
  setRefinances(state, item) {
    state.preFinances = item;
  },
  setModelName(state, name) {
    state.modelName = name
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
      filter: [
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
  createPreFinance({commit, dispatch}, data) {
    const body = {
      preFinanceNumber:"AA-55-G4-67-Y7",
      modelId:1,
      primaryCurrency:"USD",
      secondaryCurrency:"RUB",
      tertiaryCurrency:"UZS",
      primaryRate:1.00,
      secondaryRate:56.00,
      tertiaryRate:11200.00,
      description:"Prefinance for order from USA",
      overProductionPercent:7.00,
      lossPercent:3.00,
      generalExpensePercent:11.00,
      extraExpensePercent:4.00,
      targetProfitPercent:20.00,
      givenPrice:1500.00,
      givenPriceCurrency:"USD",
      discountPercent: 2.00,
      status: "ACTIVE"
    }
    this.$post('/api/v1/pre-finances/create', body)
      .then(res => {

      })
      .catch(({response}) => {
        console.log(response);
      })
  }
}
