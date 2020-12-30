<template>
  <div class="stats">
    <p>{{ stats.mouseX }} {{ stats.mouseY }} {{ stats.clicks }}</p>
    <p class="hidden">{{ stats.navigator ? stats.navigator.userAgent : '' }}</p>
    <!-- <p class="hidden">{{ stats.navigator ? stats.navigator.connection : '' }}</p -->
    <p class="hidden">{{ stats.navigator ? stats.navigator.languages : '' }}</p>
    <visual
      class="hidden"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Visual from '@/components/Visual.vue'

export default {
  components: {
    Visual
  },
  data () {
    return {}
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
  padding: 16px;
}

.stats:hover {
  cursor: wait;
}

.stats:hover > * {
  display: block;
}

.hidden {
  display: none;
}
</style>
