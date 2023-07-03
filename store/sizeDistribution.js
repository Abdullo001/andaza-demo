export const state = () => ({
  sizeDistributionInfo: {},
  bodyParts: {},
  sizes: [],
  sizeValues: [],
  bodyPartValues: {},
  total: null,
  overproductionPercent: null,
  totalWithOverproductionPercent: null,
  order: [],
  colorsList:[],
  sizeDistributionList:[],
});

export const getters = {
  bodyParts: (state) => state.bodyParts.parts,
  sizes: (state) => state.sizes.sizes,
  sizeValues: (state) => state.sizeValues.sizeDistributions,
  bodyPartValues: (state) => state.bodyPartValues.bodyPartsCodes,
  total: (state) => state.total,
  overproductionPercent: (state) => state.overproductionPercent,
  totalWithOverproductionPercent: (state) => state.totalWithOverproductionPercent,
  modelId: (state) => state.order?.content[0]?.modelId,
  colorsList: state=>state.colorsList,
  sizeDistributionList: state=>state.sizeDistributionList
};

export const mutations = {
  setBodyParts(state, item) {
    state.bodyParts = item;
  },
  setSizes(state, item) {
    state.sizes = item;
  },
  setTotal(state, item) {
    state.total = item;
  },
  setOverproductionPercent(state, item) {
    state.overproductionPercent = item
  },
  totalWithOverproductionPercent(state, item) {
    state.totalWithOverproductionPercent = item
  },
  setSizeValues(state, item) {
    state.sizeValues = item;
  },
  setBodyPartsValues(state, item) {
    state.bodyPartValues = item;
  },
  setOneOrder(state, item) {
    state.order = item;
  },
  setColorsList(state,item){
    state.colorsList=item
  },

  setSizeDistributionList(state,list){
    state.sizeDistributionList=list
  }
};

export const actions = {
  async getSizeDistribution({commit}, {modelId}) {
    await this.$axios
      .get(`/api/v1/orders/size-distributions-info?modelId=${modelId}`)
      .then((res) => {
        commit("setSizes", res.data.data);
        commit("setBodyParts", res.data.data);
      })
      .catch((response) => {
        console.log(response);
      });
  },
  async getSizeDistributionValue({commit}, {modelId, orderId}) {
    await this.$axios
      .get(
        `/api/v1/orders/get-size-distributions?orderId=${orderId}&modelId=${modelId}`
      )
      .then((res) => {
        commit("setSizeDistributionList",res.data.data)
      })
      .catch((res) => {
        console.log(res);
      });
  },
  async updateSizeDistributionValue({dispatch}, data) {
    await this.$axios
      .$put(`/api/v1/orders/update-size-distributions`, data)
      .then((res) => {
        dispatch("getSizeDistributionValue", {
          modelId: data.modelId,
          orderId: data.orderId,
        });
        dispatch(
          "orders/getOneOrder",
          { id: data.orderId, modelId: data.modelId },
          {root:true});
        this.$toast.success(res.message);
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.message);
      });
  },
  async deleteSizeDistributionFunc({dispatch}, {setIdentifier, sizeDistributionId,orderId,modelId}) {
    await this.$axios.$delete(
      `/api/v1/orders/delete-size-distributions?setIdentifier=${setIdentifier}&sizeDistributionId=${sizeDistributionId}`)
      .then((res) => {
        dispatch("getSizeDistributionValue", {orderId, modelId})
        this.$toast.success(res.message);
      })
      .catch((res) => {
        console.log(res);
        this.$toast.error(res.message);

      })
  },

  async createSizeDistirbutionFunc({dispatch},data){
    await this.$axios.post(`/api/v1/orders/create-size-distributions`,data)
    .then((res)=>{
      dispatch("getSizeDistributionValue",{orderId:data.orderId,modelId:data.modelId})
      dispatch(
        "orders/getOneOrder",
        { id: data.orderId, modelId: data.modelId },
        {root:true});
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  async getColorsList({commit}){
    await this.$axios.get(`/api/v1/colors/thin-list`)
    .then((res)=>{
      commit('setColorsList',res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  }
};
