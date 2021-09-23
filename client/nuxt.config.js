const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'ATTENDING [TO] FUTURES',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'title', name: 'title', content: 'ATTENDING [TO] FUTURES' },
      { hid: 'description', name: 'description', content: 'Matters of Politics in Design Education, Research, Practice. The design conference ATTENDING [TO] FUTURES will take place at Köln International School of Design of TH Köln (Cologne, Germany) on 18-20 November 2021.' },
      { hid: 'image', name: 'image', content: 'https://www.attendingtofutures.de/attending-to-futures-meta.jpg' },
      { hid: 'url', name: 'url', content: 'https://www.attendingtofutures.de' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/drag.js', ssr: false },
    { src: '~/plugins/vue-calendar.client.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
