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
  },
  async createSizeChart({dispatch}, data) {
    let newData = {...data};
    delete newData.code;
    delete newData.description;
    delete newData.deviation;
    delete newData.sizeName;
    delete newData.gradation;
    delete newData.shrinkagePercent;
    delete newData.modelId;
    const templateSizesValues = [];
    if (!!Object.keys(newData).length) {
      for (let key in newData) {
        const value = newData[key];
        const item = {name: key.toUpperCase(), size: value}
        templateSizesValues.push(item);
      }
      const body = {
        code: data.code,
        description: data.description,
        deviation: data.deviation,
        gradation: data.gradation,
        modelId: data.modelId,
        shrinkagePercent: data.shrinkagePercent,
        sizeName: data.sizeName,
        templateSizesValues: templateSizesValues
      }
      await this.$axios.$post('/api/v1/size-charts/create', body)
        .then(res => {
          this.$toast.success(res.message)
          dispatch('getChartSizes', data.modelId)
        }).catch(({response}) => {
          this.$toast.error(response.data.message)
        })
    }
  },
  async deleteOneSizeChart({dispatch}, {chartId, modelId}) {
    await this.$axios.$delete(`/api/v1/size-charts/delete?id=${chartId}`)
      .then(res => {
        this.$toast.success(res.message);
        dispatch('getChartSizes', modelId)
      }).catch(({response}) => console.log(response))
  },
  async updateChartSizes({dispatch}, data) {
    let newData = {...data};
    delete newData.code;
    delete newData.description;
    delete newData.deviation;
    delete newData.sizeName;
    delete newData.gradation;
    delete newData.shrinkagePercent;
    delete newData.modelId;
    delete newData.id;
    delete newData.modelNumber;
    delete newData.createdAt;
    delete newData.updatedAt;
    delete newData.createdBy;
    delete newData.updatedBy;

    const templateSizesValues = [];
    if (!!Object.keys(newData).length) {
      for (let key in newData) {
        const value = newData[key];
        const item = {name: key.toUpperCase(), size: value}
        templateSizesValues.push(item);
      }
      const body = {
        id: data.id,
        code: data.code,
        description: data.description,
        deviation: data.deviation,
        gradation: data.gradation,
        modelId: data.modelId,
        shrinkagePercent: data.shrinkagePercent,
        sizeName: data.sizeName,
        templateSizesValues: templateSizesValues
      }
      await this.$axios.$put('/api/v1/size-charts/update', body)
        .then(res => {
          this.$toast.success(res.message)
          dispatch('getChartSizes', data.modelId)
        }).catch(({response}) => console.log(response))
    }
  }
}
