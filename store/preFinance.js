export const state = () => ({
  preFinances: [],
  modelName: [],
  preFinanceId: "",
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
    state.modelName = name;
  },
  setPreFinanceId(state, id) {
    state.preFinanceId = id;
  },
  setExpenseGroup(state, item) {
    state.expenseGroup = item;
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
  },
};
export const actions = {
  getPreFinancesList({commit}, {size, page, preFinanceNumber, modelNumber , partner }) {
    const body = {
      calculationNumber:preFinanceNumber,
      client:partner,
      modelNumber:modelNumber,
      size,
      page,
    };
    this.$axios.$put(`/api/v1/pre-finances/list`, body)
      .then((res) => {
        commit("changeLoading", false);
        commit("setRefinances", res.data);
      })
      .catch(({response}) => {
        commit("changeLoading", false);
        console.log(response);
      });
  },
  async getModelName({commit}, name) {
    const body = {
      client:'',
      modelNumber:name,
      page:0, 
      size:10,
      status:"ACTIVE"
    }
    
    await this.$axios
      .$put(`/api/v1/models/list`, body)
      .then((res) => {
        commit("setModelName", res.data.content);

      })
      .catch(({response}) => {
        console.log(response);
      });
  },
  async updatePreFinance({commit, dispatch}, data) {
    await this.$axios.$put('/api/v1/pre-finances/update', data)
      .then(res => {
        commit("setOnePreFinance", res.data);
        this.$toast.success(res.message);
        dispatch("getAllDetails", res.data.id);
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: "toasted-primary"});
      })
  },
  async createPreFinance({commit, dispatch}, data) {
    const body = {
      modelId: data.id,
      primaryCurrency: data.primaryCurrency,
      secondaryCurrency: data.secondaryCurrency,
      tertiaryCurrency: data.tertiaryCurrency,
      primaryRate: data.primaryRate,
      secondaryRate: data.secondaryRate,
      tertiaryRate: data.tertiaryRate,
      description: data.description,
    };
    await this.$axios
      .$post("/api/v1/pre-finances/create", body)
      .then((res) => {
        commit("setOnePreFinance", res.data);
        commit("setPreFinanceId", res.data.id);
        this.$toast.success(res.message, {theme: "toasted-primary"});
        dispatch("getAllDetails", res.data.id);
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message, {theme: "toasted-primary"});
      });
  },
  async saveCalculation({commit}, {data, id, currency}) {
    console.log(data);
    const body = {
      overProductionPercent: data[0].editable,
      lossPercent: data[1].editable,
      generalExpensePercent: data[2].editable,
      extraExpensePercent: data[3].editable,
      targetProfitPercent: data[4].editable,
      clientTargetPrice: data[5].firstCurrency,
      givenPrice: data[6].firstCurrency,
      discountPercent: data[7].editable,
      soldPrice: data[8].firstCurrency,
      givenPriceCurrency: currency,
      preFinanceId: id,
      priceWithDiscountUSD: data.priceWithDiscountUSD,
      priceWithDiscountRUB: data.priceWithDiscountRUB,
      priceWithDiscountUZS: data.priceWithDiscountUZS,
    };
    await this.$axios
      .$put(`/api/v1/pre-finances/prefinance-calculations`, body)
      .then((res) => {
        this.$toast.success(res.message, {theme: "toasted-primary"});
      })
      .catch(({response}) => console.log(response));
  },
  async getExpenseGroup({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20,
    };
    await this.$axios
      .$put("/api/v1/expense-group/list", body)
      .then((res) => {
        commit("setExpenseGroup", res.data);
      })
      .catch(({response}) => {
        console.log(response);
      });
  },
  async getExpenseList({commit}, id) {
    await this.$axios
      .$get(`api/v1/expense/list?groupId=${id}`)
      .then((res) => {
        commit("setExpenseList", res.data);
      })
      .catch(({response}) => console.log(response));
  },
  async getMeasurementUnit({commit}) {
    const body = {
      filters: [],
      posts: [],
      page: 0,
      size: 50,
    };
    await this.$axios
      .$put(`api/v1/measurement-unit/list`, body)
      .then((res) => {
        commit("setMeasurementUnit", res.data.content);
      })
      .catch(({response}) => console.log(response));
  },
  async getAllDetails({commit}, id) {
    await this.$axios
      .$get(`/api/v1/possible-expense/list?preFinanceId=${id}`)
      .then((res) => {
        if (!!res.data.length) {
          commit("setDetailsList", res.data);
        }
      })
      .catch(({response}) => console.log(response));
  },
  async createDetails({commit, dispatch, state}, data) {
    await this.$axios
      .$post("/api/v1/possible-expense/create", data)
      .then((res) => {
        this.$toast.success(res.message, {theme: "toasted-primary"});
        dispatch("getAllDetails", state.preFinanceId);
      })
      .catch(({response}) => console.log(response));
  },

  async getOneDetails({commit}) {
    await this.$axios
      .get(`/api/v1/possible-expense/get?id=98`)
      .then((res) => {

      })
      .catch((res) => {
        console.log(res);
      });
  },

  async updateDetails({dispatch, state}, data) {
    await this.$axios
      .put(`/api/v1/possible-expense/update`, data)
      .then((res) => {
        dispatch("getAllDetails", state.preFinanceId);
        this.$toast.success(res.data.message, {theme: "toasted-primary"});

      })
      .catch((response) => {
        console.log(response);
      });
  },

  async deleteDetails({dispatch, state}, {id}) {
    await this.$axios
      .delete(`/api/v1/possible-expense/delete?id=${id}`)
      .then((res) => {
        dispatch("getAllDetails", state.preFinanceId);
        this.$toast.success(res.data.message, {theme: "toasted-primary"});
      })
      .catch((response) => {
        console.log(response);
      });
  },

  async changeStatus({commit}, {id, status}) {
    await this.$axios
      .$put(`/api/v1/pre-finances/change-status?id=${id}&status=${status}`)
      .then((res) => {
        this.$toast.success(res.message, {theme: "toasted-primary"});
      })
      .catch(({response}) => {
        console.log(response);
      });
  },
  async getOnePreFinance({commit}, id) {
    await this.$axios
      .$get(`/api/v1/pre-finances/get?id=${id}`)
      .then((res) => {
        commit("setOnePreFinance", res.data);
      })
      .catch(({response}) => console.log(response));
  },

  modelToPrefinance({commit},id){
    this.$axios.get(`/api/v1/pre-finances/get-by-model?modelId=${id}`)
    .then((res)=>{
      this.$router.push(`/prefinances/${res.data.data.id}`)
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  }
};
