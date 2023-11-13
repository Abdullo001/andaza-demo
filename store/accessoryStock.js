export const state = () => ( {
  accessoryStockList: [],
  partnerList: [],
  processDetails: [],
  partnerLists: [],
} );

export const getters = {
  accessoryStockList: ( state ) => state.accessoryStockList.content,
  partnerList: ( state ) => state.partnerList,
  partnerLists: ( state ) => state.partnerLists,
  processDetails: ( state ) => state.processDetails,
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

  setProcessDetails( state, item ) {
    state.processDetails = item;
  },

};

export const actions = {
  getAccessoryStockList( { commit }, { accessoryName, modelNumber, supplierName } ) {
    const body = {
      modelNumber: modelNumber,
      accessoryName: accessoryName,
      supplierName: supplierName,
      page: 0,
      size: 50,
    };
    this.$axios
      .put( `/api/v1/accessory-stock/list`, body )
      .then( ( res ) => {
        commit( "setAccessoryStockList", res.data.data );
      } )
      .catch( ( res ) => {
        console.log( res );
      } );
  },

  createAccessoryStock( { dispatch }, data ) {
    this.$axios.post( `/api/v1/accessory-stock/create`, data ).then( ( res ) => {
      this.$toast.success( res.data.message );
      dispatch( "getAccessoryStockList", {
        accessoryName: "",
        modelNumber: "",
        supplierName: "",
      } ).catch( ( res ) => {
        this.$toast.error( res.data.message );
      } );
    } );
  },

  getPartnerList( { commit }, id ) {
    this.$axios
      .get( `/api/v1/fabric-stocks/details-partners?warehouseId=${id}` )
      .then( ( res ) => {
        console.log( res.data.data );
        commit( "setPartnerList", res.data.data );
      } )
      .catch( ( res ) => {
        console.log( res );
      } );
  },

  updateAccessoryStock( { dispatch }, data ) {
    this.$axios
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

  getPartnerName( { commit }, name ) {
    const body = {
      filters: [],
      sorts: [],
      page: 0,
      size: 10,
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

  async getFabricProcessDetails( { commit }, { id, isForSubcontractor } ) {
    try {
      const response = await this.$axios.get( `/api/v1/fabric-stocks/process-details?modelId=${id}&isForSubcontractor=${isForSubcontractor}` );
      commit( "setProcessDetails", response.data.data );
    } catch ( error ) {
      if ( error.response && error.response.data ) {
        this.$toast.error( error.response.data.message );
      }
    }
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
