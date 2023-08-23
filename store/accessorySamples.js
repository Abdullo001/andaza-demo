export const state = () => ({
  samplesList: [],
  purposeList: [],
  totalElement: null,
  loading: true,
  colorList: [],
});

export const getters = {
  samplesList: (state) => state.samplesList,
  purposeList: (state) => state.purposeList,
  totalElements: (state) => state.totalElement,
  loading: (state) => state.loading,
  colorList: (state) => state.colorList,
};

export const mutations = {
  setSamplesList(state, list) {
    state.samplesList = list;
  },
  setPurposeList(state, list) {
    state.purposeList = list
  },
  setTotalElement(state, item) {
    state.totalElement = item
  },
  setLoading(state, item) {
    state.loading = item
  },
  setColorList(state, list) {
    state.colorList = list
  }
};

export const actions = {
  getSamplesList({commit}, {size, page}) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    };
    body.filters = body.filters.filter(
      (el) => el.value !== "" && el.value !== null
    );

    this.$axios.put('/api/v1/samples/list', body)
      .then((res) => {
        commit("setSamplesList", res.data.data.content)
        commit("setTotalElement", res.data.data.totalElements)
        commit("setLoading", false)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  getPurposeList({commit}) {
    this.$axios.get(`/api/v1/sample-purposes/thin-list`)
      .then((res) => {
        commit("setPurposeList", res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  async createSample({dispatch}, data) {
    await this.$axios.post(`/api/v1/samples/create`, data)
      .then((res) => {
        this.$toast.success(res.data.message);
        dispatch('getSamplesList', {size: 10, page: 0})
      })
      .catch((res) => {
        console.log(res);
      })
  },

  async updateSample({dispatch}, data) {
    await this.$axios.put(`/api/v1/samples/update`, data)
      .then((res) => {
        dispatch("getSamplesList", {page: 0, size: 10})
      })
      .catch((res) => {
        console.log(res);
      })
  },

  getOneSample({commit}) {
    this.$axios.get(`/api/v1/samples/get?id=${21}`)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      })
  },

  async deleteSample({dispatch}, id) {
    await this.$axios.delete(`/api/v1/samples/delete?id=${id}`)
      .then((res) => {
        dispatch("getSamplesList", {size: 10, page: 0})
        this.$toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res);
      })
  },

  async changeResult({dispatch}, {id, result}) {
    await this.$axios.put(`/api/v1/samples/change-status?id=${id}&result=${result}`)
      .then((res) => {
        this.$toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message);
      })
  },

  filterSamples({commit}, data) {
    const body = {
      filters: [
        {
          key: "id",
          operator: "EQUAL",
          propertyType: "LONG",
          value: data.id,
        },
        {
          key: "purpose",
          operator: "LIKE",
          propertyType: "STRING",
          value: data.purpose,
        },
        {
          key: "partner",
          operator: "LIKE",
          propertyType: "STRING",
          value: data.partner,
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    };
    body.filters = body.filters.filter(
      (el) => el.value !== "" && el.value !== null
    );
    this.$axios.put('/api/v1/samples/list', body)
      .then((res) => {
        commit("setSamplesList", res.data.data.content)
        commit("setTotalElement", res.data.data.totalElements)
      })
      .catch((res) => {
        console.log(res);
      })
  },

  modelColor({commit}, id) {
    if(!!id)
    this.$axios.get(`/api/v1/colors/list-by-model?modelId=${id}`)
      .then((res) => {
        commit("setColorList", res.data.data)
      })
      .catch((res) => {
        console.log(res)
      })
  }
};
