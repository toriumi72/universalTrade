// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui'],
  runtimeConfig: {
    public: {
      apiKey: "AIzaSyA1s-bvTfH_BqnGRZuvqysAVWjdGCEuN2I",
      authDomain: "univesaltrade-8928a.firebaseapp.com",
      projectId: "univesaltrade-8928a",
      storageBucket: "univesaltrade-8928a.appspot.com",
      messagingSenderId: "183691327405",
      appId: "1:183691327405:web:4d604284856b41f0c01324",
      measurementId: "G-BE83W5BE56"
    },
  },
  colorMode: {
    preference: 'light'
  },
  ui: {
    icons: 'all'
  },
  nitro: {
    preset: "firebase",
  }
})
