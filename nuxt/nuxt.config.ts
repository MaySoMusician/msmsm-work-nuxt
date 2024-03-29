// import path from 'path'
// import fs from 'fs'
// import http from 'http'
import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
import {
  websiteName,
  websiteNameShort,
  websiteDescription,
} from './userModules/constants'
import firebaseConfig from './firebase.config'

const generateLazyFontLinkTags = (preconnect: string, url: string) => {
  return [
    { rel: 'preload', as: 'style', href: url },
    {
      rel: 'stylesheet',
      media: 'all',
      // onload: "this.media='all'",
      href: url,
    },
    { rel: 'preconnect', href: preconnect, crossOrigin: 'anonymous' },
  ]
}

const config: NuxtConfig = {
  // Change *source* directory (https://nuxtjs.org/api/configuration-srcdir/)
  // and *build* directory (https://nuxtjs.org/guides/directory-structure/nuxt/)
  // srcDir: '',
  buildDir: '.nuxt',
  // See *generate* property for *dist* directory

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',
  ssr: true,

  env: {
    APP_ENV: process.env.APP_ENV || 'development',
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    titleTemplate: `%s ｜ ${websiteName}`,
    title: websiteName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: websiteDescription },
      {
        hid: 'og:description',
        property: 'og:description',
        content: websiteDescription,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: websiteName },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://msmsm.work/ogp-image-1.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@MaySoMusician',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...generateLazyFontLinkTags(
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'
      ),
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '@/plugins/analytics.client.ts', mode: 'client' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/firebase',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dayjs',
    'cookie-universal-nuxt',
    [
      'nuxt-lazy-load',
      {
        native: false,
        directiveOnly: true,
        polyfill: false,
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        // dark: {
        //   primary: '#f61e20', // colors.blue.darken2,
        //   accent: colors.grey.darken3,
        //   secondary: colors.amber.darken3,
        //   anchor: '#00389e',
        //   info: colors.teal.lighten1,
        //   warning: colors.amber.base,
        //   error: colors.deepOrange.accent4,
        //   success: colors.green.accent3,
        // },
        light: {
          primary: '#f61e20', // colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: '#1E20F6', // colors.blue.darken2,
          anchor: '#00389e',
          info: colors.teal.lighten1,
          warning: colors.amber.darken4,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
      options: {
        customProperties: false,
        variations: true,
        minifyTheme: (css: string) =>
          css.replace(/\n/g, '').replace(/\s\s+/g, ' '),
      },
    },
    defaultAssets: {
      icons: false,
    },
    icons: {
      iconfont: 'mdiSvg',
    },
    treeShake: true,
  },

  // Firebase configuration (https://firebase.nuxtjs.org/guide/options)
  firebase: firebaseConfig,

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    // extend() {},
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },

  generate: {
    // https://nuxtjs.org/guides/directory-structure/dist
    dir: 'dist',
  },

  // https://github.com/nuxt-community/dayjs-module/blob/master/README.md#usage
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },

  pwa: {
    meta: {
      name: websiteName,
      description: websiteDescription,
      lang: 'ja',
      nativeUI: true,
    },
    manifest: {
      name: websiteName,
      short_name: websiteNameShort,
      description: websiteDescription,
      display: 'fullscreen',
      lang: 'ja',
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.gstatic.com/s/notosansjp/.*',
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/.*',
          handler: 'StaleWhileRevalidate',
        },
      ],
    },
  },

  router: {},
}

/* if (process.env.LOCALHOST_SSL) {
  // https://nuxtjs.org/api/configuration-server/#example-using-https-configuration
  // https://stackoverflow.com/a/57895543 (CC BY-SA 4.0)
  config.server = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../../server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../server.crt')),
    },
  }
} */

export default config
