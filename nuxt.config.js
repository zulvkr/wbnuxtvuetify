import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s - wbchallenge',
    title: 'wbchallenge',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  env: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.URL // URL environment in Netlify
        : 'http://localhost:3000',
  },

  css: [],
  plugins: ['~/plugins/fragment.js'],
  components: true,
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', 'nuxt-webfontloader'],

  axios: {},

  vuetify: {
    treeShake: true,
    // Custom variables only works with tree shaking
    customVariables: ['~/assets/variables.scss'],
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
          success: colors.green.accent3,
        },
      },
    },
    defaultAssets: {
      font: {
        family: 'Google Sans',
      },
      icons: 'mdi',
    },
  },

  webfontloader: {
    // Load additional font
    google: {
      families: ['Roboto:400,500'],
    },
  },

  build: {
    transpile: ['fragment'],
  },
}
