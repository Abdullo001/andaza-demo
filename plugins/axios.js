export default function ({ $axios, store }) {
  $axios.onRequest( (config) => {
    delete $axios.defaults.headers.common["Authorization"];
    if (store.state.token) {
      config.headers.common['token'] = `${store.state.token}`
      config.headers.common['device-id'] = `381b74b9-085f-46d4-a013-00180a4ccba7`
    }
  })
}
