export const strict = false;

export const state = () => ({
  pageTitle: "",
  isAuth: false,
  token: "",
});

export const getters = {
  pageTitle: (state) => state.pageTitle,
  token: (state) => state.token,
};

export const mutations = {
  setPageTitle(state, title) {
    state.pageTitle = title;
  },
  setToken(state, token) {
    state.token = token;
  },
};
