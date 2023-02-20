export const state=()=>({
  ordersList:[],
  oneOrder:{},
  newOrderId:null,

})

export const getters={
  ordersList: state=>state.ordersList.content,
  oneOrder: state=>state.oneOrder.content,
  newOrderId:state=>state.newOrderId,
}

export const mutations = {
  setOrders(state, order) {
    state.ordersList = order
  },
  setOneOrder(state, details) {
    state.oneOrder = details
  },
  setNewOrderId(state,id){
    state.newOrderId=id
  }
}

export const actions = {
  async getOrdersList({commit}, {page, size, orderNumber,modelGroup }) {
    const body = {
      filters: [
        {
          key: 'orderNumber',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: orderNumber
        },
        
        
      ],
      sorts: [],
      page, size
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    modelGroup = modelGroup === null ? '' : modelGroup
   
    await this.$axios.$put(`/api/v1/orders/list?modelGroup=${modelGroup}`,body)
      .then(res => {
        commit('setOrders', res.data)
        
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getOneOrder({commit}, {page, size, id }) {
    const body = {
      filters: [
        {
          key: 'id',
          propertyType: 'LONG',
          operator: 'EQUAL',
          value: id
        }
      ],
      sorts:[],
      page,size
    }
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    
    await this.$axios.$put(`/api/v1/orders/list?modelGroup=`,body)
    .then(res => {
      commit('setOneOrder', res.data)
      
    })
    .catch(({response}) => {
      console.log(response);
    })
   
  },

  async changeStatusOrder({dispatch}, {id, status}) {
    await this.$axios.$put(`/api/v1/orders/change-status?id=${id}&status=${status}`)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      })
      .catch(({response}) => console.log(response))
  },

  async createdOrder({commit},data){
    const order={
      deadline: data.deadline,
      description: data.description,
      givenPrice: data.givenPrice.amount,
      givenPriceCurrency:data.givenPrice.currency,
      headOfProductionDepartmentId:data.headOfDepartment,
      orderNumber:data.orderNumber,
      priority:data.priority,
    }
    this.$axios.$post('/api/v1/orders/create',order)
    .then(res=>{
      commit('setNewOrderId',res.data.clientId);
    }).catch(({response})=>console.log(response))
  }

}