export const state = () => ( {
  fabricStockList: [],
  partnerList: [],
  processDetails: [],
  partnerLists: [],
} );

export const getters = {
  fabricStockList: ( state ) => state.fabricStockList.content,
  partnerList: ( state ) => state.partnerList,
  partnerLists: ( state ) => state.partnerLists,
  processDetails: ( state ) => state.processDetails,
};

export const mutations = {
  setFabricStockList( state, item ) {
    state.fabricStockList = item;
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
  getFabricStockList( { commit }, { sipNumber, modelNumber, supplierName } ) {
    const body = {
      modelNumber: modelNumber,
      sipNumber: sipNumber,
      supplierName: supplierName,
      page: 0,
      size: 50,
    };
    this.$axios
      .put( `/api/v1/fabric-stocks/list`, body )
      .then( ( res ) => {
        commit( "setFabricStockList", res.data.data );
      } )
      .catch( ( res ) => {
        console.log( res );
      } );
  },

  createFabricStock( { dispatch }, data ) {
    this.$axios.post( `/api/v1/fabric-stocks/create`, data ).then( ( res ) => {
      this.$toast.success( res.data.message );
      dispatch( "getFabricStockList", {
        sipNumber: "",
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

  updateFabricStock( { dispatch }, data ) {
    this.$axios
      .put( `/api/v1/fabric-stocks/update`, data )
      .then( ( res ) => {
        this.$toast.success( res.data.message );
        dispatch( "getFabricStockList", {
          sipNumber: "",
          modelNumber: "",
          supplierName: "",
        } );
      } )
      .catch( ( res ) => {
        console.log( res );
        this.$toast.error( res.data.message );
      } );
  },

  deleteFabricStock( { dispatch }, id ) {
    this.$axios
      .delete( `/api/v1/fabric-stocks/delete?id=${id}` )
      .then( ( res ) => {
        this.$toast.success( res.data.message );
        dispatch( "getFabricStockList", {
          sipNumber: "",
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

  setFabricStockToWorkshop( { dispatch }, data ) {
    this.$axios
      .put( `/api/v1/fabric-stocks/give-own`, data )
      .then( ( res ) => {
        console.log( res );
        this.$toast.success( res.data.message );
        dispatch( "getFabricStockList", {
          sipNumber: "",
          modelNumber: "",
          supplierName: "",
        } );
      } )
      .catch( ( { response } ) => {
        console.log( response );
        this.$toast.error( response.data.message );
      } );
  },

  setFabricStockToSubcontract( { dispatch }, data ) {
    this.$axios
      .put( `/api/v1/fabric-stocks/give-subcontractor`, data )
      .then( ( res ) => {
        console.log( res );
        this.$toast.success( res.data.message );
        dispatch( "getFabricStockList", {
          sipNumber: "",
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
