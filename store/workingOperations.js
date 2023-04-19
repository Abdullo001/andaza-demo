export const state = () => ({
  mainsList: [],
  invoiceNumber: [],
  message: 200,
});
export const getters = {
  mainsList: state => state.mainsList.main,
  partList: state => state.mainsList.part,
  invoiceNumber: state => state.invoiceNumber,
  message: state => state.message,
};
export const mutations = {
  setWorkingMain(state, mains){
    state.mainsList = mains
  },
  setInvoice(state, invoiceNumbers){
    state.invoiceNumber = invoiceNumbers
  },
  setSuccessMessage(state, messages){
    state.message = messages
  },
};
export const actions = {
  async getWorkingOperationPdf({dispatch}, id) {
    await this.$axios.get(`/api/v1/working-operations/delete-details?detailsId=${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async deleteWorkingOperation({dispatch}, data) {
    await this.$axios.$delete(`/api/v1/working-operations/delete-details?detailsId=${data.id}`)
      .then(res => {
        dispatch("getWorkingInfo", data.processPlanningId);
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },
  async updateWorkingOperation({dispatch}, data) {
    await this.$axios.$put('/api/v1/working-operations/update-details', data)
      .then(res => {
        this.$toast.success(res.message);
        dispatch("getWorkingInfo", data.processPlanningId)
      })
      .catch(({response}) => {
        console.log(response)
        this.$toast.error(response.data.message);
      })
  },
  async postWorkingOperation({dispatch}, data) {
    await this.$axios.$post('/api/v1/working-operations/create-details', data)
      .then(res => {
        dispatch("getWorkingInfo", data.processPlanningId)
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message);
      })
  },
  async getWorkingInfo({commit}, id) {
    await this.$axios.get(`/api/v1/working-operations/info?processPlanningId=4`)
      .then(res => {
        commit("setWorkingMain", res.data.data);
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message);
      })
  },
  async putSetInvoice({commit}, data) {
    await this.$axios.$put('/api/v1/working-operations/set-invoice', data)
      .then(res => {
        commit("setInvoice", res.data)
      })
      .catch(({response}) => {
        this.$toast.error(response.data.message);
      })
  }
};
