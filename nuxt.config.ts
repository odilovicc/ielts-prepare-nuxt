import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  css: ["~/assets/global.css", 'primeicons/primeicons.css'],
  runtimeConfig: {
    apiKey: process.env.NUXT_FIREBASE_APIKEY,
    authDomain: process.env.NUXT_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NUXT_FIREBASE_PROJECTID,
    storageBucket: process.env.NUXT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NUXT_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NUXT_FIREBASE_APPID
  },
  // Primevue
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
          }
        }
      }
    }
  },
  // Tailwindcss
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // Nitro
  nitro: {
    prerender: {
      routes: ["/dashboard"]
    }
  },
  modules: ["@nuxt/content", "@nuxt/image", '@primevue/nuxt-module', '@pinia/nuxt'],
})
