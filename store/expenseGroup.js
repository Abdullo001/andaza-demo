export const state = () => ({
  loading: true,
  expenseGroup: [],
  expenseForProduction:[],
  expenseList:[],
})
export const getters = {
  loading: state => state.loading,
  expenseForProduction: state => state.expenseForProduction,
  expenseGroup: state => state.expenseGroup.items,
  totalElements: state => state.expenseGroup.totalElements,
  expenseList: state => state.expenseList,
}
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings
  },
  setExpenseGroup(state, expenseGroups) {
    state.expenseGroup = expenseGroups
  },
  setExpenseForProduction(state, item) {
    state.expenseForProduction = item
  },
  setExpenseList(state, item) {
    state.expenseList = item
  },
}
export const actions = {
  async filterExpenseGroup({commit}, data) {
    
    const expenseGroupName=data.name??"" 
    await this.$axios.get(`/api/v1/expense-groups?page=0&size=10&expenseGroupName=${expenseGroupName}`)

      .then(res => {
        commit('setExpenseGroup', res.data.data)
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateExpenseGroup({dispatch}, {data,id}) {
    await this.$axios.$put(`/api/v1/expense-groups/${id}`, data)
      .then(res => {
        this.$toast.success(res.data.message)
        dispatch('getExpenseGroup', {page: 0, size: 10})
      })
      .catch(({response}) => {
        this.$toast.error(res.data.errorMessage)
        console.log(response)
      })
  },
  async deleteExpenseGroup({dispatch}, id) {
    await this.$axios.delete(`/api/v1/expense-groups/${id}`)
      .then(res => {
        this.$toast.success(res.data.data.message)
        dispatch('getExpenseGroup', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createExpenseGroup({dispatch}, data) {
    await this.$axios.post('/api/v1/expense-groups', data)
      .then(res => {
        this.$toast.success(res.data.data.message)
        dispatch('getExpenseGroup', {page: 0, size: 10})
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getExpenseGroup({commit}, {page, size,expenseGroupId="",expenseGroupName=""}) {
    expenseGroupId=expenseGroupId??"",
    expenseGroupName=expenseGroupName??"",
    await this.$axios.get(`/api/v1/expense-groups?page=${page}&size=${size}&expenseGroupId=${expenseGroupId}&expenseGroupName=${expenseGroupName}`)
      .then(res => {
          commit('setExpenseGroup', res.data.data)
          commit("setLoading", false)
          
      })
      .catch(({response}) => {
        commit("setLoading", false)
      })
  },

  getExpenseProduction({commit},{modelId,groupId}){
    this.$axios.get(`/api/v1/possible-expense/expenses?modelId=${modelId}&groupId=${groupId}`)
    .then((res)=>{
      commit("setExpenseForProduction",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getExpenseItems({commit},id){
    this.$axios.get(`/api/v1/expenses/expense-groups/${id}`)
    .then((res)=>{
      commit("setExpenseList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  }
}
