export const state = () => ({
  ppgList: [],
  ppgInfo:{},
});

export const getters = {
  ppgList: (state) => state.ppgList.content,
  totalElements: (state) => state.ppgList.totalElements,
  ppgInfo: (state) => state.ppgInfo,
};

export const mutations = {
  setPpgList(state, item) {
    state.ppgList=item;
  },
  setPpgInfo(state, item) {
    state.ppgInfo=item;
  },
};

export const actions = {
  getPpgList({ commit }, {page,size,clientName,isPriceEnabled,modelNumber,modelStatus,orderNumber,shippingDate}) {
    const data = {
      clientName: clientName??"",
      isPriceEnabled: isPriceEnabled??true,
      modelNumber: modelNumber??"",
      modelStatus: modelStatus??"",
      orderNumber: orderNumber??"",
      shippingDate: null,
      page,size,
      
    };

    this.$axios.put(`/api/v1/ppg`,data)
    .then((res)=>{
      commit("setPpgList",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getPpgInfo({commit},{id,color}){

    this.$axios.get(`/api/v1/ppg/info/${id}?color=${color}`)
    .then((res)=>{
      commit("setPpgInfo",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  }
};
