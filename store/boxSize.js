export const state = () => ( {
  loading: true,
  boxSizeList: [],
} );

export const getters = {
  loading: state => state.loading,
  boxSizeList: state => state.boxSizeList.items,
  totalElements: state => state.boxSizeList.totalElements,
};

export const mutations = {
  setLoading( state, loadings ) {
    state.loading = loadings
  },
  setBoxSizeList( state, item ) {
    state.boxSizeList = item
  },
};
export const actions = {
  async deleteBoxSize( { dispatch }, { id } ) {
    await this.$axios.$delete( `/api/v1/box-sizes/${id}` )
      .then( res => {
        dispatch( "getBoxSizeList", { page: 0, size: 10 } );
        this.$toast.success( res.data.message );
        
      } )
      .catch( ( { response } ) => {
        console.log( response )
      } )
  },
  async updateBoxSize( { dispatch }, {data,id} ) {
    await this.$axios.put( `/api/v1/box-sizes/${id}`, data )
      .then( res => {
        dispatch( "getBoxSizeList", { page: 0, size: 10 } );
        this.$toast.success( res.data.code );
      } )
      .catch( ( { response } ) => {
        console.log( response )
      } )
  },
  async createBoxSize( { dispatch }, data ) {
    await this.$axios.post( `/api/v1/box-sizes`, data )
      .then( res => {
        dispatch( "getBoxSizeList", { page: 0, size: 10 } );
        this.$toast.success( res.data.code );
      } )
      .catch( ( { response } ) => {
        console.log( response )
      } )
  },

  async getBoxSizeList( { commit }, { page, size,cbm="",boxSize=""} ) {
    cbm=cbm??""
    boxSize=boxSize??""
    await this.$axios.get( `/api/v1/box-sizes?size=${size}&page=${page}&cbm=${cbm}&boxSize=${boxSize}` )
      .then( res => {
        commit( "setBoxSizeList", res.data.data );
        commit( "setLoading", false );
      } )
      .catch( ( { response } ) => {
        console.log( response )
        commit( "setLoading", false );
      } )
  },

  async filterBoxSizeData( { commit }, data ) {
    const body = {
      filters: [
        {
          "key": "isActive",
          "operator": "EQUAL",
          "propertyType": "BOOLEAN",
          "value": true
        },
        {
          key: 'size',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: data.size
        },
        {
          key: 'cbm',
          operator: 'EQUAL',
          propertyType: 'BIG_DECIMAL',
          value: data.cbm
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: data.createdAt,
          valueTo: data.updatedAt
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter( item => item.value !== '' && item.value !== null )
    await this.$axios.$put( '/api/v1/box-sizes/list', body )
      .then( res => {
        commit( 'setBoxSizeList', res.data )
      } )
      .catch( ( { response } ) => {
        console.log(response.data)
      } )
  },
};
