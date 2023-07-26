export const state=()=>({
  sampleFabricOrdering:[],
  generatedFabricOrdering:[],
  partnerLists: [],

})

export const getters={
  sampleFabricOrdering: state=>state.sampleFabricOrdering,
  generatedFabricOrdering: state=>state.generatedFabricOrdering,
  partnerLists: state => state.partnerLists,
}

export const mutations={
  setSampleFabricOrdering(state,item){
    state.sampleFabricOrdering=item
  },
  setGeneratedFabricOrdering(state,item){
    state.generatedFabricOrdering=item
  },
  setPartners(state, partner) {
    state.partnerLists = partner;
  },
}

export const actions={
  async getSampleFabricOrdering({commit},id){
    await this.$axios.get(`/api/v1/fabric-order/list-planned-orders?orderId=${id}`)
    .then((res)=>{
      commit("setSampleFabricOrdering",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  async getGeneratedFabricOrdering({commit},id){
    await this.$axios.get(`/api/v1/fabric-order/fabric-orders?orderId=${id}`)
    .then((res)=>{
      commit("setGeneratedFabricOrdering",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  getPartnerName({commit}, name) {
    const body = {
      filters: [
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
      ],
      sorts: [],
      page: 0,
      size: 10
    }

    this.$axios.$put('/api/v1/partner/list', body)
      .then(res => {
        commit('setPartners', res.data.content);
      }).catch(({response}) => console.log(response))
  },

  generateFabricOrder({dispatch},data){
    this.$axios.post(`/api/v1/fabric-order/generate-fabric-order`,data)
    .then((res)=>{
      dispatch("getGeneratedFabricOrdering",data.orderId)
      dispatch("getSampleFabricOrdering",data.orderId)
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  setFabricOrder({dispatch},{data,id}){
    this.$axios.put(`/api/v1/fabric-order/order-fabric-order`,data)
    .then((res)=>{
      dispatch("getGeneratedFabricOrdering",id)
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      console.log(res);
      this.$toast.error(res.data.message)
    })
  },

  setTotalPrice({dispatch},{data,id}){
    this.$axios.put(`/api/v1/fabric-order/set-total-price`,data)
    .then((res)=>{
      dispatch("getGeneratedFabricOrdering",id)
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  changeStatus({dispatch},{status,id}){
    this.$axios.put(`/api/v1/fabric-order/change-status?fabricOrderId=${id}&status=${status}`)
    .then((res)=>{
      this.$toast.success(res.data.message)
    })
    .catch((res)=>{
      this.$toast.error(res.data.message)
      console.log(res);
    })
  },
  
}