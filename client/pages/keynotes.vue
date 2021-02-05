<template>
  <div class="page page-keynotes no-padding-pls">
    <div class="keynotes">
      <div
        v-for="(keynote, index) in keynotes"
        :key="`keynote-${index}`"
        class="keynote"
      >
        <div class="left">
          <div class="top">
            <div class="name">
              <p>{{ keynote.name }}</p>
            </div>
            <div
              class="gradient-bar"
              :style="`background: linear-gradient(${deg}deg, var(--gradient-colors));`"
            ></div>
          </div>
          <div
            class="description"
            v-html="keynote.description"
          ></div>
        </div>
        <div>
          <div class="image">
            <img
              :src="require(`@/assets/${keynote.image}`)"
              style="filter: grayscale(100);"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="appendix">
      <p>More keynotes to be announced soon!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      keynotes: [{
        name: 'Mindy Seu',
        description: '<p><a href="https://www.mindyseu.com/" target="_blank">Mindy Seu</a> <a href="https://www.instagram.com/mindyseu/" target="_blank">@mindyseu</a> is a designer, researcher and Assistant Prof. at Rutgers Mason School of the Arts, New Brunswick, and Yale School of Art, New Haven.</p> <p class="full">She connects topics of racial, social, and environmental justice to digital archiving, coding, software, and graphic design. As a fellow at the Harvard Law School\'s Berkman Klein Center for the Internet & Society, she began an archive of global cyberfeminism spanning three decades. She has also been a fellow at the Internet Archive, co-organizing the Arts Track of the inaugural Decentralized Web Summit. Formerly she was a designer on 2×4\'s Interactive Media team and the Museum of Modern Art’s in-house design studio.</p>',
        image: 'mindy-seu.jpg'
      }]
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      stats: 'stats/all'
    }),
    deg () {
      if (!process.browser) return
      return ((this.stats.mouseX - 45) / (window.innerWidth - 45) * ((90 + 45) - 45) + 45)
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.left {
  max-width: 600px;
  margin: 0 2em 0 0;
}

.keynotes {
  display: flex;
  flex-flow: column nowrap;
}

.keynote {
  display: flex;
  padding: 1em;
  border-bottom: 1px solid var(--dark-text-color);
}

.keynote .top {
  display: flex;
  align-items: center;
  margin: 0 0 1em 0;
}

.keynote .name {
  margin: 0 1em 0 0;
  font-size: 1.5em;
  text-transform: uppercase;
}

.keynote .gradient-bar {
  height: 1.3em;
  width: 100%;
  flex: 1;
}

.keynote .description >>> p {
  margin: 1em 0 0 0;
}

.keynote .description >>> .full {
  /* display: none; */
}

.keynote:hover >>> .full {
  display: block;
}

.keynote .image {
  position: relative;
}

/* .keynote .image::after {
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
} */

.keynote .image img {
  max-width: 100%;
  max-height: 10em;
}

.appendix {
  padding: 1em;
}

@media screen and (max-width: 450px) {
  .keynote {
    flex-flow: column-reverse;
  }

  .keynote .image img {
    max-height: initial;
  }
}
</style>
