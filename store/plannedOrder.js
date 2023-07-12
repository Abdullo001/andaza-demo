export const state = () => ({
  warehouseList: [],
  partnerLists: [],
  plannedOrderList: [],

});
export const getters = {
  partnerLists: state => state.partnerLists,
  warehouseList: state => state.warehouseList,
  plannedOrderList: state => state.plannedOrderList,

};
export const mutations = {
  setPartners(state, partner) {
    state.partnerLists = partner;
  },
  setWarehouseList(state, item) {
    state.warehouseList = item;
  },
  setPlannedOrderList(state, item) {
    state.plannedOrderList = item;
  }
};
export const actions = {
  getWarehouseCodeList({commit}, {name='', code=''}) {
    const body = {
      filters: [
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
        {
          key: 'code',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: code
        },
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    body.filters = body.filters.filter(el => el.value !== '' && el.value !== null);
    this.$axios.$put('/api/v1/warehouse/list', body)
      .then(res => {
        commit('setWarehouseList', res.data.content);
      }).catch(({response}) => console.log(response))
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
  getPlannedOrderList({commit}, id) {
    this.$axios.$get(`/api/v1/fabric-planning-chart/get-planned-order?fabricPlanningId=${id}`)
      .then(res => {
        commit('setPlannedOrderList', res.data);
      }).catch(({response}) => console.log(response));
  },
  createPlanningOrder({dispatch}, {data, id}) {
    this.$axios.$put(`/api/v1/fabric-planning-chart/set-planned-order`, data)
      .then(res => {
        dispatch('getPlannedOrderList', id);
        this.$toast.success(res.message);
      }).catch(({response}) => console.log(response));
  },

  generateFabricOrder({commit,dispatch},id){
    this.$axios.post(`/api/v1/fabric-planning-chart/generate-planned-order?fabricPlanningId=${id}`)
      .then((res)=>{
        this.$toast.success(res.data.message);
        dispatch("getPlannedOrderList",id)
      }).catch((response)=>{console.log(response)})
  },

  setPricePerUnitFunc({dispatch},{data,id}){
    this.$axios.put(`/api/v1/fabric-planning-chart/set-price-order`,data)
      .then((res)=>{
        dispatch("getPlannedOrderList",id)
        this.$toast.success(res.data.message);
      }).catch((response)=>{console.log(response)})
  }
};
