<template>
  <no-ssr>
    <div class="page page-exhibition">
      <div class="logo-container">
        <nuxt-link to="/exhibitions">
          <logo style="max-width: 300px" />
        </nuxt-link>
        <h1 id="logo">
          Unrealized Archive:<br />
          Future Histories
        </h1>
        <div id="clock">
          Online Exhibition<br /><span id="current-day" v-if="open">Day {{ currentDay }}, </span
          ><span id="current-time">{{ currentTime }}</span>
        </div>
        <div id="testing" v-if="testToken">
          Opens: <input v-model="opens" placeholder="opening hour" type="number" min="0" max="24"><br>
          Closes: <input v-model="closes" placeholder="closing hour" type="number" min="0" max="24"><br>
          Opening Day: <input v-model="openingDay" placeholder="opening Day" type="number" min="0" max="30"><br>
          Interval (h): <input v-model="countDown.interval" placeholder="interval" type="number" min="1" max="10">
        </div>

      </div>
      <div id="countdown">
        <span>{{ nextWorksLabel }} </span
        ><span id="next-time">{{ nextTime }}</span>
      </div>
      <div id="closed" v-if="!open">
        <p>The Exhibition is Closed.</p>
      </div>
      <div id="container" v-else>

      <span
        class="xl"
        :style="`font-variation-settings: 'rond' ${rond};`"
      >
        Future Histories
      </span>
        <!-- top right -->

        <!-- top left -->

        <!-- bottom right -->
      <window
        :id="`window-about`"
        :type="about.type"
        :title="about.title"
        :content="about.content"
        :width="about.width"
        :opened="about.open"
        class="drag"
        v-drag="onDrag"
      />
        <!-- bottom left / panel -->
        <div
          id="work"
          :class="{ show: showDescription }"
          v-if="this.i !== undefined && this.i !== null"
        >
          <div id="work-title" @click="showDescription = !showDescription">
            <h2>{{ this.works[this.i].title }}</h2>

            <div class="button">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 30 30"
                xml:space="preserve"
              >
                <style type="text/css">
                  .stroke {
                    fill: none;
                    stroke-width: 1.5px;
                    stroke: #ffffff;
                    stroke-miterlimit: 10;
                  }
                </style>
                <g v-if="showDescription">
                  <line class="stroke" x1="0.5" y1="0.5" x2="29.5" y2="29.5" />
                  <line class="stroke" x1="29.5" y1="0.5" x2="0.5" y2="29.5" />
                </g>
                <g v-if="!showDescription" transform="rotate(180 15 15)">
                  <polyline class="stroke" points="29.5,7.5 15,22 0.5,7.5" />
                </g>
              </svg>
            </div>
          </div>
          <!-- work 0 -->
          <div class="work-content">
            <div class="desc" v-html="this.works[this.i].description"></div>
          </div>
        </div>

        <!-- large image -->
        <div id="img-container" v-if="this.i !== undefined && this.i !== null">
          <img id="main-img" :src="`/exhibition/${this.works[this.i].image}`" />
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { DateTime, Duration } from 'luxon'
import Window from '@/components/Window.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: { Logo, Window },
  data() {
    return {
      now: DateTime.local().setZone(this.timeZone),
      opens: 10, // 10
      closes: 19, // 19
      openingDay: 18,
      timeZone: 'Europe/Berlin',
      showDescription: false,
      about: {
        type: 'drop-shadow',
        title: 'About',
        content:
          `<strong>Unrealized Archive 6: Future Histories</strong><br /><br />
          <em>Unrealized Archive 6: Future Histories</em> examines the fabrication and manipulation of reality through graphic symbols – alphabets, patterns, and icons. It looks at the potential of circulation and Graphic Design’s role to legitimize as well as disrupt today’s flow of information. These collected works posit hypothetical states of the world to create productive interventions and explore everything from utopian visions, posthumanism, natural resources, nationalism, privacy, to ahistorical revision.<br /><br />The exhibition is on view during <em>Attending [to] Futures</em> – both online as well as within the conference exhibition space via a projection of the website. An ephemeral experience, the works will be shown for a limited time when they will be traced as silhouettes in the exhibit space, before receding into the past leaving behind graphic fragments.<br /><br />
          <strong>Featured Designers:</strong><br />
          MJ Balvanera<br />
          Everett Epstein<br />
          Nick Lamkin<br />
          Kyle Neal<br />
          Jinhwa Oh<br />
          Goeun Park<br />
          Juan Pablo Rahal Soto<br />
          William Sumrall<br />
          Sora Won<br /><br />

          <strong>Project organizers:</strong><br />
          Christopher Hamamoto and Jon Sueda`,
        // width: 300,
        open: false,
      },
      works: [
        {
          title: 'Tessalate by William Sumrall',
          image: '1-main.png',
          description: `
          <p>
            Tesselate is a generative tool for camouflage creation and experimentation. Tesselate is intentionally designed so that its initial place of creative departure leaves room for experimentation and unexpected discovery for its user.
          </p>
          <img src="/exhibition/1-a.jpg" />
          <p>
             The forms that make up this typeface are drawn in a 1x1 yard font space - an easy metric for fabric application. Each symbol is drawn on a custom grid and mapped to the keys on a keyboard. The kerning of the typeface is set to 0 so that letterforms overlap as the user types.
          </p>
          <img src="/exhibition/1-b.jpg" />
          <img src="/exhibition/1-c.jpg" />
          <p>
            Tesselate is designed to function as an inverse to a traditional family of letters which are most often used to communicate, clarify, and / or explain when combined to form words. Instead, tesselate tests the notion of language as a tool for obfuscation. The length of a string of characters determine the complexity of the designs the typeface generates. Embedded messages are disguised as formal patterns and compositions.
          </p>
          <img src="/exhibition/1-d.gif" />
          `,
        },
        {
          title: 'Data Patches by Kyle Neal',
          image: '2-main.png',
          description: `
          <p>
            Data Patches focuses on the fabrication and manipulation of reality through distributed media. Through smart clothes and tracking sensors, our physical bodies are captured and distorted into digital code. To visualize how our personal data is used and transformed by wearable technology, I created an automated process where I take an individual’s image and manipulate it’s data to create an image distorted beyond recognition.
          </p>
          <img src="/exhibition/2-a.png" />
          <p>
             The distorted image is then placed into an ID template which draws from the visual language of microchips, RFID tags and tracking sensors. The resulting graphic symbol represents the “data-fied” person, visualizing the ways an individual is quantified, controlled and used through data manipulation.
          </p>
          <img src="/exhibition/2-b.png" />
          <p>
             To distribute the graphic symbol, I transformed them into patches meant to be worn on a jacket, making the invisible nature of data collection more visible. A patch on a jacket makes a statement and a person wearing their own personal Data Patch shows an awareness and knowledge of the surveillance and data mining happening when using wearable technology. The analog patch made from personal data is fighting against the detailed forms of online monitoring occurring as we become more connected, as well as spreading information and creating conversations about the insidious nature of data collection and our participation in it via wearable technology. Data Patches explores issues of surveillance and data privacy and questions how a design intervention can be used to discuss a topic like surveillance capitalism.
          </p>
          <img src="/exhibition/2-c.png" />
          <p>
            A world where there is a greater awareness of who owns our personal data, how it is being used and the impacts of surveillance capitalism. It is a world where individuals are able to take control of their data and wear it, spreading information and sharing knowledge in alternative, offline and analog ways, such as a jacket patch. In this hypothetical state, fashion is about self-expression and doesn’t require us to submit ourselves to increasingly detailed forms of data collection and online monitoring in order to wear what we want. This hypothetical state is one where data collection isn’t invisible and our personal data isn’t given up unwillingly but instead we are in control of how our data is used. The jacket patch that symbolizes our “data-fied” self shows this awareness.
          </p>
          `,
        },
        {
          title: 'Contrast by Jinhwa Oh',
          image: '3-main.jpg',
          description: `
          <p>
            Contrast is a moving poster discussing the relationship between two-dimensionality and three-dimensionality. Rather than regarding the relationship as a matter of “A or B,” I see infinite progressive stages between the two conditions, like a spectrum from low to high contrast.
          </p>
          <img src="/exhibition/3-a.jpg" />
          <img src="/exhibition/3-b.jpg" />
          <p>
             Although this poster is a digital image, it resembles a sticker sheet, which is an ordinary object in the physical world. This poster is peeled off gradually, leaving different images that are invisible at first.
          </p>
          <img src="/exhibition/3-c.jpg" />
          <img src="/exhibition/3-d.jpg" />
          <p>
            This poster also talks about the idea of national borders in which more than two countries are facing each other. All symbols in this poster are from national flags, and when the symbols on the front side are peeled off, symbols of different nations that are adjacent to the countries gradually appear.
          </p>
          <video src="/exhibition/3.mp4" autoplay muted />
          `,
        },
        {
          title: 'Dancing on The Track Pad by Goeun Park',
          image: '4-main.jpg',
          description: `
          <p>
            Dancing on the Trackpad is a project building a notation system to map the movements of trackpad gestures and alter them into a performance.
          </p>
          <img src="/exhibition/4-a.jpg" />
          <p>
             The system of notation is created based on Labanotation, which is a dancing notation of traditional ballet. In Labanotation, a person’s physical movements are divided into three parts; noun, verb, and adverb which is similar to how a sentence is structured.
          </p>
          <img src="/exhibition/4-b.jpg" />
          <p>
             The new notation system maps all the possible trackpad gestures in * Mac OS. For example, Opening Mission Control is described as three fingers (noun) swipe up (verb) the trackpad slowly (adverb).
          </p>
          <img src="/exhibition/4-c.jpg" />
          <p>
            The project transcribed functional hand gestures on the trackpad such as running a Google search for “smiley”or sending a friend request through Facebook, into the notations. Since every individuals uses the trackpad in different ways, the result of the transcription creates multiple patterns. They visualize the relationship between the hand, physical movement, and the trackpad.
          </p>
          <p>
            * Mac OS has 14 different trackpad gestures: Look up & data detectors, Secondary click, Tap to click, Scroll direction, Zoom in or out, Smart zoom, Rotate, Swipe between pages, Swipe between full-screen apps, Notification Center, Mission Control, App Exposé, Launchpad, Show Desktop.
          </p>
          <p>
            Gestures are a main tool to use a device. The devices are not merely the screen these days, but they can be expanded into space; a room itself could be a device in the future. This project could propose this question; How does creating a notation system contribute to highlighting the physical relationship between body, movement and the future tool?
          </p>
          <p>
            “Dance is an expressive gesture and body configurations through which non-verbal communication can be achieved. There is a clearly constructed grammar that defines the relationship of the movement words to each other and their given function in the movement sentence.“
          </p>
          <p>
            - Excerpt from Labanotation: The System of Analyzing and Recording Movement Ann Hutchinson Guest 1954
          </p>
          <p>
            “Space is experienced most intuitively through movement, and on a higher level through dance. Dance is at the same time a basic means of realizing a spatial design. It can consolidate a space, segment it: space expands, sinks and floats, fluctuates in all directions.”
          </p>
          <p>
            - Excerpt from Human-Space-Machine: Stage: Experiments at the Bauhaus, Blume Torsten, Spector Books, 2014
          </p>
          `,
        },
        {
          title: 'The Discreet Life of the Emoji by Everett Epstein',
          image: '5-main.png',
          description: `
          <p>
            <em>The Discreet Life of the Emoji</em> traces the “Smiling Face with Tear” emoji backwards, through the screen, through its code, across Lithium pools, to the mines of the Atacama Desert. Drawing on the research of Martín Arboleda, the website offers a materialist critique of a symbol, visualizing the supply chain behind a wholly digital language. Accompanying this map, I included a ribbon of text which reads:
          </p>
          <p>
            <em>I’m speechless as I type emojis → from quarantine on a Macbook → built out of copper and lithium → mined and transported by precariat laborers → using wi-fi transmitted along fiber-optic cables → gradually superheated by an increasingly diseased climate → entering an insecure profession → in a country that helped destabilize the global south → such that I could type these words in the first place.</em>
          </p>
          <img src="/exhibition/5-a.png" />
          <p>
             I hope that this project proposes a world more considerate of the alienated character of language. Emojis in particular—and digital type in general—are completely entangled in economies of precarity, and any solidarity with global worker movements must start with that recognition: my “voice” isn’t mine alone. The letters I type have never been so cheap to produce, never been so easily rendered, which should give us pause.
          </p>
          <img src="/exhibition/5-b.png" />
          <p>
             My hypothetical world would be one born in that pause, where speech fails us because the us has articulated itself. In other words, this project imagines a future suddenly quieted by Chilean dock workers striking, by Bolivian Lithium miners asserting national mineral rights, by Unicode employees just walking out, shutting down the servers. It’s an ambivalent future—an apocalyptic silence; and in 2021, that possibility is on the tip of our tongues.
          </p>
          <img src="/exhibition/5-c.png" />
          <img src="/exhibition/5-d.png" />
          `,
        },
        {
          title: 'Martian Flags by Nick Lamkin',
          image: '6-main.jpeg',
          description: `
          <p>
            Elon Musk has used the word “colonize” when talking about human expansion into space and Mars. The use of this word itself implies there may be some similarities between human expansion into Mars and the colonization of the New World by European countries.
          </p>
          <img src="/exhibition/6-a.jpeg" />
          <p>
             However, this project utilizes a visual identity for a hypothetical Martian future that avoids the visual strategies of colonial powers on earth. In creating an automated graphic method to generate and distribute identity, the project rejects a top-down Colonial approach. The system refuses any singular mark of sovereignty or ownership (like the Union Jack) to make a cohesive system without national, religious, ideological, or corporate iconography.
          </p>
          <img src="/exhibition/6-b.jpeg" />
          <p>
             Each aspect of the flag template (composition and forms) is set to the multiplicity of two and four — two for the two moons of Mars and four for its position as fourth planet from the sun. The system generates flags by separating the shapes onto layers and toggling their positive/negative fill. The individual flags generated vary significantly and are compelling on their own. However, the methodology shows its merit when the flags are displayed alongside one another as patchwork. No single flag holds dominion over another, existing as equals united by a simple and abstract graphic system.
          </p>
          <img src="/exhibition/6-c.jpeg" />
          <p>
            In some ways this project imagines a future that our present does not suggest. In this future, the powers involved with the "colonization" of Mars have learned from the errors of the past. The project hopes for a future world state that values unity and independence over division and sovereignty.
          </p>
          <img src="/exhibition/6-d.jpeg" />
          `,
        },
        {
          title: 'Korean Unification Flag by Sora Won',
          image: '7-main.jpg',
          description: `
          <p>
            North and South Korea are still at war and the Korean peninsula is the only divided country in the world. Korean unification has long been the ultimate goal of the two Koreas but decades of division have created a huge economic and cultural gap. However, we all hope that peace can finally come to Korea. If that happens, how long would unification take? Would it be beneficial for both Koreas? What would Korean unification look like? and lastly, how do you feel about it?
          </p>
          <video src="/exhibition/7.mp4" autoplay muted />
          <p>
             The goal of this project is to spark discourse and make a collective design work by encouraging people’s participation. This flag generator lets you create a flag by flipping the tile. The front side is the South Korean flag and the backside is the North Korean flag. Users can reflect their opinion about Korean unification by making a flag of their own interpretation. Users can decide which flag will be shown more based on how they imagine the unification would look like. When users actually play with it, they would realize flipping is tiring and time-consuming due to too many tiny tiles. This also reflects the fact that unification is a long and painful process. And that is what it takes to finally achieve peaceful unification.
          </p>
          <img src="/exhibition/7-a.jpg" />
          <img src="/exhibition/7-b.jpg" />
          <img src="/exhibition/7-c.jpg" />
          <img src="/exhibition/7-d.jpg" />
          `,
        },
        {
          title: 'Climate Countries by Juan Pablo Rahal Soto',
          image: '8-main.png',
          description: `
          <p>
            Climate Countries is a project and installation that aims to raise questions about the future of our borders, politics, currency—and ultimately—climate. In 2084 borders have fallen, or rather, their walls and fences have fallen.
          </p>
          <img src="/exhibition/8-a.png" />
          <p>
             The project proposes a world where the climate of the land dictates our political borders. Thus, borders are constantly changing and moving; they become a gradient and variable beyond human hands. Nature is the one that dictates our politics.
          </p>
          <img src="/exhibition/8-b.png" />
          <p>
             The installation happens inside and outside of a space. Outside, the audience is informed, through a poster and audio, how this future that they are about to enter will be. Inside, a completely different atmosphere is presented, representing three different scenes of this future. These three scenes are built through the projection of a small animated poster that interrupts the daily routine of a person’s day in a different and new country—people will need to adapt their lives to be a citizen of these new countries.
          </p>
          <p>
             <a href="juanpablorahal.com" taret="_blank">juanpablorahal.com</a>
          </p>
          `,
        },
        {
          title: 'Collective Identity Flags by MJ Balvanera',
          image: '9-main.gif',
          description: `
          <p>
            As part of an ongoing exploration into the deep rooted issues in graphic design, this project explores the idea of user generated design as well as the concepts of breaking the grid and subverting the function of a digital tool. Using Google SpreadSheets, participants are asked to add their own flag, whatever interpretation one might have of it, to a database of flags which was then converted into a collective physical flag.

          </p>
          <img src="/exhibition/9-a.jpg" />
          <p>
             As of summer 2017, the participant flags were turned into a single, united and collaborative fabric flag, digitally printed on fabric (26" x 17", 66cm x 43cm) in an edition of 3.
          </p>
          <img src="/exhibition/9-b.jpg" />
          <p>
             Consider that the world has been globalised to the point of delusional collectiveness. If this project could propose a hypothetical state of the world, it would encourage viewers and participants to identify the vast diversity that we have erased through capitalist globalization, and, specifically, our role as designers perpetuating the expansion of these ideals. This notion should not be a hypothetical state, yet our understanding of diversity has shifted to the point where it's recognition is, by default, hypothetical.
          </p>
          <p>
             <a href="mjbalvanera.com" taret="_blank">mjbalvanera.com</a>
          </p>
          `,
        },
      ],
      i: null,
      distance: 0,
    }
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
    countDown() {
      return {
        start: DateTime.fromISO(`2021-11-${String(this.openingDay).padStart(2, '0')}T${String(this.opens).padStart(2, '0')}:00:00.000+01:00`,
          { zone: this.timeZone }
        ),
        interval: 3, // hours
      }
    },
    testToken() {
      return this.$route.query.token === 'ha8HAsb289a'
    },
    open() {
      if (this.now < this.countDown.start) return
      // get hour as integer
      var hour = parseInt(this.now.toFormat('HH'))
      // check if outside of opening hours
      return hour >= this.opens && hour < this.closes
    },
    nextWorksLabel() {
      console.log(this.open)
      if (!this.open) return 'The exhibition will open in'
      if ([2, 5, 8].includes(this.i)) return 'The exhibition will close in'
      return 'Next work shown in'
    },
    currentDay() {
      // check day of conference
      var day = parseInt(this.now.toFormat('d'))
      switch (day) {
        case this.countDown.start.day:
          return 1
        case this.countDown.start.day + 1:
          return 2
        case this.countDown.start.day + 2:
          return 3
        default:
          return 0
      }
    },
    currentTime() {
      // show current time)
      return this.now.toLocaleString(DateTime.TIME_SIMPLE)
    },
    nextTime() {
      // Display the result in the element with id="demo"
      return Duration.fromMillis(this.distance).toFormat("dd'd' hh'h' mm'm' ss's'")
    },
  },
  watch: {
    now() {
      let distance = Math.abs(this.countDown.start.diffNow().values.milliseconds)
      const before = this.now.ts < this.countDown.start.ts
      const h = 1000 * 60 * 60
      const d = h * 24
      if (!before) {
        const interval = Number(this.countDown.interval) * h
        const remainder = distance % interval
        distance = interval - remainder
        if ((this.now.hour >= Number(this.opens)) && (this.now.hour < (Number(this.opens) + Number(this.countDown.interval)))) {
          this.i = 0
        } else if (this.now.hour >= Number(this.opens) + Number(this.countDown.interval) && this.now.hour < Number(this.opens) + Number(this.countDown.interval) * 2) {
          this.i = 1
        } else if (this.now.hour >= Number(this.opens) + Number(this.countDown.interval) * 2 && this.now.hour < Number(this.opens) + Number(this.countDown.interval) * 3) {
          this.i = 2

        }
        this.i = this.i + (3 * (this.currentDay - 1))
        this.i = Math.min(this.i, this.works.length - 1)
        if (this.now.hour >= this.closes) {
          distance = Math.abs(this.countDown.start.ts + d * this.currentDay - this.now.ts)
        }
      }
      this.distance = distance
    },
  },
  mounted() {
    if (this.socket) this.send(['get-drag-init', {}])
    var timer = window.setInterval(
      function () {
        this.getNow()
      }.bind(this),
      1000
    )
  },
  methods: {
    ...mapActions({
      send: 'socket/send',
    }),
    ...mapMutations({
      setElement: 'drags/setElement',
    }),
    onDrag(event) {
      // this.send(['drag', event])
    },
    getNow() {
      this.now = DateTime.local().setZone(this.timeZone)
    },
    reduce(value, interval, to) {
      value = (value - (value % interval)) / interval
      if (value > to) {
        // value =- interval
        value = this.reduce(value, interval, to)
      }
      return Math.max(value, 0)
    },
  }
}
</script>

<style scoped>

#window-about {
  position: absolute;
  top: 30vh;
  right: 10vw;
  width: calc(100vw - 16rem);
  max-width: 400px;
  font-size: 1rem;
}
#window-about >>> .title {
  font-size: 1.25rem;
  font-weight: normal;
}
#window-about >>> .content {
  max-height: calc(100vh - 20rem);
  overflow-y: auto
}
@media screen and (max-width: 640px) {
  #window-about {
    position: relative;
    right: initial;
    left: 1rem;
    max-width: 300px;
    width: calc(100vw - 2rem);
  }
  #window-about >>> .content {
    padding: 1em;
  }
}

.page {
  padding: 0;
  display: flex;
}

.logo-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100vw;
  gap: 1rem;
  z-index: 100;
}
.logo-container > * {
  flex-basis: 30%;
}
.xl {
  font-size: min(16vw, 35vh);
  color: var(--highlight-text-color);
  text-transform: uppercase;
  text-align: center;
  user-select: none;
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#closed,
#img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
}

#container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#img-container {
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;
  z-index: 0;
}

/* style open page */

#main-img {
  max-height: 75vh;
  max-width: 75vw;
  height: auto;
  width: auto;
}

/* corners */

#logo {
  font-size: 1.5em;
  /* font-weight: bold; */
  text-align: center;
}
#clock {
  font-size: 1.5em;
  text-align: right;
}
#countdown {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
}

/* drawer */

#work {
  position: absolute;
  top: 100vh;
  left: 20px;
  width: calc(50vw - 20px);
  max-width: 640px;
  min-width: 360px;
  height: 90vh;
  border: 1px solid black;
  background: white;
  transition: transform 500ms ease;
  z-index: 99999;
}
.work-content {
  overflow-y: auto;
  height: 100%;
  margin-top: -1px;
}
.desc >>> p a:hover {
  text-decoration: underline
}

#work.show {
  transform: translateY(calc(-100vh + 100px));
}

#work-title {
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: space-between;
  background: black;
  color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 10;
  width: calc(100% + 2px);
  position: absolute;
  transform: translateY(calc(-100% + 1px));
  margin: -1px;
}
#work-title h2 {
  padding: 10px 15px;
  color: white;
}
#work-title .button {
  min-width: 2.625em;
  padding: 0.375rem;
}
#work-title .button.hide {
  opacity: 0;
}
#work-title:hover {
  background: white;
}
#work-title:hover h2 {
  color: black;
}
#work-title:hover .stroke {
  stroke: black;
}

#info {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

.desc {
  padding: 1rem;
  margin-bottom: 2rem;
}
.desc >>> p {
  margin: 1rem 0;
}

.desc >>> img,
.desc >>> video {
  width: 100%;
  height: auto;
  display: block;
}

p {
  padding: 12px 0px 24px;
}

@media screen and (max-width: 640px) {
  .logo-container * {
    flex-basis: 45%;
    text-align: left !important;
  }
  #clock {
    flex-basis: 100%;
    font-size: 1rem;
  }
  #countdown {
    bottom: 4rem;
  }
  #work {
    left: 10px;
    width: calc(100% - 20px);
  }
}
@media screen and (max-width: 320px) {
  .logo-container * {
    flex-basis: 100%;
  }
}

</style>
