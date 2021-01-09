<template>
  <div class="site">
    <aside>
      <div>
        <div class="logo-container">
          <logo/>
        </div>
        <nav>
          <a href="#">Conference</a>
          <a href="#">Program</a>
          <a href="#">Tickets</a>
          <a href="#">Contact</a>
        </nav>
        <div class="description">
          <p>The conference Attending [to] Futures examines the ambivalent role and responsibility of design as world-making at a moment in which the world »is presented in crisis« (Ghosn, Jazairy). Acknowledging the ways in which design (as practices, forms of knowledge, and sets of objects) is accountable for social and environmental injustice, the conference invites critical perspectives that scrutinize unchallenged disciplinary norms and dominant ways of knowing, being, doing, and imagining in design education, research, and practice. Drawing on current de-/anti-colonial, post-humanist, queer-feminist and disability discourses, the conference attempts a political reprogramming of design in order to generate transformative perspectives on design education, research, and practice.</p>
        </div>
      </div>
      <no-ssr>
        <div class="stats-container">
          <!-- <visual/> -->
          <stats/>
        </div>
      </no-ssr>
    </aside>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Logo from '@/components/Logo.vue'
import Stats from '@/components/Stats.vue'
import Visual from '@/components/Visual.vue'

export default {
  components: {
    Logo,
    Stats,
    Visual
  },
  data () {
    return {}
  },
  mounted () {
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
          this.position(msg.payload)
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
      if (show) element.style.opacity = 1
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
  width: 0.75em;
  height: 0.75em;
  /* border-right: 1px solid black; */
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
  font-size: 16px;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
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
  font-size: 5vw;
  font-weight: normal;
  line-height: 1;
}

button {
  width: 100%;
  padding: 0.6em 0.75em;
  background: none;
  border: 0;
  border-radius: 100px;
  text-transform: uppercase;
  font-size: 1em;
  color: white;
  background: black;
  /*border: 1px solid black;*/
  /* box-shadow: 0.5em 0.5em 0.75em rgba(0, 0, 0, 0.15); */
  cursor: pointer;
  /* transition: 100ms all ease-in-out; */
}

button:hover {
  background: black;
  color: white;
}

.site {
  display: flex;
  width: 100%;
  height: 100vh;
}

.logo-container {
  padding: 1em;
}

aside {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  border-right: 1px solid black;
}

.scroll {
  overflow-y: scroll;
}

nav {
  padding: 1em;
}

nav a {
  display: block;
  line-height: 1.25;
  text-decoration: line-through;
}

main {
  position: relative;
  width: 100%;
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
</style>
