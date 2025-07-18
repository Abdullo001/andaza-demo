export const state = () => ( {
  fabricStockList: [],
  partnerList: [],
  processDetails: [],
  partnerLists: [],
} );

export const getters = {
  fabricStockList: ( state ) => state.fabricStockList.items,
  totalElements: ( state ) => state.fabricStockList.totalElements,
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
  getFabricStockList( { commit }, { page, size, sipNumber="", modelNumber="", supplierName="",batchNumber="" } ) {
    modelNumber = modelNumber??"",
    sipNumber = sipNumber??"",
    supplierName = supplierName??"",
    batchNumber = batchNumber??"",

    this.$axios.get( `/api/v1/fabric-stocks?page=${page}&size=${size}&batchNumber=${batchNumber}&sipNumber=${sipNumber}&modelNumber=${modelNumber}&supplierName=${supplierName}`)
      .then( ( res ) => {
        commit( "setFabricStockList", res.data.data );
      } )
      .catch( ( res ) => {
        console.log( res );
      } );
  },

  createFabricStock( { dispatch }, data ) {
    this.$axios.post( `/api/v1/fabric-stocks`, data )
    .then( ( res ) => {
      dispatch( "getFabricStockList", {
        sipNumber: "",
        modelNumber: "",
        supplierName: "",
      })
    })
    .catch( ( res ) => {
      this.$toast.error( res.data.message );
    });
  },

  getPartnerList( { commit }, id ) {
    this.$axios
      .get( `/api/v1/fabric-stocks/details-partners?warehouseId=${id}` )
      .then( ( res ) => {
        commit( "setPartnerList", res.data.data );
      } )
      .catch( ( res ) => {
        console.log( res );
      } );
  },

  updateFabricStock( { dispatch }, {data,id} ) {
    this.$axios
      .put( `/api/v1/fabric-stocks/${id}`, data )
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
      .delete( `/api/v1/fabric-stocks/${id}` )
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
