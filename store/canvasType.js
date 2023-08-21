export const state = () => ({
  loading: true,
  canvas_type_list: [],
});
export const getters = {
  loading: state => state.loading,
  canvas_type_list: state => state.canvas_type_list.content,
  totalElements: state => state.canvas_type_list.totalElements,
};
export const mutations = {
  setLoading(state, loadings){
    state.loading = loadings
  },
  setCanvasType(state, item) {
    state.canvas_type_list = item
  },
};
export const actions = {
  async deleteCanvasType({dispatch}, id){
    await this.$axios.$delete(`/api/v1/canvas-type/delete?id=${id}`)
      .then(res => {
        dispatch("getCanvasTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async updateCanvasType({dispatch}, data){
    await this.$axios.$put(`/api/v1/canvas-type/update`, data)
      .then(res => {
        dispatch("getCanvasTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async createCanvasType({dispatch}, data){
    await this.$axios.$post(`/api/v1/canvas-type/create`, data)
      .then(res => {
        dispatch("getCanvasTypeList", {page: 0, size: 10});
        this.$toast.success(res.message);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
  async getCanvasTypeList({commit}, {page, size}){
    const body = {
      filters: [],
      sorts: [],
      page,
      size,
    }
    await this.$axios.$put('/api/v1/canvas-type/list', body)
      .then(res => {
        commit("setCanvasType", res.data);
        commit("setLoading", false);
      })
      .catch(({response}) => {
        console.log(response)
        commit("setLoading", false);
      })
  },
  async filterCanvasTypeList({commit}, data){
    const {id, name, createdAt, updatedAt} = data;
    const body = {
      filters: [
        {
          key: "id",
          operator: "EQUAL",
          propertyType: "LONG",
          value: id,
        },
        {
          key: "name",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        },
        {
          key: "createdAt",
          operator: "BETWEEN",
          propertyType: "DATE",
          value: createdAt,
          valueTo: updatedAt,
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    }
    body.filters = body.filters.filter(
      (item) => item.value !== "" && item.value !== null
    );
    await this.$axios.$put('/api/v1/canvas-type/list', body)
      .then(res => {
        commit("setCanvasType", res.data);
      })
      .catch(({response}) => {
        console.log(response)
      })
  },
};
