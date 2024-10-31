export default function ({$axios, store, app, redirect, }) {
  $axios.onRequest((config) => {
    delete $axios.defaults.headers.common["Authorization"];
    if (store.state.token) {
      config.headers.common['token'] = `${store.state.token}`
      config.headers.common['Content-Type'] = 'application/json'
    }
  });
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      app.$auth.reset()
      app.$auth.$storage.removeUniversal('accessToken')
      app.$auth.$storage.removeUniversal('refreshToken')
      redirect('/login');
    }
    app.$toast.error(error.response.data.errorMessage);
  })
  $axios.onResponse((response)=>{
    if(response.data.data?.message){
      app.$toast.success(response.data.data.message);
    }
  })
}
