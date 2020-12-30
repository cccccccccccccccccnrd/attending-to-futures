<template>
  <div class="visual">
    <canvas
      ref="canvas"
    ></canvas>
    <!-- <p>{{ stats.mouseX }} {{ stats.mouseY }} {{ stats.clicks }}</p> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ctx: null
    }
  },
  mounted () {
    this.ctx = this.$refs.canvas.getContext('2d')
    this.draw()
  },
  methods: {
    draw () {
      this.ctx.fillRect(this.stats.mouseX / 6, this.stats.mouseY / 6, 2, 2)
      window.requestAnimationFrame(this.draw)
    }
  },
  computed: {
    ...mapGetters({
      stats: 'stats/all'
    })
  }
}
</script>

<style scoped>
canvas {
  /* position: absolute; */
  width: 100%;
  margin-top: 1em;
  /* bottom: 1em;
  left: 1em; */
  /* transform: scale(0.8);
  transform-origin: bottom left; */
  /* border: 1px solid black; */
}
</style>
