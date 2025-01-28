import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    title: 'Andaza',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/svg', href: '/andaza-a.svg'}
    ]
  },
  script: [],

  css: [],
  ssr:false,

  plugins: [
    { src: '~/plugins/quill-editor.js', mode: 'client' },
    {src: '~/plugins/chart.js', mode: 'client'},
    {src: '~/plugins/vue-apexchart.js', mode: 'client'},
    {src: "~/plugins/axios.js"},
    {src: "~/plugins/mixins.js"},
    {src: "~/plugins/v-mask.js"},
    {src: "./plugins/element-io.js"},
    {src: '~/plugins/timeElapsed.js'},
    {src: '~/plugins/dateToISO.js'},
    {src: '~/plugins/clipboard.js'},
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],
  styleResources: {
    scss: [
      '~/assets/abstracts/_global.scss'
    ]
  },
  modules: [
    '@nuxtjs/axios',
    "@nuxtjs/toast",
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/pwa',
  ],

  firebase: {
    lazy: true,
    config: {
      apiKey: "AIzaSyBBTwVdvR26nnycC2IaaAV5uD0sDU34XU0",
      authDomain: "andaza-d9c48.firebaseapp.com",
      projectId: "andaza-d9c48",
      storageBucket: "andaza-d9c48.appspot.com",
      messagingSenderId: "613085841293",
      appId: "1:613085841293:web:ddd54438996b3ff6db9fc4",
      measurementId: "G-8KCZDLR1W2"
    },
    onFirebaseHosting: false,
    services: {
      messaging: true,
    }
  },


  messaging: {
    createServiceWorker: true,
    actions: [
      {
        action: 'goHome',
        url: 'https://localhost:8000'
      }
    ],
    fcmPublicVapidKey: "BMMSXnJHVcOkKOQgbdszWNf7GnQZF27_Et_FJWmBFwsO59Yx4MvDth-dSLiN-_MKBPwyrwnoM5An1NdiX9H0e4o"
  },

  pwa: {
    manifest: {
      name: 'Andaza',
      short_name: 'Andaza',
      lang: 'en',
      display: 'standalone',
      description: ' Andaza',
      useWebmanifestExtension: false,
      icons: [
        {
          src: '/andaza-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/andaza-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: '/andaza-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/andaza-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      importScripts: [
        '/static/firebase-messaging-sw.js'
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  i18n: {
    useCookie: false,
    alwaysRedirect: true,
    detectBrowserLanguage: false,
    locales: [
      {
        code: "ru",
        iso: "ru-RU",
        name: "Russian",
        file: "ru/index.js",
        icon: "/ru.svg",
        title: "Ru"
      },
      {
        code: "uz",
        iso: "uz-UZ",
        name: "O'zbek",
        file: "uz/index.js",
        icon: "/uz.svg",
        title: "Uz"
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en/index.js",
        icon: "/en.svg",
        title: "En"
      }
    ],
    lazy: true,
    seo: true,
    langDir: "locales/",
    strategy: 'prefix_except_default',
    defaultLocale: "en",
    parsePages: false
  },

  toast: {
    position: "bottom-center",
    duration: 5000,
    theme: "toasted-primary",
    action: {
      text: '',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  },

  loading: false,
  axios: {
    baseURL: process.env.APP_ENV === 'PROD' ? process.env.BACKEND_URL : 'https://dev-atp.asgardia.uz'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/api/v1/auth/login', method: 'post', propertyName: 'response'},
          logout: {url: '/api/v1/auth/logout', method: 'post', propertyName: 'response'},
          user: false
        },
        tokenRequired: false,
        globalToken: false,
        tokenType: false
      }
    },
    token: {
      prefix: 'token',
      global: true
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/user-management'
    }
  },
  router: {
    middleware: ['auth', 'isAuth']
  },

  vuetify: {
    treeShake: true,
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

  build: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {}
      }
    },
    transpile: [
      'defu',
      'vue-phone-number-input'
    ],
    babel: {
      compact: true
    }
  },
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || "0.0.0.0",
    timing: false,
    compression: true
  }
}
