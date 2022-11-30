export const state = () => ({
  pageTitle: ''
})

export const getters = {
  pageTitle: state => state.pageTitle
}

export const mutations = {
  setPageTitle(state, title) {
    state.pageTitle = title
  }
}
