export default function ({ $axios, store }) {
  $axios.onRequest( (config) => {
    if (store.state.token) {
      delete config.headers.common['Authorization']
      config.headers.common['token'] = `${store.state.token}`
    }
  })
}
