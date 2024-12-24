export const state = () => ({
    loading: true,
    modelOperationList: [],
});
export const getters = {
    loading: state => state.loading,
    modelOperationList: state => state.modelOperationList.items,
    totalElements:(state)=>state.modelOperationList.totalElements,
};
export const mutations = {
    setLoading(state, loadings) {
        state.loading = loadings
    },
    setModelOperationList(state, banksList) {
        state.modelOperationList = banksList
    },
};
export const actions = {
    async getModelOperationList({ commit }, { page, size, name}) {
        name=name??""
        commit("setLoading", true);
        await this.$axios.get(`/api/v1/model-operations?page=${page}&size=${size}&name=${name}`)
            .then(res => {
                commit("setModelOperationList", res.data.data);
                commit("setLoading", false);
            })
            .catch(({ response }) => {
                commit("setLoading", false);
                console.log(response)
            })
    },
    async createModelOperation({ dispatch }, data) {
        await this.$axios.post('/api/v1/model-operations', data)
            .then(res => {
                this.$toast.success(res.data.code);
                dispatch('getModelOperationList', {page: 0, size: 10});
            })
            .catch(({ response }) => {
                this.$toast.error(response.data.response)
                console.log(response)
            })
    },
    async deleteModelOperation({ dispatch }, id) {
        await this.$axios.delete(`/api/v1/model-operations/${id}`)
            .then(res => {
                dispatch('getModelOperationList', {page: 0, size: 10});
            })
            .catch(({ response }) => {
                this.$toast.error(response.data.response)
                console.log(response)
            })
    },
    async updateModelOperation({ dispatch }, { id, data }) {
        await this.$axios.put(`/api/v1/model-operations/${id}`, data)
            .then(res => {
                this.$toast.success(res.data.code);
                dispatch('getModelOperationList', {page: 0, size: 10});
            })
            .catch(({ response }) => {
                this.$toast.error(response.data.response)
                console.log(response)
            })
    },
};
