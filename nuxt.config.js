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

  plugins: [
    {src: '~/plugins/chart.js', mode: 'client'},
    {src: "~/plugins/axios.js"},
    {src: "~/plugins/mixins.js"},
    {src: "~/plugins/v-mask.js"},
    {src: "./plugins/element-io.js"}
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
    '@nuxtjs/pwa'
  ],
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
      navigateFallback: '/'
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
    parsePages: true
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
    baseURL: process.env.APP_ENV === 'PROD' ? 'https://atp.asgardia.uz' : 'https://dev-atp.asgardia.uz'
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
    timing: false
  }
}
