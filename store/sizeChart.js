export const state = () => ({
  chartSizes: [],
  sizeTemplate: {
    content: [{id: 1, sizes: ['x']}]
  }
});
export const getters = {
  chartSizes: state => state.chartSizes,
  // sizeTemplate: state => state.sizeTemplate.content.map(elem => {
  //   elem.sizes = elem.sizes.join(', ');
  // }),
  // templateSizes: state => state.sizeTemplate?.content.map(item => item.sizes),


};
export const mutations = {
  setChartSizes(state, chartSize) {
    state.chartSizes = chartSize;
  },
  setSizeTemplate(state, size) {
    state.sizeTemplate = size;
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
        commit('setChartSizes', res.data);
      })
      .catch(({response}) => console.log(response))
  },
  getSizeTemplate({commit}) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    this.$axios.$put(`/api/v1/size-template/list`, body)
      .then(res => {
        commit('setSizeTemplate', res.data);
      })
      .catch(({response}) => response);
  }
}
