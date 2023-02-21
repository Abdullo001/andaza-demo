export const state = () => ({
  chartSizes: [],
  sizeTemplateList: {},
  sizeTemplate: [],

});
export const getters = {
  chartSizes: state => state.chartSizes,
  sizeTemplate: state => state.sizeTemplate,
};
export const mutations = {
  setChartSizes(state, item) {
    state.chartSizes = item;
  },
  setSizeTemplate(state, size) {
    state.sizeTemplateList = size;
    size.content.map(el => {
      el.sizes = el.sizes.join(', ');
    });
    state.sizeTemplate = size.content.map(item => item.sizes)
  },
};
export const actions = {
  getChartSizes({commit}, id) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 20
    }
    this.$axios.$put(`/api/v1/size-charts/list?modelId=${id}`, body)
      .then(res => {
        commit('setChartSizes', res.data.content);
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
