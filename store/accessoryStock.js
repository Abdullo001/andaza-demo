export const state = () => ( {
  accessoryStockList: [],
  partnerList: [],
  partnerLists: [],
} );

export const getters = {
  accessoryStockList: ( state ) => state.accessoryStockList.content,
  partnerList: ( state ) => state.partnerList,
  partnerLists: ( state ) => state.partnerLists,
};

export const mutations = {
  setAccessoryStockList( state, item ) {
    state.accessoryStockList = item;
  },

  setPartnerList( state, item ) {
    state.partnerList = item;
  },

  setPartners( state, partner ) {
    state.partnerLists = partner;
  },
};

export const actions = {
  async getAccessoryStockList( { commit }, { accessoryName="", modelNumber="", supplierName="" } ) {
    const body = {
      accessoryName: accessoryName??"",
      modelNumber: modelNumber??"",
      page: 0,
      size: 50,
      supplierName: supplierName??"",
    };
    await this.$axios
      .put( `/api/v1/accessory-stock/list`, body )
      .then( ( res ) => {
        commit( "setAccessoryStockList", res.data.data );
      } )
      .catch( ( res ) => {
        console.log( "Get", res );
      } );
  },

  async createAccessoryStock( { dispatch }, { data } ) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }
    await this.$axios.post( '/api/v1/accessory-stock/create', data, config )
      .then( res => {
        dispatch( "getAccessoryStockList", {accessoryName:"", modelNumber:"", supplierName:""} );
        this.$toast.success( res.message );
      } )
      .catch( ( {response} ) => {
        console.log( response )
        this.$toast.error( response.data.message )
      } )
  },

  getPartnerName( { commit }, name ) {
    const body = {
      filters: [],
      sorts: [],
      size: 100,
      page: 0,
    };

    body.filters = body.filters.filter(
      ( item ) => item.value !== "" && item.value !== null
    );
    this.$axios
      .$put( "/api/v1/partner/list", body )
      .then( ( res ) => {
        commit( "setPartners", res.data.content );
      } )
      .catch( ( { response } ) => console.log( response ) );
  },

  async updateAccessoryStock( { dispatch }, { data } ) {
    await this.$axios
      .put( `/api/v1/accessory-stock/update`, data )
      .then( ( res ) => {
        this.$toast.success( res.data.message );
        dispatch( "getAccessoryStockList", {
          accessoryName: "",
          modelNumber: "",
          supplierName: "",
        } );
      } )
      .catch( ( res ) => {
        console.log( res );
        this.$toast.error( res.data.message );
      } );
  },

  deleteAccessoryStock( { dispatch }, id ) {
    this.$axios
      .delete( `/api/v1/accessory-stock/delete?id=${id}` )
      .then( ( res ) => {
        this.$toast.success( res.data.message );
        dispatch( "getAccessoryStockList", {
          accessoryName: "",
          modelNumber: "",
          supplierName: "",
        } );
      } )
      .catch( ( res ) => {
        console.log( res );
        this.$toast.error( res.data.message );
      } );
  },

  setAccessoryStockToWorkshop( { dispatch }, data ) {
    this.$axios
      .put( `/api/v1/accessory-stock/give-own`, data )
      .then( ( res ) => {
        console.log( res );
        this.$toast.success( res.data.message );
        dispatch( "getAccessoryStockList", {
          accessoryName: "",
          modelNumber: "",
          supplierName: "",
        } );
      } )
      .catch( ( { response } ) => {
        console.log( response );
        this.$toast.error( response.data.message );
      } );
  },

  setAccessoryStockToSubcontract( { dispatch }, data ) {
    this.$axios
      .put( `/api/v1/accessory-stock/give-subcontractor`, data )
      .then( ( res ) => {
        console.log( res );
        this.$toast.success( res.data.message );
        dispatch( "getAccessoryStockList", {
          accessoryName: "",
          modelNumber: "",
          supplierName: "",
        } );
      } )
      .catch( ( { response } ) => {
        console.log( response );
        this.$toast.error( response.data.message );
      } );
  },
};
