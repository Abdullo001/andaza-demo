export const state = () => ({
  preFinances: [],
  modelName: [],
  preFinanceId: "",
  expenseGroup: {},
  expenseList: [],
  detailsList: [{totalPrice: 0}],
  loading: true,
  onePreFinance: {},
  selectedModelNumber: '',
  prefinancePdf:'',
  detailsTemplatesList:[],
  totalWorkPrice:[]
})
export const getters = {
  preFinancesContent: state => state.preFinances.content,
  modelNames: state => state.modelName.map(el => el.modelNumber),
  modelData: state => state.modelName,
  preFinanceId: state => state.preFinanceId,
  expenseGroup: state => state.expenseGroup.content,
  expenseList: state => state.expenseList,
  detailsList: state => state.detailsList,
  loading: state => state.loading,
  totalElements: state => state.preFinances.totalElements,
  onePreFinance: state => state.onePreFinance,
  selectedModelNumber: state => state.selectedModelNumber,
  prefinancePdf: state => state.prefinancePdf,
  detailsTemplatesList: state => state.detailsTemplatesList,
  totalWorkPrice: state => state.totalWorkPrice,
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
  setDetailsList(state, detail) {
    state.detailsList = detail;
  },
  changeLoading(state, status) {
    state.loading = status;
  },
  setOnePreFinance(state, item) {
    state.onePreFinance = item;
  },
  setPrefinancePdf(state, item) {
    state.prefinancePdf = item;
  },
  setDetailsTemplatesList(state, item) {
    state.detailsTemplatesList = item;
  },
  setTotalWorkPrice(state, item) {
    state.totalWorkPrice = item;
  },
};
export const actions = {
  async getPreFinancesList({commit}, {size, page, preFinanceNumber, modelNumber , partner }) {
    const body = {
      calculationNumber:preFinanceNumber,
      client:partner,
      modelNumber:modelNumber,
      size,
      page,
    };
    await this.$axios.$put(`/api/v1/pre-finances/list`, body)
      .then((res) => {
        commit("setRefinances", res.data);
      })

  },
  async getModelName({commit}, name) {
    const body = {
      client:'',
      modelNumber:name,
      page:0,
      size:10,
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
      orderedQuantity: data.orderedQuantity,
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
  async saveCalculation({commit}, data) {
    await this.$axios.$put(`/api/v1/pre-finances/prefinance-calculations`, data)
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
  async getAllDetails({commit}, id) {
    await this.$axios
      .$get(`/api/v1/possible-expense/list?preFinanceId=${id}`)
      .then((res) => {
        commit("setDetailsList", res.data);

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
      this.$router.push(this.localePath(`/prefinances/${res.data.data.id}`))
    })
    .catch(({res})=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  async getPrefinanceGeneratePdf({commit},data){
    await this.$axios.put(`/api/v1/pre-finances/generate-calculation-form`,data)
    .then((res)=>{
      const binaryCode=atob(res.data)
      commit("setPrefinancePdf",binaryCode)
    })
  },
  async getPrefinanceTemplates({commit}){
    this.$axios.get(`/api/v1/templates/pre-finance`)
    .then((res)=>{
      commit("setDetailsTemplatesList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },
  async setPrefinanceTemplate({dispatch},{preFinanceId,templateName}){
    this.$axios.put(`/api/v1/templates/pre-finance`,{preFinanceId,templateName})
    .then((res)=>{
      dispatch("getAllDetails",preFinanceId)
      this.$toast.succes(res.data.succes)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  async createPrefinanceTemplate({dispatch},{preFinanceId,templateName}){
    this.$axios.post(`/api/v1/templates/pre-finance`,{preFinanceId,templateName})
    .then((_res)=>{
      dispatch("getPrefinanceTemplates")
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
  async getModelOperationsList({commit},preFinanceId){
    this.$axios.get(`/api/v1/pre-finances/workforce-expenses/${preFinanceId}`)
    .then((res)=>{
      commit("setTotalWorkPrice",res.data.data)
    })
    .catch(({response})=>{
      console.log(response);
    })
  },
};
