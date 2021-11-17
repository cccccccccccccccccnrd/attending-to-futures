<template>
  <div class="page page-exhibition">
    <div class="logo-container">
      <nuxt-link to="/exhibitions">
        <logo style="max-width: 300px" />
      </nuxt-link>
      <h1 id="logo">
        Mariah:<br />
        Acts of Resistance
      </h1>
      <div id="clock">Online Exhibition<br /><span id="current-day" v-if="open">Day {{currentDay}}, </span><span id="current-time">{{currentTime}}</span></div>
    </div>
    <div id="countdown" v-if="!open"><span>The Exhibition Will Open In </span><span id="next-time">{{nextTime}}</span></div>
    <div id="closed" v-if="!open">
      <p>The Exhibition is Closed.</p>
    </div>
    <div id="container" v-else>
      <!-- top right -->

      <!-- top left -->

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

      <div id="img-container">
        <iframe title="vimeo-player" src="https://player.vimeo.com/video/646911458?h=cd175ada23" width="80%" height="80%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
    </div>
  </div>
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
      timeZone: 'Europe/Berlin',
      showDescription: false,
      about: {
        type: 'drop-shadow',
        title: 'About',
        content:
          `A documentary short film about an augmented reality experience, Mariah narrates stories of injustice by exposing the sinister funding of big pharma, the blind acceptance of capital by cultural institutions, and the implications of technocratic power. We fill the halls of historic museums with the voices of those gone and those left to carry the burden of loss, staking claim to expose the power structures' status quo. Mariah is our witness, and she is our actor of protest.<br /><br />As we attempt to better understand the topography of the overdose epidemic in America, the ethical implications of the metaverse, and the reclaiming of both physical and digital landscapes, please know that <strong><em>this film is a work in progress</em></strong>. Our work is never completed, and as we chart into untested waters, we seek the questions that hide behind the answers.`,
        // width: 300,
        open: false,
      },
      works: [
        {
          title: '',
          image: '',
          description: ``
        },
      ],
      countDown: {
        start: DateTime.fromISO('2021-11-18T10:00:00.000+01:00', { zone: this.timeZone }),
        interval: 3, // hours
      },
      i: 0,
      distance: 0,
      startTime: 0,
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
    open() {
      if (this.now > this.countDown.start) return true
    },
    currentDay() {
      // check day of conference
      var day = parseInt(this.now.toFormat('d'))
      switch (day) {
        case 18:
          return 1
        case 19:
          return 2
        case 20:
          return 3
        default:
          return 0
      }
    },
    currentTime() {
      // show current time
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
      // before exhibition
      const before = this.now < this.countDown.start
      if (!before) {
        const h = 1000 * 60 * 60
        const interval = this.countDown.interval * h
        const remainder = distance % interval
        this.i = this.reduce(Math.floor(distance / h) - Math.floor(remainder / h), Math.floor(interval / h), this.works.length - 1)
        distance = interval - remainder
      }
      this.distance = distance
    }
  },
  mounted() {
    if (this.socket) this.send(['get-drag-init', {}])
    var timer = window.setInterval(function(){
      this.getNow();
    }.bind(this), 1000);
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
    reduce(value, interval, to = 2) {
      value = (value - (value % interval)) / interval
      if (value > to) {
        value = this.reduce(value, interval)
      }
      return Math.max(value, 0)
    },
  }
}
</script>

<style scoped>

#window-about {
  position: absolute;
  top: 40vh;
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
  font-weight: bold;
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

@media screen and (max-width: 640px) {
  .logo-container * {
    flex-basis: 45%;
    text-align: left !important
  }
  #clock {
    flex-basis: 100%;
    font-size: 1rem;
  }
}
@media screen and (max-width: 320px) {
  .logo-container * {
    flex-basis: 100%;
  }
}
/* drawer */

#work {
  position: absolute;
  top: 100vh;
  left: 20px;
  width: calc(50vw - 20px);
  max-width: 640px;
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
video {
  aspect-ratio: 16/9;
  max-width: min(90vw, 140vh);
}
@media (max-width: 414px) {
  #work {
    left: 10px;
    width: calc(100% - 20px);
  }
}
</style>
