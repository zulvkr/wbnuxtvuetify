import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s · Secret Deals · Wisatabook',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '64x64',
        href: '/favicon_64x64.png',
      },
      { rel: 'shortcut icon', href: '/favicon.ico' },
    ],
  },

  env: {
    baseURL: process.env.URL
      ? process.env.URL // URL environment in Netlify
      : 'http://localhost:3000',
  },

  css: [],
  plugins: ['~/plugins/fragment.js'],
  components: true,
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', 'nuxt-webfontloader'],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.URL,
  },

  vuetify: {
    // Custom variables only works with tree shaking.
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: '#757575',
          secondary: '#e367f6',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#1976D2',
          secondary: '#a11cb4',
          accent: '#757575',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
    defaultAssets: {
      font: {
        family: 'Google Sans',
      },
      icons: 'mdi',
    },
    treeShake: true,
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
