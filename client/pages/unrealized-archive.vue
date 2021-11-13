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
      </div>
      <div id="countdown">
        <span v-if="open">Next Work Shown In </span><span v-else>The Exhibition Will Open In </span
        ><span id="next-time">{{ nextTime }}</span>
      </div>
      <div id="closed" v-if="!open">
        <p>The Exhibition is Closed.</p>
      </div>
      <div id="container" v-else>
        <!-- top right -->

        <!-- top left -->

        <!-- bottom right -->

        <!-- bottom left / panel -->
        <div
          id="work"
          :class="{ show: showDescription }"
          v-if="this.i !== undefined && this.i !== null"
        >
          <div id="work-title" @click="showDescription = !showDescription">
            <h2>{{ this.works[this.i].title }}</h2>

            <div :class="{ hide: !showDescription }" class="button">
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
                <g v-if="open">
                  <line class="stroke" x1="0.5" y1="0.5" x2="29.5" y2="29.5" />
                  <line class="stroke" x1="29.5" y1="0.5" x2="0.5" y2="29.5" />
                </g>
                <g v-if="!open">
                  <polyline class="stroke" points="29.5,7.5 15,22 0.5,7.5 " />
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

export default {
  components: { Logo },
  data() {
    return {
      now: DateTime.utc().setZone(this.timeZone),
      timeZone: 'Europe/Berlin',
      showDescription: false,
      works: [
        {
          title: 'Tessalate by William Sumrall',
          image: 'tessalate.png',
          description: `<img src="/exhibition/1a.jpg" />
          <p>
            Tesselate is a generative tool for camouflage creation and experimentation. Tesselate is
            intentionally designed so that its initial place of creative departure leaves room for
            experimentation and unexpected discovery for its user.
          </p>
          <img src="/exhibition/1b.jpg" />
          <p>
            The forms that make up this typeface are drawn in a 1x1 yard font space - an easy metric
            for fabric application. Each symbol is drawn on a custom grid and mapped to the keys on
            a keyboard. The kerning of the typeface is set to 0 so that letterforms overlap as the
            user types.
          </p>
          <img src="/exhibition/1c.jpg" />
          <p>
            Tesselate is designed to function as an inverse to a traditional family of letters which
            are most often used to communicate, clarify, and / or explain when combined to form
            words. Instead, tesselate tests the notion of language as a tool for obfuscation. The
            length of a string of characters determine the complexity of the designs the typeface
            generates. Embedded messages are disguised as formal patterns and compositions.
          </p>`,
        },
        {
          title: 'Dancing On The Trackpad by Goeun Park',
          image: 'dot.png',
          description: `second`,
        },
        {
          title: 'The Discrete Life of an Emoji',
          image: 'emoji.png',
          description: `third`,
        },
      ],
      countDown: {
        start: DateTime.fromISO(
          this.testToken ?
          '2021-11-12T09:00:00.000+01:00' :
          '2021-11-18T09:00:00.000+01:00',
          { zone: this.timeZone }
        ),
        interval: 3, // hours
      },
      i: null,
      distance: 0,
    }
  },
  computed: {
    testToken() {
      return this.$route.query.token === 'ha8HAsb289a'
    },
    open() {
      if (this.testToken) return true
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
      if (!before || this.testToken) {
        const h = 1000 * 60 * 60
        const interval = this.countDown.interval * h
        const remainder = distance % interval
        this.i = this.reduce(
          Math.floor(distance / h) - Math.floor(remainder / h),
          Math.floor(interval / h),
          this.works.length - 1
        )
        distance = interval - remainder
      }
      this.distance = distance
    },
  },
  mounted() {
    var timer = window.setInterval(
      function () {
        this.getNow()
      }.bind(this),
      1000
    )
  },
  methods: {
    getNow() {
      this.now = DateTime.utc().setZone(this.timeZone)
    },
    reduce(value, interval, to = 2) {
      value = (value - (value % interval)) / interval
      if (value > to) {
        value = this.reduce(value, interval)
      }
      return value
    },
  },
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
    text-align: left !important;
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

.desc >>> img {
  width: 100%;
  height: auto;
  display: block;
}

p {
  padding: 12px 0px 24px;
}

@media (max-width: 414px) {
  #work {
    left: 10px;
    width: calc(100% - 20px);
  }
}
</style>
