export const state = () => ( {
  shippingList: [],
  oneShipping: {},
  partnerLists: [],
  shippingNameList: [],
  shippingOperationList: [],
} );

export const getters = {
  shippingList: ( state ) => state.shippingList.content,
  shippingNameList: (state) => state.shippingNameList,
  totalElements: (state) => state.shippingList.totalElements,
  oneShipping: (state) => state.oneShipping,
  partnerLists: (state) => state.partnerLists,
  shippingOperationList: state => state.shippingOperationList,
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
  setShippingNameList(state, item) {
    state.shippingNameList = item
  },
  setShippingOperationList(state, item) {
    state.shippingOperationList = item
  }
};

export const actions = {
  async getShippingNameList({commit}, {page, size, clientName, invoiceNumber, status}) {
    const body = {
      invoiceNumber: '',
      clientName: clientName,
      shippingDate: '',
      page,
      size,
    }
    await this.$axios.$put(`/api/v1/shipping/list`, body)
      .then(res => {
        commit('setShippingNameList', res.data.content)
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
  async getShippingOperationList({commit}, id) {
    await this.$axios.$get(`/api/v1/shipping-operation/list?shippingId=${id}`)
      .then(res => {
        commit('setShippingOperationList', res.data);
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
