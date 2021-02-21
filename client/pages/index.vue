<template>
  <div class="page page-index">
    <h1
      v-for="(term, index) in terms"
      :key="`headline-${index}`"
      :style="`font-variation-settings: 'rond' ${rond}, 'angl' ${stats.clicks * 30};`"
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
      :type="box.type"
      :title="box.title"
      :content="box.content"
      :width="box.width"
      :opened="box.open"
      v-drag="onDrag"
      class="drag"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Window from '@/components/Window.vue'
import News from '@/components/News.vue'

export default {
  components: {
    Window,
    News
  },
  data () {
    return {
      terms: Array.apply(null, Array(1)).map((e) => ['Matters of Politics in Design Education, Research, Practice', 'apply now']),
      index: 0,
      windows: [{
        type: 'standard',
        title: 'Call for Submissions',
        content: 'Join our conference as a speaker! We accept and encourage submissions of different formats and diverse approaches. Apply until April 05, 2021.<br/><br/><a href="/attending-to-futures-cfp.pdf" target="_blank"><button>Download pdf</button></a>',
        width: 400,
        open: false
      }/* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Mindy Seu</div></div>',
        content: {
          name: 'Mindy <br> Seu',
          description: '<p><a href="https://www.mindyseu.com/" target="_blank">Mindy Seu</a> <a href="https://www.instagram.com/mindyseu/" target="_blank">@mindyseu</a> is a designer, researcher and Assistant Prof. at Rutgers Mason School of the Arts, New Brunswick, and Yale School of Art, New Haven.</p>',
          image: 'mindy-seu.jpg'
        },
        width: 800,
        open: true
      } *//* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Lisa Baumgarten & Imad Gebrayel</div></div>',
        content: {
          name: 'Lisa & <br> Imad',
          description: '<p><a href="https://lisabaumgarten.de/Info" target="_blank">Lisa Baumgarten</a> <a href="https://www.instagram.com/lis.baum/" target="_blank">@lis.baum</a> is a Designer, Researcher and Lecturer. She currently offers seminars in design history and practice at UdK Berlin, HfK Bremen, and HTW Berlin. <a href="https://www.imadgebrayel.com/" target="_blank">Imad Gebrayel</a> <a href="https://www.instagram.com/imadgebrayel/" target="_blank">@imadgebrayel</a> is a Designer, Ph.D candidate in European Ethnology at HU Berlin, and lecturer at UdK Berlin, HfK Bremen, and design Akademie Berlin.</p>',
          image: 'baumgarten-gebrayel.jpg'
        },
        width: 900,
        open: true
      } *//* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Dr. Luiza Prado de O. Martins</div></div>',
        content: {
          name: 'Dr. Luiza Prado <br> de O. Martins',
          description: '<p><a href="https://www.luiza-prado.com/" target="_blank">Dr. Luiza Prado de O. Martins</a> <a href="https://www.instagram.com/luizap/" target="_blank">@luizap</a> is an artist, writer, and researcher whose work examines themes around fertility, reproduction, coloniality, gender, and race.</p>',
          image: 'luiza-prado.jpg'
        },
        width: 900,
        open: true
      } */, {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Danah Abdulla</div></div>',
        content: {
          name: 'Danah <br> Abdulla',
          description: '<p><a href="https://www.dabdulla.com/" target="_blank">Danah Abdulla</a> <a href="https://www.instagram.com/danah.abdulla/" target="_blank">@danah.abdulla</a> is a designer, educator, and researcher—not in any particular order but always all three.</p>',
          image: 'danah-abdulla.jpg'
        },
        width: 800,
        open: true
      }]
    }
  },
  mounted () {
    if (this.socket) this.send(['get-drag-init', {}])

    setInterval(() => {
      this.terms[this.index] = this.terms[this.index].reverse()
      if (this.index < this.terms.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
    }, 2000)
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      stats: 'stats/all'
    }),
    rond () {
      if (!process.browser) return
      return ((this.stats.mouseX - 0) / (window.innerWidth - 0) * (900 - 0) + 0)
    }
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
.page-index {
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1em;
  overflow-y: auto;
  overflow-x: hidden;
  /* background: linear-gradient(145deg, var(--gradient-colors)); */
}

h1 {
  font-size: 8vw;
  color: var(--highlight-text-color);
  text-transform: uppercase;
  text-align: center;
  user-select: none;
}

@media screen and (max-width: 450px) {
  .page-index {
    min-height: 100vh;
    overflow-y: hidden;
  }

  h1 {
    font-size: 10vw;
  }
}
</style>
