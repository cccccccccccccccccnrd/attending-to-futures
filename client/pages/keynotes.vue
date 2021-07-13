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
            <div
              class="name"
              v-html="keynote.name"
            >
              <!-- <p>{{ keynote.name }}</p> -->
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
        name: 'Neema Githere',
        description: '<p>Neema Githere (<a href="https://www.instagram.com/take.back.theinternet/" target="_blank">@take.back.theinternet</a>) is an indigenous-African guerilla theorist & curator.</p><p>Originally from Nairobi, Kenya their work explores Indigenous cybernetics  and love as a method of transportation. A process synonymous with their experimental practice entitled "data healing" that seeks to zoom in on the intersections between technology, nature and spirituality. Through their holistic view on these diverse fields,  they aim to find ways for combatting the “data trauma” – a term conceived by Olivia M. Ross – which saturates our digital world. Other projects of Neema’s include Afropresentism (a somatic practice and genre  which encompasses digital diasporic cultural production in the here and now). Furthermore, they are part of the ‘Radical Love Consciousness’ collective that focuses on re-indigenization through grassroots learning networks.</p>',
        image: 'neema-githere.jpg'
      }, {
        name: 'Mindy Seu',
        description: '<p><a href="https://www.mindyseu.com/" target="_blank">Mindy Seu</a> (<a href="https://www.instagram.com/mindyseu/" target="_blank">@mindyseu</a>) is a designer, researcher and Assistant Prof. at Rutgers Mason School of the Arts, New Brunswick, and Yale School of Art, New Haven.</p> <p class="full">She connects topics of racial, social, and environmental justice to digital archiving, coding, software, and graphic design. As a fellow at the Harvard Law School\'s Berkman Klein Center for the Internet & Society, she began an archive of global cyberfeminism spanning three decades. She has also been a fellow at the Internet Archive, co-organizing the Arts Track of the inaugural Decentralized Web Summit. Formerly she was a designer on 2×4\'s Interactive Media team and the Museum of Modern Art’s in-house design studio.</p>',
        image: 'mindy-seu.jpg'
      }, {
        name: 'Lisa Baumgarten <br> & Imad Gebrayel',
        description: '<p><a href="https://lisabaumgarten.de/Info" target="_blank">Lisa Baumgarten</a> (<a href="https://www.instagram.com/lis.baum/" target="_blank">@lis.baum</a>) is a Designer, Researcher and Lecturer. She currently offers seminars in design history and practice at UdK Berlin, HfK Bremen, and HTW Berlin. In 2019 she co-founded the research platform Teaching Design – a collectively gathered bibliography focusing on design education from intersectional feminist & decolonial perspectives. In this context Lisa investigates the potential of conversational formats as means to transform design education. Next to her creative practice Lisa is doing her second M.A. at in Cultural Studies at HU Berlin. Her current M.A. research focuses on design education, its entanglements with neoliberalism and student activism within design schools.</p> <p><a href="https://www.imadgebrayel.com/" target="_blank">Imad Gebrayel</a> <a href="https://www.instagram.com/imadgebrayel/" target="_blank">@imadgebrayel</a> is a Designer, Ph.D candidate in European Ethnology at HU Berlin, and lecturer at UdK Berlin, HfK Bremen, and design Akademie Berlin. He investigates how designers can reposition their work, make space for alternative discourses, and abstain from recolonizing cultural experiences. His current PhD research is centered around negotiations of memory and identifications in Sonnenallee - also known as the Arab street of Berlin. Within design research, Imad looks at identity representation using examples from interdisciplinary practices contributing to an Orientalist, reductivist gaze, and propagating Othering.</p>',
        image: 'baumgarten-gebrayel.jpg'
      }, {
        name: 'Luiza Prado de O. Martins',
        description: '<p><a href="https://www.luiza-prado.com/" target="_blank">Dr. Luiza Prado de O. Martins</a> (<a href="https://www.instagram.com/luizap/" target="_blank">@luizap</a>) is an artist, writer, and researcher whose work examines themes around fertility, reproduction, coloniality, gender, and race.</p><p>In her doctoral dissertation she approaches the control over fertility and reproduction as a foundational biopolitical gesture for the establishment of the colonial/modern gender system, theorizing the emergence of ‘technoecologies of birth control’ as a framework for observing—and resisting, disrupting, troubling—colonial domination. Her ongoing artistic research project, “A Topography of Excesses,” looks into encounters between human and plant beings within the context of herbalist reproductive medicine, approaching these practices as expressions of radical care. Since 2019, she has broadened the scope of this research, developing a body of work that offers a critique of the racist concept of ‘overpopulation’ in the context of the current climate crisis. She is part of the curatorial board of transmediale 2021, is a lecturer at the Institute for Art in Context at the University of the Arts Berlin, and an assistant professor and vice-director of the Centre for Other Worlds at the Lusófona University in Lisbon. She is a founding member of Decolonising Design and based in Berlin.</p>',
        image: 'luiza-prado.jpg'
      }, {
        name: 'Danah Abdulla',
        description: '<p><a href="https://www.dabdulla.com/" target="_blank">Danah Abdulla</a> (<a href="https://www.instagram.com/danah.abdulla/" target="_blank">@danah.abdulla</a>) is a designer, educator, and researcher—not in any particular order but always all three.</p><p>She is Programme Director of Graphic Design at Camberwell, Chelsea, and Wimbledon Colleges of Art (University of the Arts London). Danah holds a Ph.D. in Design from Goldsmiths, University of London and is a founding member of the Decolonising Design platform. In 2010, she founded Kalimat Magazine, an independent, nonprofit publication about Arab thought and culture. Her research focuses on decolonising design, possibilities of design education, design culture(s) with a focus on the Arab region, the politics of design, publishing, and social design.</p>',
        image: 'danah-abdulla.jpg'
      }, {
        name: 'Silvy Chakkalakal',
        description: '<p><a href="https://www.euroethno.hu-berlin.de/de/institut/personen/chakkalakal" target="_blank">Silvy Chakkalakal</a> is a Junior Professor at the Institute of European Ethnology and at the Center of Transdisciplinary Gender Studies at Humboldt-Universität zu Berlin.</p><p>She teaches in the fields of postcolonial and gender studies, anthropology and literature, popular culture and aesthetics. She is the author of Die Welt in Bildern. Erfahrung und Evidenz in Friedrich J. Bertuchs \'Bilderbuch für Kinder\' (1790-1830) (Wallstein 2014). Her second monograph, Indienliebe. Die frühe Ethnographie und ihre Bilder is due to be published by Kadmos in 2021. Her research focus lies on questions of creativity, cooperation, time and temporality in cultural anthropology, with special interest on anthropology’s socio-political engagements. Currently, she is working on ethnographic projects on education, antiracism and decoloniality as well as anthropology of the future.</p>',
        image: 'silvy-chakkalakal.jpg'
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
  margin: 0 0 1em 0;
}

.keynote .name {
  margin: 0 1em 0 0;
  font-size: 1.5em;
  text-transform: uppercase;
}

.keynote .gradient-bar {
	display: none;
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
