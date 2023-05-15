export const state = () => ({
  loading: true,
  catalog_list: [],
  catalog_one_list: [],
  catalogGroupId: "",
});
export const getters = {
  loading: state => state.loading,
  catalog_list: state => state.catalog_list.content,
  totalElements: state => state.catalog_list.totalElements,
  catalog_one_list: state => state.catalog_one_list,
  catalogGroupId: state => state.catalogGroupId,
};
export const mutations = {
  setLoading(state, loadings){
    state.loading = loadings
  },
  setCatalogsList(state, catalogList){
    state.catalog_list = catalogList
  },
  setCatalogOneList(state, catalogOneLists){
    state.catalog_one_list = catalogOneLists
  },
  setCatalogGroupId(state, id){
    state.catalogGroupId = id
  },
};
export const actions = {
  async createFabricCatalogs({commit}, data){
    await this.$axios.$post(`/api/v1/catalog-groups/create`, data)
      .then(res => {
        commit("setCatalogOneList", res.data);
        commit("setCatalogGroupId", res.data.id);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCatalogOneId({commit}, id){
    await this.$axios.get(`/api/v1/catalog-groups/get-one?id=${id}`)
      .then(res => {
        commit("setCatalogOneList", res.data.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCatalogGroupsList({commit}, {page, size}){
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/catalog-groups/list', body)
      .then(res => {
        commit("setCatalogsList", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async filterCatalogGroupsList({commit}, data){
    const { id, name, createdAt, updatedAt } = data;
    const body = {
      filters: [
        {
          key: "id",
          operator: 'EQUAL',
          propertyType: 'LONG',
          value: id,
        },
        {
          key: "groupName",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        },
        {
          key: 'createdAt',
          operator: 'BETWEEN',
          propertyType: 'DATE',
          value: createdAt,
          valueTo: updatedAt === null ? "" : updatedAt
        },
      ],
      sort: [],
      size: 10,
      page: 0,
    };
    body.filters = body.filters.filter(item => item.value !== '' && item.value !== null)
    await this.$axios.$put('/api/v1/catalog-groups/list', body)
      .then(res => {
        commit("setCatalogsList", res.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
