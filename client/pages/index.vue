<template>
  <div>
    <h1
      v-for="(term, index) in terms"
      :key="`headline-${index}`"
    >
      {{ term[0] }}
    </h1>
  </div>
</template>

<script>
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
    console.log(this.terms)
  },
  computed: {
  }
}
</script>

<style>
h1 {
  text-transform: uppercase;
}
</style>
