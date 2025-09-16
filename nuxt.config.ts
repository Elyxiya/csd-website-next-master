import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt','nuxt-lottie'],//加
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  css: ['~/style/index.css', '~/assets/icon/iconfont.css'],
  components: ['~/views', '~/components'],
  runtimeConfig: {
    apiBase: 'http://enroll.csd.vin',
    apiToken: '0ab4bbbd36f39c9c2b408836b336dc11539671002aada9a1ac2ad9f72764d382bdcb1083d997f04a4ba21157ff5e9235d7a4d04a2fc93af67256edacd6198d8f5aa77e712f1da36619758d70b435a0b9a0d769abf5e87cccdeaf56b127b8ca4faf7956c41e56ca2e019177972c4ec31cf12a1946067038f8819666733d3a6aae',
    secretKey: '',
    public: {
      apiKey: '',
    },
  },
  build: {
    transpile: ['vue-toastification'],
  },
  nitro: {
    routeRules: {
      '/**': { headers: { 'X-Frame-Options': 'ALLOWALL'}}
    }
  }
})
