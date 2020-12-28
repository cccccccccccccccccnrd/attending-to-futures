<template>
  <div class="stats">
    <p>X {{ stats.mouseX }} Y {{ stats.mouseY }} CLICKS {{ stats.clicks }}</p>
    <p>{{ stats.userAgent }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions({
      init: 'stats/init'
    })
  },
  computed: {
    ...mapGetters({
      stats: 'stats/all'
    })
  }
}
</script>

<style scoped>
.stats {
  font-size: 0.7em;
}
</style>
