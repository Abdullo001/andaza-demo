export const state = () => ({
  preFinances: [],
  modelName: [],
  preFinanceId: '',
  expenseGroup: {},
  expenseList: [],
  measurementUnit: [],
  detailsList: [{totalPrice: 0}],
  loading: true,
  onePreFinance: {},
  selectedModelNumber: ''
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
  totalPrice: state => state.detailsList[0].totalPrice,
  loading: state => state.loading,
  totalElements: state => state.preFinances.totalElements,
  onePreFinance: state => state.onePreFinance,
  selectedModelNumber: state => state.selectedModelNumber
}
export const mutations = {
  setModelNumber(state, number) {
    state.selectedModelNumber = number;
  },
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
    state.detailsList = detail;
  },
  changeLoading(state, status) {
    state.loading = status;
  },
  setOnePreFinance(state, item) {
    state.onePreFinance = item;
  }
}
export const actions = {
  getPreFinancesList({commit}, {size, page, preFinanceNumber, modelNumber = '', partner = ''}) {
    const body = {
      filters: [
        {
          key: 'preFinanceNumber',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: preFinanceNumber
        }
      ],
      sorts: [],
      size,
      page,
    }
    partner = partner === null ? '' : partner
    modelNumber = modelNumber === null ? '' : modelNumber
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    this.$axios.$put(`/api/v1/pre-finances/list?modelNumber=${modelNumber}&partner=${partner}`, body)
      .then(res => {
        if (res.message === 'Successfully') {
          commit('changeLoading', false)
          commit('setRefinances', res.data)

        }
      })
      .catch(({response}) => {
        commit('changeLoading', false)
        console.log(response);
      })
  },
  async getModelName({commit}, name) {
    const body = {
      filters: [
        {
          key: 'modelNumber',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
        {
          key: 'status',
          operator: 'EQUAL',
          propertyType: 'STATUS',
          value: 'ACTIVE'
        }
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    await this.$axios.$put(`/api/v1/models/list?partner=`, body)
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
  async saveCalculation({commit}, {data, id, currency}) {
    const body = {
      overProductionPercent: data[0].editable,
      lossPercent: data[1].editable,
      generalExpensePercent: data[2].editable,
      extraExpensePercent: data[3].editable,
      targetProfitPercent: data[4].editable,
      clientTargetPrice: data[5].firstCurrency,
      givenPrice: data[6].firstCurrency,
      discountPercent: data[7].editable,
      givenPriceCurrency: currency,
      preFinanceId: id,
    };

    await this.$axios.$put(`/api/v1/pre-finances/prefinance-calculations`, body)
      .then(res => {
        this.$toast.success(res.message, {theme: "toasted-primary"})
      })
      .catch(({response}) => console.log(response))
  },
  async getExpenseGroup({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    await this.$axios.$put('/api/v1/expense-group/list', body)
      .then(res => {
        commit('setExpenseGroup', res.data)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getExpenseList({commit}, id) {
    await this.$axios.$get(`api/v1/expense/list?groupId=${id}`)
      .then(res => {
        commit('setExpenseList', res.data)
      })
      .catch(({response}) => console.log(response))
  },
  async getMeasurementUnit({commit}) {
    const body = {
      filters: [],
      posts: [],
      page: 0,
      size: 50
    }
    await this.$axios.$put(`api/v1/measurement-unit/list`, body)
      .then(res => {
        commit('setMeasurementUnit', res.data.content)
      })
      .catch(({response}) => console.log(response))
  },
  async getAllDetails({commit}, id) {
    await this.$axios.$get(`/api/v1/possible-expense/list?preFinanceId=${id}`)
      .then(res => {
        if (!!res.data.length) {
          commit('setDetailsList', res.data)
        }
      })
      .catch(({response}) => console.log(response))
  },
  async createDetails({commit, dispatch, state}, data) {
    await this.$axios.$post('/api/v1/possible-expense/create', data)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
        dispatch('getAllDetails', state.preFinanceId)
      })
      .catch(({response}) => console.log(response))
  },
  async changeStatus({commit}, {id, status}) {
    await this.$axios.$put(`/api/v1/pre-finances/change-status?id=${id}&status=${status}`)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getOnePreFinance({commit}, id) {
    await this.$axios.$get(`/api/v1/pre-finances/get?id=${id}`)
      .then(res => {
        commit('setOnePreFinance', res.data)
      }).catch(({response}) => console.log(response));
  }
}
