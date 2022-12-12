export default function ({ $axios, store }) {
  $axios.onRequest( (config) => {
      delete config.headers.common['Authorization']
      delete config.headers.common['authorization']
    if (store.state.token) {
      config.headers.common['token'] = `${store.state.token}`
    }
  })
}
