export const state = () => ({
    loading: true,
    bankDetailsList: [],
});
export const getters = {
    loading: state => state.loading,
    bankDetailsList: state => state.bankDetailsList.items,
    totalElements:(state)=>state.bankDetailsList.totalElements,
};
export const mutations = {
    setLoading(state, loadings) {
        state.loading = loadings
    },
    setBanksList(state, banksList) {
        state.bankDetailsList = banksList
    },
};
export const actions = {
    async getBankDetailsList({ commit }, { page, size, accountNumber, bankName, mfo, swift}) {
        accountNumber=accountNumber??""
        bankName=bankName??""
        mfo=mfo??""
        swift=swift??""
        commit("setLoading", true);
        await this.$axios.get(`/api/v1/banks?page=${page}&size=${size}&accountNumber=${accountNumber}&bankName=${bankName}&mfo=${mfo}&swift=${swift}`)
            .then(res => {
                commit("setBanksList", res.data.data);
                commit("setLoading", false);
            })
            .catch(({ response }) => {
                commit("setLoading", false);
                console.log(response)
            })
    },
    async createBank({ dispatch }, data) {
        await this.$axios.post('/api/v1/banks', data)
            .then(res => {
                this.$toast.success(res.data.code);
                dispatch('getBankDetailsList', {page: 0, size: 10});
            })
            .catch(({ response }) => {
                this.$toast.error(response.data.response)
                console.log(response)
            })
    },
    async updateBank({ dispatch }, { id, data }) {
        await this.$axios.put(`/api/v1/banks/${id}`, data)
            .then(res => {
                this.$toast.success(res.data.code);
                dispatch('getBankDetailsList', {page: 0, size: 10});
            })
            .catch(({ response }) => {
                this.$toast.error(response.data.response)
                console.log(response)
            })
    },
    async deleteBank({ dispatch }, id) {
        await this.$axios.delete(`/api/v1/banks/${id}`)
            .then(res => {
                dispatch('getBankDetailsList', {page: 0, size: 10});
            })
            .catch(({ response }) => {
                this.$toast.error(response.data.response)
                console.log(response)
            })
    },
};
