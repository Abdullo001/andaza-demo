export const state = () => ({
  accessoryList: [],
  ordersList:[],
  ordersListSpend:[],
  modelsList:[],
  modelsListSpend:[],
  accessoriesDetailList:{},
  accessoriesSpendList:[],
  editDates:{},
  historyList:[],
});

export const getters = {
  accessoryList: state => state.accessoryList.content,
  ordersList: state=>state.ordersList.content,
  ordersListSpend: state=>state.ordersListSpend.content,
  modelsList: state=>state.modelsList,
  modelsListSpend: state=>state.modelsListSpend,
  accessoriesDetailList: state=>state.accessoriesDetailList,
  accessoriesSpendList: state=>state.accessoriesSpendList,
  editDates:state=>state.editDates,
  historyList:state=>state.historyList
}
export const mutations = {
  setAccessoryList(state, item) {
    state.accessoryList = item;
  },
  setOrders(state,item){
    state.ordersList=item
  },
  setModels(state,item){
    state.modelsList=item
  },
  setAccessoriesDetailList(state,item){
    state.accessoriesDetailList=item
  },
  setAccessoriesSpendList(state,item){
    state.accessoriesSpendList=item
  },
  setOrdersSpend(state,item){
    state.ordersListSpend=item
  },
  setModelsSpend(state,item){
    state.modelsListSpend=item
  },
  setEditDates(state,item){
    state.editDates=item
  },
  setHistory(state,item){
    state.historyList=item
  },
}
export const actions = {
  async getAccessoryWarehouseList({commit}, {page, size,modelNumber,orderNumber}) {
    const body = {
      modelNumber,
      orderNumber,
      page, size
    }
    await this.$axios.$put(`/api/v1/accessory-warehouse/list`,body )
      .then(res => {
        commit('setAccessoryList', res.data);
      }).catch(({response}) => console.log(response));
  },

  async getOrdersList({ commit }, { name }) {
    const body = {
      filters: [
        {
          key: "orderNumber",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        }
      ],
      sorts: [],
      page:0,
      size:50,
    };
    body.filters = body.filters.filter(
      (el) => el.value !== "" && el.value !== null
    );
    await this.$axios.$put(`/api/v1/orders/list?modelGroup=`, body)
      .then((res) => {
        commit("setOrders", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },

  getModelsList({commit},orderId){
    this.$axios.get(`/api/v1/models/list-by-order?orderid=${orderId}`)
    .then((res)=>{
      commit("setModels",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
  

  searchAccessory({commit},{orderId,modelId}){
    this.$axios.get(`/api/v1/accessory-warehouse/search-orders?orderId=${orderId}&modelId=${modelId}`)
    .then((res)=>{
      commit("setAccessoriesDetailList",res.data.data)
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message);

    })
  },

  setDeliveredQuantity({dispatch},{data,modelId,orderId}){
    this.$axios.put(`/api/v1/accessory-warehouse/set-delivered-quantity`,data)
    .then((res)=>{
      this.$toast.success(res.data.message);
      dispatch("searchAccessory",{orderId,modelId})
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  createAccessoryWarehouse({dispatch},{modelId,orderId}){
    this.$axios.post(`/api/v1/accessory-warehouse/create?orderId=${orderId}&modelId=${modelId}`)
    .then((res)=>{
      this.$toast.success(res.data.message);
      dispatch("searchAccessory",{orderId,modelId})
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message);

    })
  },

  deleteAccessory({dispatch},{planningOrderId,orderId,modelId}){
    this.$axios.delete(`/api/v1/accessory-warehouse/delete?planningOrderId=${planningOrderId}`)
    .then((res)=>{
      this.$toast.success(res.data.message);
      dispatch("searchAccessory",{orderId,modelId})
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message);

    })
  },

  searchSpendAccessory({commit},{orderId,modelId}){
    this.$axios.get(`/api/v1/accessory-warehouse/search-orders?orderId=${orderId}&modelId=${modelId}`)
    .then((res)=>{
      commit("setAccessoriesSpendList",res.data.data.accessoryOrders )
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message);

    })
  },

  spendAccessory({dispatch},{data,orderId,modelId}){
    this.$axios.put(`/api/v1/accessory-warehouse/spend-accessory`,data)
    .then((res)=>{
      this.$toast.success(res.data.message);
      dispatch("searchAccessory",{orderId,modelId})
    })
    .catch(({response})=>{
      console.log(response);
      this.$toast.error(response.data.message);

    })
  },

  async getOrdersListSpend({ commit }, { name }) {
    const body = {
      filters: [
        {
          key: "orderNumber",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        }
      ],
      sorts: [],
      page:0,
      size:50,
    };
    body.filters = body.filters.filter(
      (el) => el.value !== "" && el.value !== null
    );
    await this.$axios.$put(`/api/v1/orders/list?modelGroup=`, body)
      .then((res) => {
        commit("setOrdersSpend", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },

  getModelsListSpend({commit},orderId){
    this.$axios.get(`/api/v1/models/list-by-order?orderid=${orderId}`)
    .then((res)=>{
      commit("setModelsSpend",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },

  giveOwn({dispatch},{data,orderId,modelId}){
    this.$axios.put(`/api/v1/accessory-warehouse/give-own-accessory`,data)
    .then((res)=>{
      dispatch("searchAccessory",{orderId,modelId})
      this.$toast.success(res.data.message);
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message);
      console.log(res);
    })
  },

  giveSubcontractor({dispatch},{data,orderId,modelId}){
    this.$axios.put(`/api/v1/accessory-warehouse/give-subcontractor-accessory`,data)
    .then((res)=>{
      dispatch("searchAccessory",{orderId,modelId})
      this.$toast.success(res.data.message);
    })
    .catch(({response})=>{
      this.$toast.error(response.data.message);
      console.log(res);
    })
  },

  getHistoryList({commit},id){
    this.$axios.get(`/api/v1/accessory-warehouse-operation/list?warehouseId=${id}`)
    .then((res)=>{
      commit("setHistory",res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  },
}
