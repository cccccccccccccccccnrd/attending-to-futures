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

      <!-- bottom right -->

      <!-- bottom left / panel -->
      <div id="work" :class="{show: showDescription }">
        <div id="work-title" @click="showDescription = !showDescription">
          <h2>{{this.works[0].title}}</h2>

        <div :class="{ hide: !showDescription }"
          class="button"
        >
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 30 30" xml:space="preserve">
            <style type="text/css">
              .stroke {
                fill: none;
                stroke-width: 1.5px;
                stroke: #FFFFFF;
                stroke-miterlimit: 10;
              }
            </style>
            <g v-if="open">
              <line class="stroke" x1="0.5" y1="0.5" x2="29.5" y2="29.5"/>
              <line class="stroke" x1="29.5" y1="0.5" x2="0.5" y2="29.5"/>
            </g>
            <g v-if="!open">
              <polyline class="stroke" points="29.5,7.5 15,22 0.5,7.5 "/>
            </g>
          </svg>
        </div>
        </div>
        <!-- work 0 -->
        <div class="work-content">
        <div class="desc" v-html="this.works[0].description"></div>
      </div>
      </div>

      <!-- large image -->
      <div id="img-container">
        <video ref="video" width="100%" height="auto" :src="`/exhibition/lectures.mp4`" autoplay controls />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { DateTime, Duration } from 'luxon'

export default {
  components: { Logo },
  data() {
    return {
      now: DateTime.local().setZone(this.timeZone),
      timeZone: 'Europe/Berlin',
      showDescription: false,
      works: [
        {
          title: '/',
          image: '',
          description: `A documentary short film about an augmented reality experience, Mariah narrates stories of injustice by exposing the sinister funding of big Pharma, the blind acceptance of capital by cultural institutions, and the implications of technocratic power. We fill the halls of historic museums with the voices of those gone and those left to carry the burden of loss, staking claim to expose the power structures' status quo. Mariah is our witness, and she is our actor of protest.<br /><br />The film is accompanied by a corresponding publication and poster that can be activated by the Mariah smartphone app.`
        },
      ],
      countDown: {
        start: DateTime.fromISO('2021-11-18T09:00:00.000+01:00', { zone: this.timeZone }),
        interval: 3, // hours
      },
      i: null,
      distance: 0,
      startTime: 0,
    }
  },
  computed: {
    open() {
      if (this.now < this.countDown.start) return
      // get hour as integer
      var hour = parseInt(this.now.toFormat('HH'))
      // check if outside of opening hours
      return hour >= 9 || hour <= 18
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
      // if (this.startTime === 0 && this.$refs.video.duration) {
        // this.startTime = this.distance / 1000
        // this.$refs.video.play()
      // }
    }
  },
  mounted() {
    // this.$nextTick(() => {
      // setTimeout(function () {
        // this.countDown.interval = this.$refs.video.duration / 60 / 60
        // this.startTime
      // }.bind(this), 100)
    // })
    var timer = window.setInterval(function(){
      this.getNow();
    }.bind(this), 1000);
  },
  methods: {
    getNow() {
      this.now = DateTime.local().setZone(this.timeZone)
    },
    reduce(value, interval, to = 2) {
      value = (value - (value % interval)) / interval
      if (value > to) {
        value = this.reduce(value, interval)
      }
      return value
    },
  }
}
</script>

<style scoped>
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
  /* width: 100vw; */
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
  z-index: 999;
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
  height: 90vh;
  border: 1px solid black;
  background: white;
  transition: transform 500ms ease;
  z-index: 999;
}
.work-content {
  overflow-y: auto;
  height: 100%;
  margin-top: -1px;
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
  color: white
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
  margin: 1rem 0
}

.desc >>> img {
  width: 100%;
  height: auto;
  display: block;
}

p {
  padding: 12px 0px 24px;
}
video {
    aspect-ratio: 16/9;
    max-width: 100%;
    max-height: 100%;
}
@media (max-width: 414px) {
  #work {
    left: 10px;
    width: calc(100% - 20px);
  }
}
</style>
