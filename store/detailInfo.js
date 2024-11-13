export const state = () => ({
  detailInfo: {},
});

export const getters = {
  detailInfo: (state) => state.detailInfo.data,
};

export const mutations = {
  setDetailInfo(state, details) {
    state.detailInfo = details;
  },
};

export const actions = {
  async getDetailInfo({ commit }, { orderId, modelId }) {
    await this.$axios
      .get(`/api/v1/orders/detail-info?orderId=${orderId}&modelId=${modelId}`)
      .then((res) => {
        
        commit("setDetailInfo", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
};
