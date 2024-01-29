export const state = () => ({
  packingList: [],
  isLoad:false,
})

export const getters = {
  packingList: state => state.packingList,
  isLoad: state => state.isLoad,
}

export const mutations = {
  setPackingList(state, item) {
    state.packingList = item
  },
  setIsLoad(state, bool) {
    state.isLoad = bool
  }
}

export const actions = {
  async getPackingList({commit}, id) {
    await this.$axios.$get(`/api/v1/packaging-list/list?shippingId=${id}`)
      .then(res => {
        commit('setPackingList', res.data);
      })
      .catch(({response}) => {
      })
  },
  async generatePackagingListPdf({commit},data) {
    commit("setIsLoad",true)
    await this.$axios.$put('/api/v1/packaging-list/packaging-list-form', data)
      .then(res => {
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
        commit("setIsLoad",false)
      }).catch(res => {
        console.log(res)
        commit("setIsLoad",false)
      })
  },
  postGenerateInvoice({dispatch}, {data, id}){
    this.$axios.$post('/api/v1/invoice/generate-invoice', data).then(res => {
      dispatch("getPackingList", id)
      this.$toast.success(res.message, {theme: 'toasted-primary'});
    }).catch(res => {
      this.$toast.error(res.data.message, {theme: 'toasted-primary'})
    })
  },
  async updatePackingList({commit, dispatch}, {data, id}) {
    this.$axios.$put('/api/v1/packaging-list/update', data)
      .then(res => {
        dispatch("getPackingList", id)
        this.$toast.success(res.message, {theme: 'toasted-primary'});
      }).catch(({response}) => {
      this.$toast.error(response.data.message, {theme: 'toasted-primary'})
    })
  },
  async setBoxQuantity({commit,dispatch}, {data, id}) {
    this.$axios.$put('/api/v1/packaging-list-item/set-box-quantity', data)
      .then(res => {
        dispatch("getPackingList",id)
        this.$toast.success(res.message, {theme: 'toasted-primary'})
      }).catch(({response}) => {
      this.$toast.error(response.data.message, {theme: 'toasted-primary'})
    })
  },
}
