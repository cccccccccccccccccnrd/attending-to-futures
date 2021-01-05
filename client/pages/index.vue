<template>
  <div>
    <h1
      v-for="(term, index) in terms"
      :key="`headline-${index}`"
    >
      {{ term[0] }}
    </h1>
    <img
      v-drag="onDrag"
      style="opacity: 1"
      id="asset-1"
      src="~/assets/design-is-a-service.png"
      class="drag"
    >
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      terms: Array.apply(null, Array(3)).map((e) => ['attending to', 'futures']),
      index: 0,
    }
  },
  mounted () {
    setInterval(() => {
      this.terms[this.index] = this.terms[this.index].reverse()
      if (this.index < this.terms.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
    }, 100)
  },
  computed: {
    ...mapActions({
      socket: 'socket/socket',
      stats: 'stats/all'
    })
  },
  methods: {
    ...mapActions({
      send: 'socket/send',
    }),
    ...mapMutations({
      setElement: 'drags/setElement',
    }),
    onDrag (event) {
      this.send(['drag', event])
    }
  }
}
</script>

<style>
h1 {
  text-transform: uppercase;
}
</style>
