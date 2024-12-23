export const state = () => ({
  loading: true,
  listOfWorkers: [],
  selectedEmployeeInfo: [],
});
export const getters = {
  loading: (state) => state.loading,
  listOfWorkers: (state) => state.listOfWorkers.items,
  totalElements: (state) => state.listOfWorkers.totalElements,
  selectedEmployeeInfo: (state) => state.selectedEmployeeInfo,
};
export const mutations = {
  setLoading(state, loadings) {
    state.loading = loadings;
  },
  setListOfWorkers(state, data) {
    state.listOfWorkers = data;
  },
  setSelectedEmployeeInfo(state, data) {
    state.selectedEmployeeInfo = data;
  },
};
export const actions = {
  async getListOfWorkers({ commit },{ page, size, paymentType, firstName, lastName, phone }){
    paymentType = paymentType ?? "";
    firstName = firstName ?? "";
    lastName = lastName ?? "";
    phone = phone ?? "";
    commit("setLoading", true);
    await this.$axios
      .get(
        `/api/v1/employees?page=${page}&size=${size}&firstName=${firstName}&lastName=${lastName}&phone=${phone}&paymentType=${paymentType}`
      )
      .then((res) => {
        commit("setListOfWorkers", res.data.data);
        commit("setLoading", false);
      })
      .catch(({ response }) => {
        commit("setLoading", false);
        console.log(response);
      });
  },
  async createEmployee({ dispatch }, data) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);
    formData.append("birthDate", data.birthDate);
    formData.append("background", data.background);
    formData.append("address", data.address);
    formData.append("hiredDate", data.hiredDate);
    formData.append("speciality", data.speciality);
    formData.append("paymentType", data.paymentType);
    formData.append("employmentStatus", data.employmentStatus);
    formData.append("firedDate", data.firedDate);
    if (data.photo) {
      formData.append("photo", data.photo);
    }
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await this.$axios
      .post("/api/v1/employees", formData, config)
      .then((res) => {
        this.$toast.success(res.data.code);
        dispatch("getListOfWorkers", { page: 0, size: 10 });
      })
      .catch(({ response }) => {
        this.$toast.error(response.data.response);
        console.log(response);
      });
  },
  async getSelectedEmployee({ commit }, id) {
    await this.$axios
      .get(`/api/v1/employees/${id}`)
      .then((res) => {
        commit("setSelectedEmployeeInfo", res.data.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  async updateSelectedEmployee({ commit }, { id, data }) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);
    formData.append("birthDate", data.birthDate);
    formData.append("background", data.background);
    formData.append("address", data.address);
    formData.append("hiredDate", data.hiredDate);
    formData.append("speciality", data.speciality);
    formData.append("paymentType", data.paymentType);
    formData.append("employmentStatus", data.employmentStatus);
    if (!!data.firedDate) {
      formData.append("firedDate", data.firedDate);
    }
    if (!!data.photo) {
      formData.append("photo", data.photo);
    }
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    await this.$axios
      .put(`/api/v1/employees/${id}`, formData, config)
      .then((res) => {
        this.$toast.success(res.data.code);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
};
