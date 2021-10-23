<template>
  <div
    class="window"
    :style="`max-width: ${width}px;`"
  >
    <div class="shadow-container" :class="type">
      <div
        class="bar"
        :class="{ 'border-bottom': open }"
      >
        <div
          class="title"
          v-html="title"
        ></div>
        <div
          @click="open = !open"
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
      <div
        v-if="open && !['gradient', 'speaker'].includes(type)"
        class="content"
        v-html="content"
      ></div>
      <div
        v-if="open && type ==='gradient'"
        :style="`background: linear-gradient(${deg}deg, var(--gradient-colors));`"
        class="content"
        :class="type"
        v-html="content"
      ></div>
      <div
        v-if="open && type ==='speaker'"
        class="content speaker"
      >
        <div class="left">
          <div class="top">
            <div
              class="gradient-bar"
              :style="`background: linear-gradient(${deg}deg, var(--gradient-colors));`"
            ></div>
            <div
              class="name"
              v-html="content.name"
            >
              <!-- <p>{{ content.name }}</p> -->
            </div>
          </div>
          <div
            class="description"
            v-html="content.description"
          ></div>
        </div>
        <div>
          <nuxt-link
            to="/keynotes"
          >
            <img
              :src="require(`@/assets/${content.image}`)"
              style="filter: grayscale(100);"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['type', 'title', 'content', 'classes', 'width', 'opened'],
  components: {},
  data () {
    return {
      open: this.opened
    }
  },
  mounted () {},
  methods: {},
  computed: {
    ...mapGetters({
      stats: 'stats/all'
    }),
    deg () {
      if (!process.browser) return
      return ((this.stats.mouseX - 45) / (window.innerWidth - 45) * ((90 + 45) - 45) + 45)
    }
  }
}
</script>

<style scoped>
.window {
  width: 100%;
  max-width: 600px;
  border: 1px solid var(--dark-text-color);
  /* box-shadow: 1em 1em 2em var(--highlight-text-color); */
}

.shadow-container {
  background: var(--background-color);
  position: relative;
}

.shadow-container.gradient::after {
  content: '';
  position: absolute;
  z-index: -1;
  bottom: -0.75em;
  left: -0.75em;
  height: 90%;
  width: 100%;
  opacity: 1;
  background: linear-gradient(to right, var(--gradient-colors));
  filter: blur(10px);
  transition: all 0.2s;
}
.bar {
  display: flex;
  justify-content: space-between;
}

.border-bottom {
  border-bottom: 1px solid var(--dark-text-color);
}

.bar .title {
  flex: 1;
  padding: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.bar .button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(calc(0.5rem * 2) + 1.5rem);
  width: calc(calc(0.5rem * 2) + 1.5rem);
  color: var(--background-color);
  background: var(--dark-text-color);
  cursor: pointer;
}

.bar .button svg {
  width: 50%;
  height: 50%;
}

.content /deep/ .pill {
  margin: 0 0 0.2em 0;
}

.content /deep/ .pill:last-of-type {
  margin: 0;
}

.content {
  padding: 2em;
}

.content.speaker {
  display: flex;
}

.content.speaker img {
  max-height: 10em;
}

.content.speaker .left {
  display: flex;
  flex-flow: column nowrap;
  margin: 0 2em 0 0;
}

.content.speaker .left .top {
  display: flex;
  margin: 0 0 1em 0;
}

.content.speaker .left .top .gradient-bar {
  /* height: 100%; */
  width: 100%;
  margin: 0 1em 0 0;
  flex: 1;
}

.content.speaker .left .top .name {
  font-size: 3em;
  text-transform: uppercase;
  font-variation-settings: 'rond' 900;
}

/* .content.speaker .left .description >>> p:last-of-type {
  margin: 1em 0 0 0;
} */
</style>
