export const state = () => ({
  ppgList: [],
  ppgInfo:{},
});

export const getters = {
  ppgList: (state) => state.ppgList.items,
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

    this.$axios.get(`/api/v1/ppg?size=${size}&page=${page}&clientName=${data.clientName}&modelNumber=${data.modelNumber}&orderNumber=${data.orderNumber}`)
    .then((res)=>{
      commit("setPpgList",res.data.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  },

  getPpgInfo({commit},{id,color}){

    this.$axios.get(`/api/v1/ppg/info/${id}?color=${encodeURIComponent(color)}`)
    .then((res)=>{
      commit("setPpgInfo",res.data)
    })
    .catch((response)=>{
      console.log(response);
    })
  }
};
