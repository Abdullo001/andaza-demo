export const state = () => ({
  warehouseCode: []
});
export const getters = {};
export const mutations = {};
export const actions = {
  getWarehouseCodeList({commit}, {name, code}) {
    const body = {
      filters: [
        {
          key: 'name',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: name
        },
        {
          key: 'code',
          operator: 'LIKE',
          propertyType: 'STRING',
          value: code
        },
      ],
      sorts: [],
      page: 0,
      size: 10
    }
    body.filters(el => el.value)
  }
};
