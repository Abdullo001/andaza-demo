export const state = () => ({});
export const getters = {};
export const mutations = {};
export const actions = {
  uploadImages({commit}, {data, modelId}) {
    this.$axios.$post(`/api/v1/instructions/create`, data)
      .then(res => {
        this.$toast.success(res.message)
      }).catch(({response}) => {
      this.$toast.error(response.data.message)
    })
  }
};
