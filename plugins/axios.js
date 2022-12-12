export default function ({ $axios, store }) {
  $axios.onRequest( (config) => {
      delete config.headers.common['Authorization']
      delete config.headers.common['authorization']
    if (store.state.token) {
      config.headers.common['token'] = `${store.state.token}`
      config.headers.common['device-id'] = `381b74b9-085f-46d4-a013-00180a4ccba7`
    }
  })
}
