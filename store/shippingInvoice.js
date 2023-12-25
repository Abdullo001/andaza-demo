export const state = () => ({
  shippingInvoiceList: [],
  shippingInvoiceItemList: [],
})

export const getters = {
  shippingInvoiceList: state => state.shippingInvoiceList,
  shippingInvoiceItemList: state => state.shippingInvoiceItemList
}

export const mutations = {
  setInvoiceList(state, item) {
    state.shippingInvoiceList = item
  },
  setInvoiceItemList(state, item) {
    state.shippingInvoiceItemList = item
  }
}

export const actions = {
  getInvoiceList({commit}, id) {
    this.$axios.$get(`/api/v1/invoice/get?shippingId=${id}`).then(res => {
      commit('setInvoiceList', res.data)
    }).catch(res => {
      console.log(res)
    })
  },
  getInvoiceItemList({commit}, id) {
    this.$axios.$get(`/api/v1/invoice-item/list?shippingId=${id}`).then(res => {
      commit('setInvoiceItemList', res.data)
    }).catch(res => {
      console.log(res)
    })
  },
  updateInvoiceList({dispatch}, {data, id}) {
    this.$axios.put('/api/v1/invoice/update', data).then(res => {
      this.$toast.success(res.data.message)
      dispatch('getInvoiceList', id)
    }).catch(res => {
      this.$toast.error(res.message)
    })
  },
  async updateInvoiceItem({dispatch}, {data, id}) {
    await this.$axios.put(`/api/v1/invoice-item/update`, data).then(res => {
      dispatch('getInvoiceItemList', id)
      this.$toast.success(res.data.message)
    }).catch(res => {
      this.$toast.error(res.message)
    })
  }
}
