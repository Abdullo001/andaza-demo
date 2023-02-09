export const state = () => ({
  chartSizes: []
});
export const getters = {
  chartSizes: state => state.chartSizes
};
export const mutations = {
  setChartSizes(state, chartSize) {
    state.chartSizes = chartSize;
  }
};
export const actions ={
  getChartSizes({commit}, id) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    this.$axios.$put(`/api/v1/size-charts/list?modelId=${id}`, body)
      .then(res => {
        console.log(res);
        commit('setChartSizes', res.data);
      })
      .catch(({response}) => console.log(response))
  }
}
