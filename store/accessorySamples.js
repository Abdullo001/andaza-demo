export const state = () => ({
  samplesList: [],
  oneSample:{},
  purposeList: [],
  totalElement: null,
  loading: true,
  colorList: [],
});

export const getters = {
  samplesList: (state) => state.samplesList,
  oneSample: (state) => state.oneSample,
  purposeList: (state) => state.purposeList,
  totalElements: (state) => state.totalElement,
  loading: (state) => state.loading,
  colorList: (state) => state.colorList,
};

export const mutations = {
  setOneSample(state, item) {
    state.oneSample = item;
  },
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
  getSamplesList({commit}, {size, page,modelNumber,orderNumber}) {
    const body = {
      modelNumber:modelNumber,
      orderNumber:orderNumber,
      page: page,
      size: size,
    };
    

    this.$axios.put('/api/v1/sample-planning/list', body)
      .then((res) => {
        commit("setSamplesList", res.data.data.content)
        commit("setTotalElement", res.data.data.totalElements)
        commit("setLoading", false)
      })
      .catch((res) => {
        console.log(res);
      })
  },



  async createSample({dispatch,commit}, data) {
    await this.$axios.post(`/api/v1/sample-planning/create`, data)
      .then((res) => {
        commit("setOneSample",res.data.data)
        this.$toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res);
      })
  },

  async getOneSample({commit},id){
    await this.$axios.get(`/api/v1/sample-planning/get-one?id=${id}`)
    .then((res)=>{
      commit("setOneSample",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  async updateSample({dispatch,commit}, data) {
    await this.$axios.put(`/api/v1/sample-planning/update`, data)
      .then((res) => {
        commit("setOneSample",res.data.data)
        dispatch("getSamplesList", {page: 0, size: 10,modelNumber:"",orderNumber:""})
        this.$toast.success(res.data.message)
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.data.message)
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
