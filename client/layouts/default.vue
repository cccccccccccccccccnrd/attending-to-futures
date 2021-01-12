<template>
  <div class="site">
    <aside>
      <div>
        <div class="logo-container">
          <nuxt-link to="/">
            <logo/>
          </nuxt-link>
        </div>
        <nav>
          <nuxt-link to="/conference">Conference</nuxt-link>
          <nuxt-link to="/submissions">Call for submissions</nuxt-link>
          <nuxt-link to="/contact">Contact</nuxt-link>
        </nav>
        <div class="description">
          <p>A conference for design practitioners, researchers, educators, students, scholars, and activists, who engage in a political reprogramming of design!</p>
          <br>
          <p>Acknowledging the ways in which design (as practices, forms of knowledge, and sets of objects) is accountable for social and environmental injustice, ATTENDING [TO] FUTURES is a platform for critical perspectives that scrutinize unchallenged disciplinary norms and designerly ways of knowing, being, doing, and imagining in design education, research, and practice.</p>
        </div>
      </div>
      <no-ssr>
        <div class="stats-container">
          <stats/>
        </div>
      </no-ssr>
    </aside>
    <main>
      <news/>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Logo from '@/components/Logo.vue'
import Stats from '@/components/Stats.vue'
import Visual from '@/components/Visual.vue'
import News from '@/components/News.vue'

export default {
  components: {
    Logo,
    Stats,
    Visual,
    News
  },
  data () {
    return {}
  },
  async mounted () {
    const app = this
    this.init()

    this.socket.addEventListener('message', (message) => {
      const msg = JSON.parse(message.data)

      switch (msg.type) {
        case 'drag-init':
          Object.keys(msg.payload).map((key) => {
            app.position(msg.payload[key], true)
          })
          break
        case 'drag':
          if (this.$route.name === 'index') this.position(msg.payload)
          break
      }
    })
  },
  methods: {
    ...mapActions({
      init: 'socket/init'
    }),
    position (payload, show) {
      const element = document.querySelector(`#${payload.id}`)
      element.style.top = `${payload.top}px`
      element.style.left = `${payload.left}px`
    }
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      stats: 'stats/all'
    })
  }
}
</script>

<style>
/* @font-face {
  font-family: 'M';
  src: url('~assets/margueritegrotesk-regular-webfont.woff') format('woff');
  font-display: swap;
  font-weight: 300;
} */

@font-face {
  font-family: 'M';
  src: url('~assets/MargueriteGroteskvariabelGX.ttf') format('truetype');
  font-display: swap;
  font-weight: 300;
}

::-webkit-scrollbar {
  width: 0.75rem;
  height: 0.75rem;
  border-left: 1px solid black;
}

::-webkit-scrollbar-thumb {
  background: black;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'M', Arial, sans-serif;
  font-size: 20px;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background: silver;
}

a, a:visited {
  color: black;
  text-decoration: none;
}

p {
  margin: 0;
}

h1 {
  margin: 0;
  font-weight: normal;
  line-height: 1;
}

h2 {
  margin: 0;
  font-size: 1.5em;
  font-weight: normal;
  line-height: 1;
  color: blue;
}

button {
  width: 100%;
  padding: 0.6em 0.75em;
  background: none;
  border: 0;
  border-radius: 100px;
  text-transform: uppercase;
  font-size: 1em;
  color: silver;
  background: black;
  line-height: 1;
  cursor: pointer;
}

main {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
}

aside {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
  max-width: 375px;
  border-right: 1px solid black;
}

nav {
  padding: 1em;
}

nav a {
  display: block;
  line-height: 1.25;
}

nav a.nuxt-link-exact-active {
  color: blue;
}

.site {
  display: flex;
  width: 100%;
  height: 100vh;
}

.logo-container {
  padding: 1rem;
}

.scroll {
  overflow-y: scroll;
}

.stats-container {
  border-top: 1px solid black;
}

.description {
  padding: 1em;
}

.drag {
  max-width: 300px;
  z-index: 9999;
  cursor: grab;
}

.drag:active {
  cursor: grabbing;
}

.page {
  height: 100%;
  padding: 1rem;
  font-size: 1em;
  overflow-y: auto;
}
</style>
