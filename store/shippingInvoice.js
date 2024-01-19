export const state = () => ({
  shippingInvoiceList: [],
  shippingInvoiceItemList: [],
  isLoad: false,
})

export const getters = {
  shippingInvoiceList: state => state.shippingInvoiceList,
  shippingInvoiceItemList: state => state.shippingInvoiceItemList,
  isLoad: state => state.isLoad
}

export const mutations = {
  setInvoiceList(state, item) {
    state.shippingInvoiceList = item
  },
  setInvoiceItemList(state, item) {
    state.shippingInvoiceItemList = item
  },
  setIsLoad(state, load) {
    state.isLoad = load
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
  async generateInvoicePdf({commit}, data) {
    commit('setIsLoad', true)
    await this.$axios.$put('/api/v1/invoice/invoice-form', data).then(res => {
      const binaryCode = atob(res);
      const blob = new Blob(
        [new Uint8Array([...binaryCode].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("target", "_blank");
      a.setAttribute("href", objectUrl);
      a.click();
      commit('setIsLoad', false)
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
