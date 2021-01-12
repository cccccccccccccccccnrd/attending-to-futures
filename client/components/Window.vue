<template>
  <div
    class="window"
    :style="`max-width: ${width}px;`"
  >
    <div
      class="bar"
      :class="{ 'border-bottom': open }"
    >
      <div class="title">{{ title }}</div>
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
      v-if="open"
      class="content"
      v-html="content"
    ></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'content', 'width'],
  components: {},
  data () {
    return {
      open: false
    }
  },
  mounted () {},
  methods: {},
  computed: {}
}
</script>

<style scoped>
.window {
  width: 100%;
  max-width: 600px;
  border: 1px solid black;
  background: rgb(200, 200, 200);
  box-shadow: 1em 1em 2em blue;
}

.bar {
  display: flex;
  justify-content: space-between;
}

.border-bottom {
  border-bottom: 1px solid black;
}

.bar .title {
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
  color: white;
  background: black;
  cursor: pointer;
}

.bar .button svg {
  width: 50%;
  height: 50%;
}

.content {
  padding: 2em;
}
</style>
