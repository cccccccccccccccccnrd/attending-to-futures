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
    News,
  },
  data() {
    return {
      terms: Array.apply(null, Array(1)).map((e) => [
        'Matters of Politics in Design Education, Research, Practice',
        'Join the lecture series',
      ]),
      index: 0,
      windows: [
        /* {
        type: 'gradient',
        title: 'Call for Submissions',
        content: 'Join our conference as a speaker! We accept and encourage submissions of different formats and diverse approaches. Apply until April 05, 2021.<br/><br/><a href="/attending-to-futures-cfp.pdf" target="_blank"><button>Download pdf</button></a>',
        width: 400,
        open: false
      } */
        /* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Mindy Seu</div></div>',
        content: {
          name: 'Mindy <br> Seu',
          description: '<p><a href="https://www.mindyseu.com/" target="_blank">Mindy Seu</a> <a href="https://www.instagram.com/mindyseu/" target="_blank">@mindyseu</a> is a designer, researcher and Assistant Prof. at Rutgers Mason School of the Arts, New Brunswick, and Yale School of Art, New Haven.</p>',
          image: 'mindy-seu.jpg'
        },
        width: 800,
        open: true
      } */
        /* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Lisa Baumgarten & Imad Gebrayel</div></div>',
        content: {
          name: 'Lisa & <br> Imad',
          description: '<p><a href="https://lisabaumgarten.de/Info" target="_blank">Lisa Baumgarten</a> <a href="https://www.instagram.com/lis.baum/" target="_blank">@lis.baum</a> is a Designer, Researcher and Lecturer. She currently offers seminars in design history and practice at UdK Berlin, HfK Bremen, and HTW Berlin. <a href="https://www.imadgebrayel.com/" target="_blank">Imad Gebrayel</a> <a href="https://www.instagram.com/imadgebrayel/" target="_blank">@imadgebrayel</a> is a Designer, Ph.D candidate in European Ethnology at HU Berlin, and lecturer at UdK Berlin, HfK Bremen, and design Akademie Berlin.</p>',
          image: 'baumgarten-gebrayel.jpg'
        },
        width: 900,
        open: true
      } */
        /* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Dr. Luiza Prado de O. Martins</div></div>',
        content: {
          name: 'Luiza Prado <br> de O. Martins',
          description: '<p><a href="https://www.luiza-prado.com/" target="_blank">Dr. Luiza Prado de O. Martins</a> <a href="https://www.instagram.com/luizap/" target="_blank">@luizap</a> is an artist, writer, and researcher whose work examines themes around fertility, reproduction, coloniality, gender, and race.</p>',
          image: 'luiza-prado.jpg'
        },
        width: 900,
        open: true
      } */
        /* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Danah Abdulla</div></div>',
        content: {
          name: 'Danah <br> Abdulla',
          description: '<p><a href="https://www.dabdulla.com/" target="_blank">Danah Abdulla</a> <a href="https://www.instagram.com/danah.abdulla/" target="_blank">@danah.abdulla</a> is a designer, educator, and researcher—not in any particular order but always all three.</p>',
          image: 'danah-abdulla.jpg'
        },
        width: 800,
        open: true
      } */
        /* , {
        type: 'speaker',
        title: '<div style="display: flex; justify-content: space-between; width: 100%;"><div>Speaker announcement</div><div style="font-variation-settings: \'rond\' 900">Silvy Chakkalakal</div></div>',
        content: {
          name: 'Silvy <br> Chakkalakal',
          description: '<p><a href="https://www.euroethno.hu-berlin.de/de/institut/personen/chakkalakal" target="_blank">Silvy Chakkalakal</a> is a Junior Professor at the Institute of European Ethnology and at the Center of Transdisciplinary Gender Studies at Humboldt-Universität zu Berlin.</p>',
          image: 'silvy-chakkalakal.jpg'
        },
        width: 900,
        open: true
      } */
        //{
        //   type: 'gradient',
        //   title: 'upcoming lecture',
        //   content: '<div style="display: flex; flex-flow: column wrap;"><a href="https://kisd.de/termine/91059/" target="_blank"><div class="pill">14.04.2021</div><div class="pill">05:30pm (CET)</div><div class="pill">Foundland Collective</div><div class="pill">Lauren Alexander</div><div class="pill">Ghalia Elsrakbi</div><div class="pill invert">Archive Afterlife</div></a></div><br><small>Every semester KISD hosts a series of talks on different approaches, realms, and perspectives of design. This summer term, the KISDtalk series will be part of the Attending [to] Futures endeavor and lead up to the conference in November.</small>',
        //   width: 330,
        //   open: true
        // },
        // {
        //   type: 'gradient',
        //   title: 'upcoming lecture',
        //   content:
        //     '<div style="display: flex; flex-flow: column wrap;"><a href="https://kisd.de/termine/online-kisdtalk-design-activism-and-democracy/" target="_blank"><div class="pill">12.05.2021</div><div class="pill">05:30pm (CET)</div><div class="pill">HBK Braunschweig</div><div class="pill">Maziar Rezai</div><div class="pill invert">Design Activism and Democracy</div></a></div><br><small>Every semester KISD hosts a series of talks on different approaches, realms, and perspectives of design. This summer term, the KISDtalk series will be part of the Attending [to] Futures endeavor and lead up to the conference in November.</small>',
        //   width: 400,
        //   open: true,
        // },
        // {
        //   type: 'gradient',
        //   title: 'upcoming lecture',
        //   content:
        //     '<div style="display: flex; flex-flow: column wrap;"><a href="https://kisd.de/termine/kollaborative-und-performative-wissensproduktion/" target="_blank"><div class="pill">19.05.2021</div><div class="pill">05:30pm (CET)</div><div class="pill">HfK Bremen</div><div class="pill">Andrea Sick</div><div class="pill invert">Kollaborative und Performative Wissensproduktion</div></a></div><br><small>Every semester KISD hosts a series of talks on different approaches, realms, and perspectives of design. This summer term, the KISDtalk series will be part of the Attending [to] Futures endeavor and lead up to the conference in November.</small>',
        //   width: 400,
        //   open: true,
        // },
        // {
        //   type: 'gradient',
        //   title: 'upcoming lecture',
        //   content:
        //     '<div style="display: flex; flex-flow: column wrap;"><a href="http://www.unmakingstudio.se/about/" target="_blank"><div class="pill">23.06.2021</div><div class="pill">05:30pm (CET)</div><div class="pill">Un/Making Studio</div><div class="pill">Åså Stahl, Kristina Lindström</div><div class="pill invert">Un/Making Matters, Practices and Imaginaries</div></a></div><br><small>Every semester KISD hosts a series of talks on different approaches, realms, and perspectives of design. This summer term, the KISDtalk series will be part of the Attending [to] Futures endeavor and lead up to the conference in November.</small>',
        //   width: 400,
        //   open: true,
        // },
        // {
        //   type: 'gradient',
        //   title: 'announcment',
        //   content:
        //     `<h2 style="text-transform: uppercase; font-size: 4rem;">Program</h2>
        //     <h2 style="text-transform: uppercase; font-size: 4rem;">out</h2>
        //     <h2 style="text-transform: uppercase; font-size: 4rem;">now!</h2>`,
        //   width: 400,
        //   open: true,
        // },
      ],
    }
  },
  mounted() {
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
      stats: 'stats/all',
    }),
    rond() {
      if (!process.browser) return
      return ((this.stats.mouseX - 0) / (window.innerWidth - 0)) * (900 - 0) + 0
    },
  },
  methods: {
    ...mapActions({
      send: 'socket/send',
    }),
    ...mapMutations({
      setElement: 'drags/setElement',
    }),
    onDrag(event) {
      this.send(['drag', event])
    },
  },
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
