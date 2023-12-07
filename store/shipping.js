export const state = () => ( {
  shippingList: [],
  oneShipping: {},
  partnerLists: [],
  shippingInvoiceList: [],
} );

export const getters = {
  shippingList: ( state ) => state.shippingList.content,
  shippingInvoiceList: (state) => state.shippingInvoiceList,
  totalElements: (state) => state.shippingList.totalElements,
  oneShipping: (state) => state.oneShipping,
  partnerLists: (state) => state.partnerLists,
};

export const mutations = {
  setShippingList(state, item) {
    state.shippingList = item;
  },
  setOneShipping(state, details) {
    state.oneShipping = details;
  },
  setShippingId(state, id) {
    state.buyerId = id;
  },
  setPartners(state, partner) {
    state.partnerLists = partner;
  },
  setShippingInvoiceList(state, item) {
    state.shippingInvoiceList = item
  },
};

export const actions = {
  async getShippingInvoiceList({commit}, {page, size, invoiceNumber}) {
    const body = {
      invoiceNumber: invoiceNumber,
      clientName: '',
      shippingDate: '',
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/shipping/list`, body)
      .then(res => {
        commit('setShippingInvoiceList', res.data.content)
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  async getShippingList( { commit }, { clientName, invoiceNumber, shippingDate } ) {
    const body = {
      clientName: clientName,
      invoiceNumber: invoiceNumber,
      shippingDate: shippingDate,
      page: 0,
      size: 50
    }
    await this.$axios.put(`/api/v1/shipping/list`, body).then((res) => {
      console.log(res);
      commit("setShippingList",res.data.data)

    }).catch((res) => {
      console.log("Get", res)
    })
  },

  createShipping( { dispatch }, data ) {
    const shipping = {
      buyerId: data.buyerId.id,
      countryId: data.countryId.id,
      invoiceDate: data.invoiceDate,
      invoiceNumber: data.invoiceNumber,
      manufacturerId: data.manufacturerId.id,
      receiverId: data.receiverId.id,
      sellerId: data.sellerId.id,
      senderId: data.senderId.id
    }
    this.$axios.post(`/api/v1/shipping/create`, shipping).then((res) => {
      this.$toast.success(res.data.message);
      dispatch("getShippingList", {
        clientName: "",
        invoiceNumber: "",
        shippingDate: "",
        page: 0,
        size: 10
      });
  }).catch((res) => {
      this.$toast.error(res.data.message);
      console.log(res)
    })
  },
  async updateShipping({commit}, data) {
    const shipping = {
      buyerId: data.buyerId.id,
      countryId: data.countryId.id,
      id: data.id,
      invoiceDate: data.invoiceDate,
      invoiceNumber: data.invoiceNumber,
      manufacturerId: data.manufacturerId.id,
      receiverId: data.receiverId.id,
      sellerId: data.sellerId.id,
      senderId: data.senderId.id
    }
    this.$axios.$put('/api/v1/shipping/update', shipping)
      .then(res => {
        this.$toast.success(res.message, {theme: 'toasted-primary'});
      }).catch(({response}) => {
      console.log(response);
      this.$toast.error(response.data.message, {theme: 'toasted-primary'})
    })
  },
  async getOneShipping({commit}, id) {
    await this.$axios.$get(`/api/v1/shipping/get?id=${id}`)
      .then(res => {
        commit('setOneShipping', res.data);
      })
      .catch(({response}) => {
        console.log(response);
      })
  },
  getPartnerName({ commit }, name) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 100,
    };

    this.$axios
      .$put("/api/v1/partner/list", body)
      .then((res) => {
        commit("setPartners", res.data.content);
      })
      .catch(({ response }) => console.log(response));
  },
};
