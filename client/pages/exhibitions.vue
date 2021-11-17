<template>
  <ul class="page page-exhibition">
    <li v-for="(exhibition, i) in exhibitions" :key="i">
      <nuxt-link :to="'/' + exhibition.link">
        <h2>{{exhibition.title}}</h2>
        <h3>{{exhibition.subtitle}}</h3>
        <p>{{exhibition.designers ? list(exhibition.designers) : ''}}</p>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: { Logo },
  data() {
    return {
      exhibitions: [
        {
          title: 'Mariah',
          subtitle: 'Acts of Resistance',
          designers: ['Heather Snyder Quinn', 'Adam DelMarcelle'],
          link: 'mariah'
        },
        {
          title: 'Unrealized Archive',
          subtitle: 'Future Histories',
          designers: ['Jon Sueda', 'Chris Hamamoto'],
          link: 'unrealized-archive'
        },
        {
          title: 'Challenge',
          designers: ['Åsa Ståhl', 'Bianca Elzenbaumer', 'Eeva Houtbeckers', 'Svenja Keune', 'Evren Uzer', 'Saoirse Higgins', 'Tania Pérez-Bustos'],
          subtitle: 'How can designers produce excess in their home environment – and share it in a fair way?',
          link: 'challenge'
        },
        {
          title: 'Audio Walk',
          designers: [''],
          subtitle: '',
          link: 'audio-walk'
        }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    list(array, glue = 'and') {
      return array.reduce(
        (list, item, i, arr) => list + (i === arr.length - 1 ? ` ${glue} ` : ', ') + item
      )
    },
  }
}
</script>

<style>
main, .page {
  min-height: initial !important;
}
</style>
<style scoped>
.page {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  list-style: none;
  flex-direction: column;
}
li {
  width: 100%;
  flex: 1;
}
li + li {
  border-top: 1px solid black;
}
li a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
  height: 100%;
  width: 100%;
  font-size: 1.5em;
}
li a:hover {
  background: black;
  color: white;
}
li a * {
  color: inherit;
  text-align: center;
}
h2 {
  font-size: 2rem;
}
h3 {
  margin-top: 0.25em;
  margin-bottom: 1em;
  font-size: 1.25rem;
}
p {
  font-size: 0.875rem;
}
</style>
