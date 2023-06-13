export default function ({ $axios, store, app, redirect }) {
  $axios.onRequest( (config) => {
    delete $axios.defaults.headers.common["Authorization"];
    if (store.state.token) {
      config.headers.common['token'] = `${store.state.token}`
      config.headers.common['Content-Type'] = 'application/json'
    }
  });
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if(code) {
      if(code === 401) {
        console.log(store.$axios);
        redirect('/login');
      }
    }
  })
}
