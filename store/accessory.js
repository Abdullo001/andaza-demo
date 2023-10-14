export const state = () => ({
  accessoryList: [],
  loading: true,
  modelName: [],
  accessoryData: {},
  newId: "",
  oneData: {},
});

export const getters = {
  loading: (state) => state.loading,
  accessoryList: (state) => state.accessoryList.content,
  totalElements: (state) => state.accessoryList.totalElements,
  modelData: (state) => state.modelName,
  accessoryData: (state) => state.accessoryData,
  newId: (state) => state.newId,
  oneData: (state) => state.oneData,
};

export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings;
  },
  setAccessoryList(state, accessoryLists) {
    state.accessoryList = accessoryLists;
  },
  setModelName(state, name) {
    state.modelName = name;
  },
  setAccessorData(state, data) {
    state.accessoryData = data;
  },
  setNewId(state, id) {
    state.newId = id;
  },
  setOneData(state, item) {
    state.oneData = item;
  },
};

export const actions = {
  async updatePlanningAccessory({ commit, dispatch }, data) {
    this.$axios
      .$put(`/api/v1/accessory-planning/update`, data)
      .then((res) => {
        commit("setAccessorData", res.data);
        dispatch("getOneAccessory", { id: data.id });

        this.$toast.success(res.data.message);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async createPlanningAccessory({ commit, dispatch }, data) {
    this.$axios
      .$post(`/api/v1/accessory-planning/create`, data)
      .then((res) => {
        commit("setAccessorData", res.data);
        dispatch("getOneAccessory", { id: res.data.id });
        commit("setNewId", res.data.id);
        console.log(res);
        this.$toast.success(res.message);
      })
      .catch(({ response }) => {
        console.log(response);
        this.$toast.error(response.data.message);
      });
  },
  async getOneAccessory({ commit }, { id }) {
    this.$axios
      .get(`/api/v1/accessory-planning/get-one?id=${id}`)
      .then((res) => {
        commit("setOneData", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async sortAccessory({ commit }, { data, page, size }) {
    const body = {
      filters: [],
      sorts: [
        {
          key: data.sortBy,
          direction: !data.sortDesc ? "DESC" : "ASC",
        },
      ],
      page: page,
      size: size,
    };
    await this.$axios
      .$put("/api/v1/accessory-planning/list", body)
      .then((res) => {
        commit("setAccessoryList", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async filterExpenseGroup({ commit }, data) {
    const body = {
      filters: [
        {
          key: "id",
          operator: "EQUAL",
          propertyType: "LONG",
          value: data.id,
        },
        {
          key: "name",
          operator: "LIKE",
          propertyType: "STRING",
          value: data.name,
        },
        {
          key: "createdAt",
          operator: "BETWEEN",
          propertyType: "DATE",
          value: data.createdAt,
          valueTo: data.updatedAt,
        },
      ],
      sorts: [],
      page: 0,
      size: 50,
    };
    body.filters = body.filters.filter(
      (item) => item.value !== "" && item.value !== null
    );
    await this.$axios
      .$put("/api/v1/accessory-planning/list", body)
      .then((res) => {
        commit("setAccessoryList", res.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async getModelName({ commit }, name) {
    const body = {
      filters: [
        {
          key: "modelNumber",
          operator: "LIKE",
          propertyType: "STRING",
          value: name,
        },
        {
          key: "status",
          operator: "EQUAL",
          propertyType: "STATUS",
          value: "ACTIVE",
        },
      ],
      sorts: [],
      page: 0,
      size: 10,
    };
    await this.$axios
      .$put(`/api/v1/models/list?partner=`, body)
      .then((res) => {
        commit("setModelName", res.data.content);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async getModelOrderInfo({ commit }, id) {
    await this.$axios
      .get(`/api/v1/accessory-planning/model-order-info?modelId=${id}`)
      .then((res) => {
        commit("setAccessorData", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async getAccessoryList({ commit }, { page, size }) {
    const body = {
      filters: [],
      sorts: [],
      page: page,
      size: size,
    };
    await this.$axios
      .$put("/api/v1/accessory-planning/list", body)
      .then((res) => {
        commit("setAccessoryList", res.data);
        commit("setLoading", false);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
};
