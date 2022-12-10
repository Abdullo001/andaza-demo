import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ATP - Mytex',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg', href: '/logo.svg' }
    ]
  },
  script: [
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "~/plugins/mixins.js"},
    {src: "~/plugins/v-mask.js"}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '~/assets/abstracts/_global.scss' // use underscore "_" & also file extension ".scss"
    ]
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "@nuxtjs/toast",
    ['@nuxtjs/auth']
  ],
  toast: {
    position: "bottom-center",
    duration: 4000,
    action:{
      text:'',
      onClick:(e,toastObject)=>{
        toastObject.goAway(0);
      }
    }
  },

  loading: { color: '#7631FF' },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://dev-atp.asgardia.uz'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/v1/auth/login', method: 'post', propertyName: 'response'},
          logout: { url: '/api/v1/auth/logout', method: 'post', propertyName: 'response'},
          user: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/user-management'
    }
  },
  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss', '~/assets/base.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || "0.0.0.0",
    timing: false
  }
}
