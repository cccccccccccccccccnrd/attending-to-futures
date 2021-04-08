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
          <nuxt-link
            to="/conference"
            @click.native="handleNavClick"
          >
            Conference
          </nuxt-link>
          <nuxt-link
            to="/keynotes"
            @click.native="handleNavClick"
          >
            Keynotes
          </nuxt-link>
          <nuxt-link
            to="/lecture"
            @click.native="handleNavClick"
          >
            Lecture Series
          </nuxt-link>
          <nuxt-link
            to="/submissions"
            @click.native="handleNavClick"
          >
            Call for submissions
          </nuxt-link>
          <nuxt-link
            to="/tickets"
            @click.native="handleNavClick"
          >
            Tickets
          </nuxt-link>
          <nuxt-link
            to="/contact"
            @click.native="handleNavClick"
          >
            Contact
          </nuxt-link>

        </nav>
        <div class="description">
          <p>A conference for design practitioners, researchers, educators, students, scholars, and activists, who engage in a political reprogramming of design!</p>
          <br>
          <p>Acknowledging the ways in which design (as practices, forms of knowledge, and sets of objects) is accountable for social and environmental injustice, ATTENDING [TO] FUTURES is a platform for critical perspectives that scrutinize unchallenged disciplinary norms and designerly ways of knowing, being, doing, and imagining in design education, research, and practice.</p>
        </div>
        <div class="socials">
          <!-- <button class="inline">
            <a href="https://www.instagram.com/attendingtofutures/">info@attendingtofutures.de</a>
          </button> -->
          <button class="inline">
            <a href="https://www.instagram.com/attendingtofutures/" target="_blank">@attendingtofutures</a>
          </button>
          <!-- <button class="inline">
            <a href="https://www.instagram.com/attendingtofutures/" target="_blank">call-for-papers.pdf</a>
          </button> -->
        </div>
      </div>
      <div class="logo-container">
        <a href="https://kisd.de/" target="_blank">
          <img src="~/assets/kisd-th-logo.svg" style="max-width: 6em;"/>
        </a>
      </div>
      <!-- <div class="stats-container">
        <stats/>
      </div> -->
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
import Visual from '@/components/Visual.vue'
import News from '@/components/News.vue'

export default {
  components: {
    Logo,
    Visual,
    News
  },
  data () {
    return {}
  },
  async mounted () {
    const app = this
    this.socketInit()
    this.statsInit()

    this.socket.addEventListener('message', (message) => {
      const msg = JSON.parse(message.data)

      switch (msg.type) {
        case 'drag-init':
          Object.keys(msg.payload).map((key) => {
            console.log(msg.payload[key])
            app.position(msg.payload[key], true)
          })
          break
        case 'drag':
          this.position(msg.payload)
          break
      }
    })
  },
  methods: {
    ...mapActions({
      socketInit: 'socket/init',
      statsInit: 'stats/init'
    }),
    position (payload, show) {
      if (this.$route.name !== 'index') return
      const element = document.querySelector(`#${payload.id}`)
      element.style.top = `${payload.top}px`
      element.style.left = `${payload.left}px`
    },
    handleNavClick (event) {
      if (window.innerWidth >= 450) return

      setTimeout(() => {
        window.scroll({
          top: document.querySelector('main').offsetTop,
          behavior: 'smooth'
        })
      }, 100)
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
  border-left: 1px solid var(--dark-text-color);
}

::-webkit-scrollbar-thumb {
  background: var(--dark-text-color);
}

* {
  box-sizing: border-box;
}

html {
  --background-color: rgb(255, 255, 255);
  --dark-text-color: rgb(0, 0, 0);
  --highlight-text-color: rgb(0, 0, 0);
  --gradient-colors: rgb(139, 156, 130) 0%, rgb(197, 194, 86) 20%, rgb(210, 144, 98) 50%, rgb(19, 14, 241) 70%, rgb(3, 9, 73) 90%, rgb(3, 10, 50);
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'M', Arial, sans-serif;
  font-size: 18px;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background: var(--background-color);
  /* background: linear-gradient(0deg, rgba(223,210,172,1) 0%, rgba(221,89,107,1) 100%); */
  color: var(--dark-text-color);
}

a, a:visited {
  color: var(--dark-text-color);
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
  color: var(--highlight-text-color);
}

h3 {
  margin: 0;
  font-size: 1.2em;
  font-weight: normal;
  line-height: 1;
  color: var(--highlight-text-color);
}

button {
  width: 100%;
  padding: 0.5em 1em;
  background: none;
  border: 0;
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 1em;
  color: var(--dark-text-color);
  /* background: var(--dark-text-color); */
  border: 1px solid;
  line-height: 1;
  cursor: pointer;
}

button:hover {
  color: var(--background-color);
  background: var(--dark-text-color);
}

button.inline {
  display: table;
  width: initial;
  padding: 0.25em 0.5em;
  text-transform: none;
}

button.inline:hover a {
  color: var(--background-color);
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
  max-width: 330px;
  border-right: 1px solid var(--dark-text-color);
}

nav {
  padding: 1em;
}

nav a {
  display: block;
  margin-bottom: 0.25em;
  text-transform: uppercase;
  line-height: 1;
  /* background: linear-gradient(145deg, var(--gradient-colors));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-variation-settings: 'rond' 0;
  transition: font-variation-settings 800ms ease-in-out;
}

nav a:last-of-type {
  margin-bottom: 0;
}

nav a:hover {
  font-variation-settings: 'rond' 900;
}

nav a.nuxt-link-exact-active {
  /* font-size: 1.5em; */
  color: var(--highlight-text-color);
  font-variation-settings: 'rond' 900;
}

.no-padding-pls {
  padding: 0 !important;
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
  border-top: 1px solid var(--dark-text-color);
}

aside .description {
  padding: 1em;
  border-top: 1px solid var(--dark-text-color);
}

.socials {
  padding: 1em;
  border-top: 1px solid var(--dark-text-color);
}

.socials a {
  display: block;
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

.pill {
  width: fit-content;
  padding: 0.5em 1em;
  background: none;
  border-radius: 10px;
  font-size: 1em;
  color: var(--dark-text-color);
  /* background: var(--background-color); */
  border: 1px solid;
  line-height: 1;
}

.pill.invert {
  /* filter: invert(100); */
  color: var(--background-color);
  border-color: var(--dark-text-color);
  background: var(--dark-text-color);
}

@media screen and (max-width: 450px) {
  body {
    font-size: 14px;
  }

  .site {
    flex-flow: column nowrap;
    height: auto;
  }

  aside {
    max-width: initial;
    border-right: 0;
  }

  main {
    min-height: 100vh;
    border-top: 1px solid var(--dark-text-color);
  }

  nav a {
    display: table;
    margin-top: 0.5em;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid var(--dark-text-color);
    border-radius: 100px;
  }

  nav a:first-of-type {
    margin-top: 0;
  }

  nav a.nuxt-link-exact-active {
    border-color: var(--dark-text-color);
    color: white;
    background: var(--dark-text-color);
    box-shadow: 1em 1em 2em var(--highlight-text-color);
  }
}
</style>
