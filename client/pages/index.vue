<template>
  <div>
    <marquee>NOV 18—20, 2021 · CONTESTED HISTORIES · RADICAL FUTURES · CRITICAL PRACTICES · NOV 18—20, 2021 · CONTESTED HISTORIES · RADICAL FUTURES · CRITICAL PRACTICES · NOV 18—20, 2021 · CONTESTED HISTORIES · RADICAL FUTURES · CRITICAL PRACTICES</marquee>
    <section>
      <h1
        v-for="(term, index) in terms"
        :key="`headline-${index}`"
        :style="`font-variation-settings: 'angl' ${stats.mouseX}, 'rond' ${stats.clicks * 50};`"
      >
        {{ term[0] }}
      </h1>
      <!-- <img
        v-drag="onDrag"
        style="opacity: 1"
        id="assetdd-1"
        src="~/assets/design-is-a-service.png"
        class="drag"
      > -->
      <window
        v-for="(box, index) in windows"
        :key="`windows-xp-${index}`"
        :id="`windows-xp-${index}`"
        :title="box.title"
        :content="box.content"
        :width="box.width"
        v-drag="onDrag"
        class="drag"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Window from '@/components/Window.vue'

export default {
  components: {
    Window
  },
  data () {
    return {
      terms: Array.apply(null, Array(7)).map((e) => ['attending to', 'futures']),
      index: 0,
      windows: [/* {
        title: 'About the conference',
        content: 'The conference Attending [to] Futures examines the ambivalent role and responsibility of design as world-making at a moment in which the world »is presented in crisis« (Ghosn, Jazairy). Acknowledging the ways in which design (as practices, forms of knowledge, and sets of objects) is accountable for social and environmental injustice, the conference invites critical perspectives that scrutinize unchallenged disciplinary norms and dominant ways of knowing, being, doing, and imagining in design education, research, and practice. Drawing on current de-/anti-colonial, post-humanist, queer-feminist and disability discourses, the conference attempts a political reprogramming of design in order to generate transformative perspectives on design education, research, and practice.',
        width: 600
      }, */ {
        title: 'Call for papers',
        content: 'We are currently looking for abstracts and interesting speakers for the conference. Feel free to contact us. <br/> <br/> <a href="/attending-to-futures-cfp.pdf" target="_blank"><button>Get it</button></a>',
        width: 400
      }, {
        title: 'Contested Histories — Unlearning',
        content: 'The first panel critically revises and problematizes the eurocentric, patriarchal, colonial, environmentally untenable, and capitalist traditions in which design is embedded and calls for an »unlearning« (Gayatri Spivak) of discriminatory, exclusive, oppressive, and »defuturing« (Toni Fry) codes and design practices that came into being because of them. The aim of this panel is to expose normative definitions of design, design epistemologies, and established ways of learning in order to understand ›why we design, what we design‹ (loosely based on Mary Lawhon) and to recognize how design produces inequality and subjugation.',
        width: 600
      }, {
        title: 'Radical Futures — Attending [to]',
        content: 'The second panel considers design’s inherent demand to explore, test, and produce material-discursive configurations that do not (yet) exist (Séverine Marguin et al.) in order to imagine and constitute radically different worlds and form the basis of future design (Daniel Gethmann et al.). Through this lens, the future is addressed as a present »space of becoming« inclusive, empathetic, just, and sustainable (Bill Ashcroft). Designing the future means both attending, i.e. active participation in, and attending to, i.e. taking responsibility and care for, creative ways of living together with people, things, animals, and plants. All future-making strategies require asking whether designs of new possible worlds leave social, political, and economical power structures untouched or whether they undermine and change them',
        width: 600
      }, {
        title: 'Critical Practices — Leading Out',
        content: 'The third panel proceeds from the etymology of education: latin ›educare‹ not as ›e-ducere‹ - i.e. ›leading someone to something‹ - but as ›ex-ducere‹, ›leading someone out‹ of the familiar (Tim Ingold). Attention to the constitutive conditions of design requires a reckoning with a multiplicity of actors and contexts, from institutional norms and regulations, to pedagogies, curricula, materials, architectural environments, and discursive protocols. This panel therefore focuses on and calls for the transformation of everything that helps bring design into being: physical and digital tools, as well as their material infrastructures and legitimating disciplinary narratives. ',
        width: 600
      }]
    }
  },
  mounted () {
    setInterval(() => {
      this.terms[this.index] = this.terms[this.index].reverse()
      if (this.index < this.terms.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
    }, 100)
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      stats: 'stats/all'
    })
  },
  methods: {
    ...mapActions({
      send: 'socket/send',
    }),
    ...mapMutations({
      setElement: 'drags/setElement',
    }),
    onDrag (event) {
      this.send(['drag', event])
    }
  }
}
</script>

<style scoped>
h1 {
  text-transform: uppercase;
  user-select: None;
}

marquee {
  padding: 0.35em 0;
  font-size: 1.5em;
  border-bottom: 1px solid black;
}

section {
  padding: 1em;
}
</style>
