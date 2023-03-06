export const state = () => ({
  commentText: {}
});
export const getters = {
  commentText: state => state.commentText,

};
export const mutations = {
  setCommentText(state, comment) {
    state.commentText = comment;
  }
};
export const actions = {
  uploadImages({commit}, {data}) {
    this.$axios.$post(`/api/v1/instructions/create`, data)
      .then(res => {
        this.$toast.success(res.message)
      }).catch(({response}) => {
      this.$toast.error(response.data.message)
    })
  },
  async getComment({commit}, {modelId, type}) {
    await this.$axios.$get(`/api/v1/instructions/get?modelId=${modelId}&type=${type}`)
      .then(res => {
        commit('setCommentText', res.data)
      }).catch(({response}) => console.log(response))
  },
  async createComments({commit}, data) {
    delete data.id
    await this.$axios.$post('/api/v1/instructions/create', data)
      .then(res => {
        this.$toast.success(res.message)
        commit('setCommentText', res.data);
      }).catch(({response}) => {
        this.$toast.error(response.data.message)
    })
  },
  updateComment({commit}, data) {
    this.$axios.$put('/api/v1/instructions/update', data)
      .then(res => {
        this.$toast.success(res.message)
      }).catch(({response}) => console.log(response))
  }
};
