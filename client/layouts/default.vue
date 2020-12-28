<template>
  <div class="site">
    <aside>
      <div class="scroll">
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
          <p>Pandemics and climate catastrophes expose
            various crises of increasingly interdependent
            and complex global systems, while rendering the
            future radically uncertain (Isabelle Stengers)
            and more unknowable than it may have been in
            the past. Currently we are looking for papers.</p>
            <br>
            <button>Call for Papers</button>
            <br>
            <br>
            <br>
            <br>
            <p>Pandemics and climate catastrophes expose
            various crises of increasingly interdependent
            and complex global systems, while rendering the
            future radically uncertain (Isabelle Stengers)
            and more unknowable than it may have been in
            the past. The conference Attending [to] Futures
            examines the ambivalent role and responsibility of
            design as world-making at a moment in which the
            world »is presented in crisis« (Ghosn, Jazairy).
            Acknowledging the ways in which design (as
            practices, forms of knowledge, and sets of objects) is accountable for social and environmental
            injustice, the conference invites critical perspectives that scrutinize unchallenged disciplinary
            norms and dominant ways of knowing, being, doing, and imagining in design education, research,
            and practice. Currently we are looking for papers.</p>
            <br>
            <p>How are design practices embedded in sociopolitical contexts and hegemonic power structures and how do they (re-)produce exclusion?
            How can persistent structures of systemic
            oppression and privilege in design be recognized
            and changed? How can approaches for the invention and constitution of future worlds be developed without perpetuating pejorative constructions of race, class, gender and ability?
            Drawing on current de/anti-colonial, post-humanist, queer-feminist and dis/ability discourses,
            the conference attempts a political reprogramming of design in order to generate transformative
            perspectives on design education, research, and
            practice.</p></div>
      </div>
        <div class="stats-container">
          <stats/>
        </div>
    </aside>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/Logo.vue'
import Stats from '@/components/Stats.vue'

export default {
  components: {
    Logo,
    Stats
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      stats: 'stats/all'
    })
  }
}
</script>

<style>
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
  font-family: Arial, sans-serif;
  font-size: 16px;
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
  font-size: 8vw;
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
  font-size: 0.7em;
  /* border: 1px solid black; */
  box-shadow: 0.5em 0.5em 0.75em rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: 100ms all ease-in-out;
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
  line-height: 1.5;
}

main {
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
}

.stats-container {
  padding: 1em;
  border-top: 1px solid black;
}

.description {
  padding: 1em;
}
</style>
