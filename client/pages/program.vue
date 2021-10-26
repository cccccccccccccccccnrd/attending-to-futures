<template>
  <div class="page page-program">
    <div class="">
      <div class="button-container">
        <h1>Program</h1>
        <div>
          <button
            v-for="day in days"
            :key="day.key"
            @click="setDate(day.date)"
            :class="{ active: selectedDate === day.date }"
          >
            {{
              day.date.toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })
            }}
          </button>
        </div>
      </div>
      <Calendar ref="calendarContainer" :tracks="tracks" :events="events" :hues="hues" />
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Program',
  components: {
    Calendar,
  },
  computed: {
    days() {
      const d = Array.from(new Set(this.events.map((e) => e.start.split('T')[0])))
      return d.map((e, i) => ({ key: i, date: new Date(e) }))
    },
  },
  methods: {
    setDate(date) {
      this.$refs.calendarContainer.setDate(date)
      this.selectedDate = date
      setTimeout(() => this.$refs.calendarContainer.arrangeTracks(), 100)
    },
    setInitialDate() {
      const initialDate = this.days.reduce((acc, e, i, array) => {
        return new Date().toDateString() == e.date.toDateString() ||
          Date.parse(e.date) < Date.parse(acc.date)
          ? e
          : acc
      }).date
      this.setDate(initialDate)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setInitialDate()
    })
  },
  updated() {
    this.setDate(this.selectedDate)
  },
  data() {
    return {
      selectedDate: null,
      hues: {
        default: 'hsl(56, 61%, 55%)',
        keynote: 'hsl(30, 89%, 60%)',
        talk: 'hsl(102, 26%, 63%)',
        workshop: 'hsl(240, 100%, 50%)',
        performance: 'hsl(102, 26%, 33%)',
        ['round table']: 'hsl(240, 100%, 20%)',
        exhibition: 'hsl(320, 50%, 40%)',
        break: 'hsl(0, 0%, 50%)',
      },
      tracks: {
        1: 'Contested Histories',
        2: 'Radical Futures',
        3: 'Critical Practices',
        4: 'Online Exhibition',
      },
      events: [
        // ALL DAY
        {
          title: 'Online Exhibition',
          start: '2021-11-18T00:00',
          end: '2021-11-18T24:00',
          type: 'exhibition',
          trackId: '4',
        },
        {
          title: 'Online Exhibition',
          start: '2021-11-19T00:00',
          end: '2021-11-19T24:00',
          type: 'exhibition',
          trackId: '4',
        },
        {
          title: 'Online Exhibition',
          start: '2021-11-20T00:00',
          end: '2021-11-20T24:00',
          type: 'exhibition',
          trackId: '4',
        },
        {
          title: 'Mariah: Acts of Resistance',
          speaker: ['Heather Snyder Quinn', 'Adam DelMarcelle'],
          start: '2021-11-18T19:00',
          end: '2021-11-18T20:00',
          type: 'exhibition',
          trackId: '1',
          abstract: `A documentary short film about an augmented reality experience, <em>Mariah</em> narrates stories of injustice by exposing the sinister funding of big Pharma, the blind acceptance of capital by cultural institutions, and the implications of technocratic power. We fill the halls of historic museums with the voices of those gone and those left to carry the burden of loss, staking claim to expose the power structures' status quo. Mariah is our witness, and she is our actor of protest.<br><br>The film is accompanied by a corresponding publication and poster that can be activated by the <em>Mariah</em> smartphone app.`,
        },
        {
          title: 'Unrealized Archive: Future Histories',
          speaker: ['Jon Sueda', 'Chris Hamamoto'],
          start: '2021-11-18T19:00',
          end: '2021-11-18T20:00',
          type: 'exhibition',
          trackId: '2',
          abstract: `All Possible Futures: <em>Unrealized Archive</em>, uncovers »unrealized« graphic design projects that were never produced but are deserving of serious discussion. For ATTENDING [TO] FUTURES we will create an online exhibition showcasing projects created by designers in response to alternative futures that didn't come to pass.<br><br>This project would explore the development of a counter-factual history, challenge hegemonic structures in graphic design discipline and construct a more inclusive future history.`,
        },
        {
          title: 'Challenge: How can designers produce excess in their home environment – and share it in a fair way?',
          speaker: ['Åsa Ståhl', 'Bianca Elzenbaumer', 'Eeva Houtbeckers', 'Svenja Keune', 'Evren Uzer', 'Saoirse Higgins', 'Tania Pérez-Bustos'],
          start: '2021-11-18T19:00',
          end: '2021-11-18T20:00',
          type: 'exhibition',
          trackId: '3',
          sharedTrack: '1',
          abstract: `An international team of lecturers created virtual field trips to and around their living spaces and met up with students to discuss how they use their design approach to work with fair share of domestic surplus. Bianca Elzenbaumer, Eeva Houtbeckers, Svenja Keune, Evren Uzer, Saoirse Higgins, and Tania Pérez-Bustos take 3rd year BA Design+Change students - and now us - on a tour across continents, in this project initiated and arranged by Åsa Ståhl, senior lecturer in design and course coordinator of Design+Change, Autumn 2020. For more, including student's answers to the challenge, see: https://www.instagram.com/design_lnu/`
        },
        {
          title: 'Attending [to] Futures. Student Works.',
          speaker: ['KISD Students'],
          start: '2021-11-18T19:00',
          end: '2021-11-18T20:00',
          type: 'exhibition',
          trackId: '3',
          sharedTrack: '2',
          abstract: `Displayed on site.`
        },
        {
          title: 'Mariah: Acts of Resistance',
          speaker: ['Heather Snyder Quinn', 'Adam DelMarcelle'],
          start: '2021-11-19T19:00',
          end: '2021-11-19T20:00',
          type: 'exhibition',
          trackId: '1',
          abstract: `A documentary short film about an augmented reality experience, Mariah narrates stories of injustice by exposing the sinister funding of big Pharma, the blind acceptance of capital by cultural institutions, and the implications of technocratic power. We fill the halls of historic museums with the voices of those gone and those left to carry the burden of loss, staking claim to expose the power structures' status quo. Mariah is our witness, and she is our actor of protest.<br><br>The film is accompanied by a corresponding publication and poster that can be activated by the Mariah smartphone app.`,
        },
        {
          title: 'Unrealized Archive: Future Histories',
          speaker: ['Jon Sueda', 'Chris Hamamoto'],
          start: '2021-11-19T19:00',
          end: '2021-11-19T20:00',
          type: 'exhibition',
          trackId: '2',
          abstract: `All Possible Futures: <em>Unrealized Archive</em>, uncovers »unrealized« graphic design projects that were never produced but are deserving of serious discussion. For ATTENDING [TO] FUTURES we will create an online exhibition showcasing projects created by designers in response to alternative futures that didn't come to pass.<br><br>This project would explore the development of a counter-factual history, challenge hegemonic structures in graphic design discipline and construct a more inclusive future history.`,
        },
        {
          title: 'Challenge: How can designers produce excess in their home environment – and share it in a fair way?',
          speaker: ['Åsa Ståhl', 'Bianca Elzenbaumer', 'Eeva Houtbeckers', 'Svenja Keune', 'Evren Uzer', 'Saoirse Higgins', 'Tania Pérez-Bustos'],
          start: '2021-11-19T19:00',
          end: '2021-11-19T20:00',
          type: 'exhibition',
          trackId: '3',
          sharedTrack: '1',
          abstract: `An international team of lecturers created virtual field trips to and around their living spaces and met up with students to discuss how they use their design approach to work with fair share of domestic surplus. Bianca Elzenbaumer, Eeva Houtbeckers, Svenja Keune, Evren Uzer, Saoirse Higgins, and Tania Pérez-Bustos take 3rd year BA Design+Change students - and now us - on a tour across continents, in this project initiated and arranged by Åsa Ståhl, senior lecturer in design and course coordinator of Design+Change, Autumn 2020. For more, including student's answers to the challenge, see: https://www.instagram.com/design_lnu/`
        },
        {
          title: 'Attending [to] Futures. Student Works.',
          speaker: ['KISD Students'],
          start: '2021-11-19T19:00',
          end: '2021-11-19T20:00',
          type: 'exhibition',
          trackId: '3',
          sharedTrack: '2',
          abstract: `Displayed on site.`
        },
        {
          title: 'Mariah: Acts of Resistance',
          speaker: ['Heather Snyder Quinn', 'Adam DelMarcelle'],
          start: '2021-11-20T19:00',
          end: '2021-11-20T20:00',
          type: 'exhibition',
          trackId: '1',
          abstract: `A documentary short film about an augmented reality experience, Mariah narrates stories of injustice by exposing the sinister funding of big Pharma, the blind acceptance of capital by cultural institutions, and the implications of technocratic power. We fill the halls of historic museums with the voices of those gone and those left to carry the burden of loss, staking claim to expose the power structures' status quo. Mariah is our witness, and she is our actor of protest.<br><br>The film is accompanied by a corresponding publication and poster that can be activated by the Mariah smartphone app.`,
        },
        {
          title: 'Unrealized Archive: Future Histories',
          speaker: ['Jon Sueda', 'Chris Hamamoto'],
          start: '2021-11-20T19:00',
          end: '2021-11-20T20:00',
          type: 'exhibition',
          trackId: '2',
          abstract: `All Possible Futures: <em>Unrealized Archive</em>, uncovers »unrealized« graphic design projects that were never produced but are deserving of serious discussion. For ATTENDING [TO] FUTURES we will create an online exhibition showcasing projects created by designers in response to alternative futures that didn't come to pass.<br><br>This project would explore the development of a counter-factual history, challenge hegemonic structures in graphic design discipline and construct a more inclusive future history.`,
        },
        {
          title: 'Challenge: How can designers produce excess in their home environment – and share it in a fair way?',
          speaker: ['Åsa Ståhl', 'Bianca Elzenbaumer', 'Eeva Houtbeckers', 'Svenja Keune', 'Evren Uzer', 'Saoirse Higgins', 'Tania Pérez-Bustos'],
          start: '2021-11-20T19:00',
          end: '2021-11-20T20:00',
          type: 'exhibition',
          trackId: '3',
          sharedTrack: '1',
          abstract: `An international team of lecturers created virtual field trips to and around their living spaces and met up with students to discuss how they use their design approach to work with fair share of domestic surplus. Bianca Elzenbaumer, Eeva Houtbeckers, Svenja Keune, Evren Uzer, Saoirse Higgins, and Tania Pérez-Bustos take 3rd year BA Design+Change students - and now us - on a tour across continents, in this project initiated and arranged by Åsa Ståhl, senior lecturer in design and course coordinator of Design+Change, Autumn 2020. For more, including student's answers to the challenge, see: https://www.instagram.com/design_lnu/`
        },
        {
          title: 'Attending [to] Futures. Student Works.',
          speaker: ['KISD Students'],
          start: '2021-11-20T19:00',
          end: '2021-11-20T20:00',
          type: 'exhibition',
          trackId: '3',
          sharedTrack: '2',
          abstract: `Displayed on site.`
        },
        // THURSDAY
        {
          title: 'Welcome Address',
          start: '2021-11-18T10:00',
          end: '2021-11-18T10:30',
          abstract: `<ul><li>Prof. Dr. Sylvia Heuchemer (Vice President for Academic Affair, TH Köln)</li><li>Johanna Mehl, Prof. Dr. Carolin Höfler & Prof. Michael Gais (Köln International School of Design, TH Köln)</li></ul>`,
        },
        {
          title: 'Archives of Intervention – Im/Possibilities of Narrating and Anticipating the Future',
          speaker: ['Silvy Chakkalakal'],
          start: '2021-11-18T10:30',
          end: '2021-11-18T11:30',
          type: 'keynote',
          abstract: `»In the field of science fiction literature the future appears to be a proactive and interventionist phenomenon. It does not seem to be anything we passively steer to, instead the future is generated and designed in an active manner. Drafting and discarding futures (Zukünfte entwerfen und verwerfen) occur not seldomly simultaneously. For instance, a programmatic vision of the future can be read as criticism of the present status quo by offering a redraft of this particular future. This makes apparent that futures are unequally distributed and the capacity to aspire (Arjun Appadurai) is attached to various resources, such as economic, cultural, and gendered capital. In this talk, I will discuss different interventionist and anticipatory narrations such as Octavia Butler’s novel ›Parable of the Sower‹; video interviews ›The Archive of Refuge‹, curated by Carolin Emcke and Manuela Bojadžijev at HKW, Berlin; and interventions of a three-semester ethnographic MA project about the Humboldt Lab (Humboldt University’s exhibition space in the newly opened Humboldt Forum, Berlin). What are the activating powers of these alternative archives? What are the tactics and fabrics of anticipation and intervention? These questions shall lead to a discussion about the possibilities of a public scholarship and its engagement in critical future-making.«`,
        },
        {
          speaker: ['Sven Quadflieg'],
          title: 'Weird Problems – Rethinking Privileged Design?',
          start: '2021-11-18T11:30',
          end: '2021-11-18T12:15',
          type: 'talk',
          trackId: '1',
          abstract: `The history of design has produced countless artifacts that exclude or otherwise discriminate against people – and it is quite obvious to identify reasons for this problem: the structure of those who design and the rather undefined process of how they do it.<br><br>This leads to the question: Don’t we still need to think of the design process as more rigorous and regimented – and establish models that ensure we have a design »for all«? Wouldn’t we need to demand and promote critical discourse on ethics and elaborate theoretical foundations for ethical decision-making?`,
        },
        {
          speaker: ['Marius Förster'],
          title: 'Attenuating (to) Futures?',
          start: '2021-11-18T11:30',
          end: '2021-11-18T12:15',
          type: 'talk',
          trackId: '2',
          abstract: `Based on critiques of the paradigm of the nature-culture divide, contemporary struggles seem to be nothing less than an onto-ecological quest. For earthly survival, it is necessary to question core assumptions of »our« being-with-the-world. Through the lens of Viveiros de Castro, Shamanism shed light on the multiplicity of histories of world-making. It is a fruitful path to reflect on »our« struggles – to stay with the trouble (Haraway) of processual thinking, designerly aspirations, and equivocations.`,
        },
        // {
        //   speaker: ['Johannes Breuer', 'Marlene Bart', 'Stefanie Holzheu'],
        //   title: 'The Atlas of Data Bodies – Cross-Institutional Design Education.',
        //   start: '2021-11-18T11:30',
        //   end: '2021-11-18T12:15',
        //   type: 'talk',
        //   trackId: '3',
        //   abstract: `What data do we collect (consciously and unconsciously) about ourselves and how is it presented? The project Atlas of Data Bodies deals with the de-, re-, and new construction of body images in the digital age and takes place in a cooperation between Bauhaus-Universität Weimar and Futurium Berlin. It includes a cross-faculty seminar at the Bauhaus-University, an associated digital exhibition at the Futurium Berlin and an art- and design-journal, which is going to be published annually.`
        // },
        {
          title: 'Coffee Break',
          start: '2021-11-18T12:15',
          end: '2021-11-18T12:30',
          type: 'break',
        },
        {
          speaker: ['Becky Nasadowski'],
          title:
            'Design Narratives, the White Spatial Imaginary, and the Symbolic Economies of Cities',
          start: '2021-11-18T12:30',
          end: '2021-11-18T13:15',
          type: 'talk',
          trackId: '1',
          abstract: `This talk argues the neoliberal ideologies reproduced within graphic design culture are a logical contribution to the racialized economies of gentrification, helping materialize what George Lipsitz refers to as the »white spatial imaginary«. Designers craft imagery and atmospheres, bolstering white middle-class narratives that justify and enforce hierarchies of socio-spatial belonging. By examining these discourses and their implementation, I aim to make tangible design's capacity for violence.`,
        },
        {
          speaker: ['Mushon Zer-Aviv'],
          title: 'The Ideas Lying Around',
          start: '2021-11-18T12:30',
          end: '2021-11-18T13:15',
          type: 'talk',
          trackId: '2',
          abstract: `»When crisis occurs, the actions that are taken depend on the ideas that are lying around.«<br>Both Milton Friedman and Naomi Klein see crisis as a transformative moment. What are the new affordances and anti-affordances exposed by this pandemic? How can we exploit them to design the day after the pandemic to promote more sustainable, equatable, and just futures?<br>The talk will touch on some of the theory behind the practice and give a taste of previous speculative collaborations and workshops with policy makers and artists.`,
        },
        {
          speaker: [
            'SpecSpace / Anke Haarmann',
            'Frieder Bohaumilitzky',
            'Tom Bieling',
            'Torben Koerschkes',
          ],
          title: 'Design of Unrest: Right-wing Metapolitics – Paralogy – Knowledge Spaces – Chaos',
          start: '2021-11-18T12:30',
          end: '2021-11-18T13:15',
          type: 'performance',
          trackId: '3',
          abstract: `The mobilization attempts of the New Right are characterized by numerous discourse sovereignty appropriation tactics. This also applies to the re/interpretation and staging of symbolic spaces. How can the authoritarian appropriation of the right be countered by design strategies?<br><br>The starting point for the thematic discussion with and in this lecture-performance is a bouncy castle. As a materialized metaphor, the bouncy castle brings together our different research perspectives in productive friction. The bouncy castle itself symbolizes the observation that the self-image of a society is increasingly negotiated on the basis of and performed in symbolic spaces. »Bouncing« in this sense can be understood as a breaking out of rigid knowledge productions, as paralogy – displaced logos. The childish bouncing undermines the adult (academic) epistemological seriousness. Insight takes off, gets out of balance and when it arrives again it easily finds itself somewhere else, offset.<br><br>The bouncy castle can also point to aspects of a chaotic space, that is, to interdependencies, the recognition of complexity and unpredictability, and in this respect also poses the question of how we move in and through such spaces. For a movement of reduction and authoritarian appropriation does not fit this diverse and complex world. The bouncy castle is an attempt to develop an understanding of places as places of knowledge, of spaces as spaces of negotiation, of things as things of meaning. What (epistemological, design, theoretical) tools do we have at our disposal? What tools can we – as designers, artists, philosophers, social scientists– make available without these, in turn, being rigidly fixed, predetermined?<br><br>A specially made version of Hambach Castle (which is at the same time a symbol of »German democracy« and right-wing appropriation) as a bouncy castle – for this performative lecture – presents itself as a deliberately wobbly materialized demand to bring unrest into knowledge and entrenched thought practices.`,
        },
        {
          title: 'Lunch Break',
          start: '2021-11-18T13:15',
          end: '2021-11-18T14:30',
          type: 'break',
        },
        {
          title: 'Welcome Back Address',
          start: '2021-11-18T14:30',
          end: '2021-11-18T14:45',
        },
        {
          speaker: ['Kim Tran', 'Fernande Bodo'],
          title: '»Architecture is a white discipline« - A Critical Rethinking of Design Education',
          start: '2021-11-18T14:45',
          end: '2021-11-18T16:15',
          type: 'workshop',
          trackId: '1',
          abstract: `Who is silenced or invisible because their work is labeled as that of »the other«? Whose perspective is considered creative? Are there patterns of injustice within design education and how do they lead to oppression and underrepresentation within the creative practice? Design education is clearly not free of racism and follows a white narrative.<br><br> In a workshop, Kim Ha and Fernande aim to explore important questions about the narratives being taught and ultimately translated into space.`,
        },
        {
          speaker: ['Mushon Zer-Aviv'],
          title: 'The Ideas Lying Around: A Speculative Policy Workshop',
          start: '2021-11-18T14:45',
          end: '2021-11-18T16:15',
          type: 'workshop',
          trackId: '2',
          abstract: `When crisis occurs, the actions that are taken depend on the ideas that are lying around."<br>Both Milton Friedman and Naomi Klein see crisis as a transformative moment. What are the new affordances and anti-affordances exposed by this pandemic? How can we exploit them to design the day after the pandemic to promote more sustainable, equatable and just futures?<br><br>The workshop will expose participants to the 4 Futures and backcasting methodology and direct them towards the new risks and opportunities brought forward by the pandemic.`,
        },
        {
          speaker: ['Mira Schmitz'],
          title: '»Design: An Intersectional Entanglement« - Redesigning Difference',
          start: '2021-11-18T14:45',
          end: '2021-11-18T16:15',
          type: 'workshop',
          trackId: '3',
          abstract: `The workshop attendees will collectively redesign well-intentioned but discriminatory posters and reflect on their own designs from an intersectional perspective.<br><br>Its aim is to create a sensitivity for potentially discriminatory designs and find creative alternatives. There will be a lot of room for discussions and reflections.`,
        },
        {
          speaker: ['Lauren Williams'],
          title: 'Artifacts from/for a Liberated Detroit',
          start: '2021-11-18T16:15',
          end: '2021-11-18T17:00',
          type: 'talk',
          trackId: '1',
          abstract: `<em>Artifacts from/for a Liberated Detroit</em> is a collection of objects and experiences from a Detroit without policing, incarceration, jails, prisons, and detention centers. It is an archaeology of an abolitionist future: a gathering of the ubiquitous elements of everyday life from a world without police and incarceration, situated in a domestic space that unfolds a possible abolitionist narrative. Through design, it contends with and challenges the carceral infrastructures that surround us today.`,
        },
        {
          speaker: ['Edith Lázár'],
          title:
            "Out of Stock. A Fashion Journal having 'Nothing to Wear' But Ready to Dress-up the Future",
          start: '2021-11-18T16:15',
          end: '2021-11-18T17:00',
          type: 'talk',
          trackId: '2',
          abstract: `An »out of stock« is simultaneously a provisional state and an end of sorts. Yet, in the larger scheme, who gets to stock-up, how shortages manifest, or how scarcity gets apprehended, are all culturally and geographically embedded. <em>Out of Stock</em> is an artistic project posing as a speculative journal for fashion and design steaming from eastern-European sensibilities. Addressing »scarcity and shortages« as tools for reframing the everyday, it aimed at empowering imaginaries for future(s) ways of living. The project was developed in collaboration with graphic designer Ana Labudović.`,
        },
        {
          speaker: ['Isabella Brandalis', 'Henrique Eira', 'Søren Rosenbak'],
          title: 'Patadesign School: An Exceptional School of Exceptions',
          start: '2021-11-18T16:15',
          end: '2021-11-18T17:00',
          type: 'talk',
          trackId: '3',
          abstract: `<em>The Patadesign School</em> is an autonomous institution that consciously brings out the pataphysical dimension of design, with the mission of offering a critical response to the role of design in the age of the artificial. Ethernity, the School's first edition, will take place in September 2021 (vulg.) and will coordinate between online exchanges and expeditions of design making. In the talk, we will share initial outcomes, challenges, underlying frameworks, and imaginary solutions that emerged.`,
        },
        {
          title: 'Coffee Break',
          start: '2021-11-18T17:00',
          end: '2021-11-18T17:15',
          type: 'break',
        },
        {
          speaker: ['Danah Abdulla'],
          title: 'Designerly ways of knowing: a working inventory of things a designer should know',
          start: '2021-11-18T17:15',
          end: '2021-11-18T18:15',
          type: 'keynote',
          abstract: `Despite the currency of design thinking from the early noughties to today, where design has become the secret weapon of businesses and governments, the designed world looks and feels almost the same. Design thinking does not magically rid the world of bias, it is now masking it under the guise of innovation. Design thinking has crippled designers to generic tools and methods. If you take away the post-it notes, the A3 papers, and the markers, can the designer <em>think?</em><br>Inspired by the late Michael Sorkin’s essay »Two Hundred and Fifty Things an Architect Should Know«, this keynote compiles a list of things designers should know to think and know critically in their commitment to make the world a better place.`,
        },
        {
          title: 'Good Bye',
          start: '2021-11-18T18:15',
          end: '2021-11-18T18:30',
        },
        // {
        //   title: 'Get Together On Site / Dinner & Drinks',
        //   start: '2021-11-18T19:00',
        //   end: '2021-11-18T20:00',
        // },
        // FRIDAY
        {
          title: 'Welcome Address',
          start: '2021-11-19T10:00',
          end: '2021-11-19T10:15',
        },
        {
          speaker: ['Lisa Baumgarten'],
          title:
            'Resonance and Ontological Design: On facilitating and obstructing transformative teaching and learning experiences in design education',
          start: '2021-11-19T10:15',
          end: '2021-11-19T11:15',
          type: 'keynote',
          abstract: `»Institutionalized design education – as a formative stage of life that most future designers will go through – is decisive for the practical and discursive development of the field. Furthermore, channeling Arturo Escobars concept of Ontological Design and the ›relational dimension of life‹ (Escobar, 2018) it is decisive for shaping our present and future. In order to relate, however, we need to feel like the world concerns us – we need to experience ›resonance‹ (Rosa, 2016). According to Rosa, a caring relationship with the world can be facilitated or obstructed by education. Not only in school but also in design education, the way is paved for how we relate to the world and how we want to contribute to shaping the future.<br>So, how can design education mediate that the world concerns all of us?<br>Trying to find words to express my experiences in teaching/learning design I consulted Escobar’s and Rosa’s concepts which – brought together – opened up a new framework for my teaching/learning practice. <br><br>At ›Attending [To] Futures‹ I’d like to invite you to follow me through my thought processes, the hurdles I came across, and the questions that arose.«`,
        },
        {
          speaker: ['Michaela Büsse'],
          title: 'Design Autonomy',
          start: '2021-11-19T11:15',
          end: '2021-11-19T12:00',
          type: 'talk',
          trackId: '1',
          abstract: `»In my contribution, I will discuss design's autonomy as a reflection on and continuation of Arturo Escobar's (2017) decolonial project called ›autonomous design‹. A visual field note from the ›failed‹ land reclamation project Melaka Gateway in Malaysia aids as entry point for proposing an extended reading of design that critically engages the origins and effects of social, material, and economic power structures. My contribution is positioned as a plea for a situated and critical analysis that embraces design as an ambiguous and distributed practice.«`,
        },
        {
          speaker: ['Jaione Cerrato', 'Jon Halls'],
          title: 'Props for Conversation',
          start: '2021-11-19T11:15',
          end: '2021-11-19T12:00',
          type: 'talk',
          trackId: '2',
          abstract: `»We understand design as a social framework for the navigation of outcomes, rather than an outcome in itself. Utilising it as a social tool for critical engagement that goes beyond the institutional realm, we would like to present our views on how design can create the space for others to convey new possibilities. In this spirit, we will present ›Universal Species Suffrage‹, a project where the audience has a chance to create a world where all species have the right to vote and decide how society should function.«`,
        },
        // {
        //   speaker: ['Nina Juric'],
        //   title: 'Design is the Language',
        //   start: '2021-11-19T11:15',
        //   end: '2021-11-19T12:00',
        //   type: 'talk',
        //   trackId: '3',
        // },
        {
          title: 'Coffee Break',
          start: '2021-11-19T12:00',
          end: '2021-11-19T12:15',
          type: 'break',
        },
        {
          speaker: ['Imad Gebrayel'],
          title:
            '(im)possible exits and silenced affects: design futures and disciplinary mobilities',
          start: '2021-11-19T12:15',
          end: '2021-11-19T13:15',
          type: 'keynote',
          abstract:
            'Through the lens of labor, affective futures, and mobilities, this keynote looks into the potential of<em>The Design Exit*&nbsp;</em>with a growing number of designers seeking refuge in other disciplines and design students resisting from within. It challenges divergent imaginations of future-makings by questioning: Whose futures? Whose pasts? Whose guilt? Whose design? Who is attending and who is attended to? Who is silenced and who is silent? Who is affective and who is affected? Who is to stay and who is to exit performative design structures?',
        },
        {
          title: 'Lunch Break',
          start: '2021-11-19T13:15',
          end: '2021-11-19T14:30',
          type: 'break',
        },
        {
          title: 'Welcome Back Address',
          start: '2021-11-19T14:30',
          end: '2021-11-19T14:45',
        },
        {
          speaker: [
            'Design & Oppression Network: Frederick van Amstel',
            'Bibiana Serpa',
            'Marco Mazzarotto',
            'Rafa Angelon',
          ],
          title: 'Wicked Problems, Wicked Designs',
          start: '2021-11-19T14:45',
          end: '2021-11-19T16:15',
          type: 'performance',
          trackId: '1',
          abstract:
            'The proposal is to stage a Theater Forum play on the Attending [To] Futures Youtube-channel, accompanied by a chat debate on colonial relations in design. Theater Forum is a technique developed by Augusto Boal to make structural oppression visible through acting while also rehearsing liberation from oppression. Design & Oppression Network will stage the play and mediate the debate so that the audience can interact with the characters through chat. The characters will wear digital masks built with augmented reality to express the faces of wickedness in design.<br>Theater Forum is the best-known technique from the Theater of the Oppressed, an arsenal of subversive techniques created by Augusto Boal and his collaborators to fight oppression with the whole body. The forum session will be the apex of a collaborative process of investigating and understanding the colonialist oppression in design. The Design & Oppression Network will host weekly rehearsals and laboratories from September to November. Those who are interested in joining the rehearsals and going through the whole process are more than welcome.<br><br>Who: <em>Design & Oppression</em> is a network of students, professors, and practitioners interested in joining forces against any kind of oppression in and through design. The network includes an online weekly reading group, a series of Youtube videos, and an orchestrated participation in design events and conferences. The network is woven by an expanding group of volunteer complicators spread across Brazil. This Theater Forum session will be complicated by Frederick van Amstel (UTFPR), Bibiana Serpa (UFRJ), Marco Mazarotto (UTFPR), and Rafaela Angelon (UTFPR). Learn more about the network at <a href="http://www.designeopressao.org">http://www.designeopressao.org</a>',
        },
        {
          speaker: ['Ayako Takase', 'Heather Snyder Quinn'],
          title: 'Matriarchal Design Futures: A Collective Work in Progress',
          start: '2021-11-19T14:45',
          end: '2021-11-19T16:15',
          type: 'workshop',
          trackId: '2',
          abstract: `What happens when we consider a matriarchal design pedagogy and create a non-hierarchical, non-linear approach to learning? Can the design field change from singular and privileged to more open and collaborative? Can we de-couple design from whiteness, capitalism, and competition? In this workshop, we will co-create an open-source publication with you—a set of holistic guiding principles and aspirations for a collective, matriarchal, anti-exceptional design future.`,
        },
        {
          speaker: [
            'Polymode Studio / Silas Munro',
            'Tasheka Arceneaux',
            'Tanvi Sharma',
            'Brian Johnson',
            'Pierre Bowins',
          ],
          title: 'BIPOC Design History: revolutions, revelations, and educations',
          start: '2021-11-19T14:45',
          end: '2021-11-19T16:15',
          type: 'workshop',
          trackId: '3',
          abstract: `Black Design in America is a part of BIPOC Centered design history courses that shed light on moments of oppression and visibility. This workshop gives designers and educators tools to center previously marginalized designers, cultural figures, particularly Black, Indigenous, and People of Color (BIPOC), in their research, academic classes, and practices.<br><br>After a 30-minute presentation, we will facilitate an hour-long, organic discussion on responses to the critical topics.`,
        },
        {
          speaker: ['Chris Lee'],
          title: 'Centering the Document - Towards a Critical Studio Pedagogy in Graphic Design',
          start: '2021-11-19T16:15',
          end: '2021-11-19T17:00',
          type: 'talk',
          trackId: '1',
          abstract: `»What if graphic design history were to center the banal genre of the document? What would this mean for how design students and practitioners imagine themselves and what they do? Counterposing »Publicity« (think posters and websites) to ›Immutability‹ (think passports and money) figures a ground against which to posit on a third—›Poetry‹—charged by what Paulo Freire calls ›naming the world‹. It speculates on the possibility of a pedagogy oriented against the capitalist and colonial entanglements of the others.«`,
        },
        {
          speaker: ['Kalyani Jayant Tupkary'],
          title: 'Calendar Collective',
          start: '2021-11-19T16:15',
          end: '2021-11-19T17:00',
          type: 'talk',
          trackId: '2',
          abstract: `»<em>Calendar Collective</em> is a living archive of alternate calendars (real and imagined) traced through voicemails. It is a design-led research investigation that challenges the normative understanding of time as linear, objective, and neutral. I use the calendar as a subversive tool to dismantle current hegemonic time structures and rebuild plural structures. As a designer from a previously colonized country, I employ calendar as a decolonization tool to render time - one of the most invisible epistemologies in future work - visible.«`,
        },
        {
          speaker: ['Chris Hamamoto', 'Federico Pérez Villoro'],
          title: 'Fugitive Images',
          start: '2021-11-19T16:15',
          end: '2021-11-19T17:00',
          type: 'talk',
          trackId: '3',
          abstract: `This lecture will explore computational models for facial recognition and the datasets with which they are trained. Putting into question the very act of organizing images of people based on conceptual classes, and the in-transferability of meaning between images and concepts and the amplification of social biases present in such processes. The artists will present artifacts at the margins of algorithmic vision and speculate on escaping the logics of computational representation`,
        },
        {
          title: 'Coffee Break',
          start: '2021-11-19T17:00',
          end: '2021-11-19T17:15',
          type: 'break',
        },
        {
          title: 'A List of Longings',
          speaker: ['Luiza Prado de O. Martins'],
          start: '2021-11-19T17:15',
          end: '2021-11-19T18:15',
          type: 'keynote',
        },
        {
          title: 'Good-Bye',
          start: '2021-11-19T18:15',
          end: '2021-11-19T18:30',
        },
        // {
        //   title: 'Get Together On Site / Dinner & Drinks',
        //   start: '2021-11-19T19:00',
        //   end: '2021-11-19T20:00',
        // },
        // SATURDAY
        {
          title: 'Welcome Address',
          start: '2021-11-20T10:00',
          end: '2021-11-20T10:15',
        },
        {
          speaker: ['Mindy Seu'],
          title: 'Variant of Cyberfeminism(s)',
          start: '2021-11-20T10:15',
          end: '2021-11-20T11:15',
          type: 'keynote',
          abstract: `Cyberfeminism cannot be reduced to women and technology. Nor is it about the diffusion of feminism through technology. Combining cyber and feminism was meant as an oxymoron or provocation, a critique of the cyberbabes and fembots that stocked the sci-fi landscapes of the 1980s. The term is self-reflexive: technology is not only the subject of cyberfeminism, but its means of transmission. It’s all about feedback.  Rooted as it is by feminism, cyberfeminism is an imperfect umbrella term. The history of feminism is dominated by Western attitudes, which makes it complicated and exclusionary. The reason I have chosen to use the term is because the combination of ‘cyber’ and ‘feminism’ allows novices to quickly connote its meaning and speaks to its lineage and evolution. This includes strands like black cyberfeminism, xenofeminism, post-cyber feminism, glitch feminism, and hackfeministas, among others. By tracing this network of online activism from the past three decades from the Cyberfeminism Index, we might see strategies for digital revolution.`
        },
        {
          speaker: ['Ngọc Triệu'],
          pronouns: 'she/her',
          title: 'Eastbound: Towards the Decolonial Future(s) of Vietnamese Design',
          start: '2021-11-20T11:15',
          end: '2021-11-20T12:00',
          type: 'talk',
          trackId: '1',
          abstract: `<em>Eastbound: Towards the Decolonial Future(s) of Vietnamese Design</em> is as much a journal of one's identity quest as it is a research paper. Eastbound serves as a positionality, enabling the decolonial thought(s) and doing(s) appropriate to the context of Vietnam. In doing so, it provides an alternative way of comprehending the current state of Vietnamese design and explores the condition in which the question of decolonising Vietnamese design can be made possible.`,
        },
        {
          speaker: ['Rob Phillips', 'Alon Meron', 'Delfina Fantini van Ditmar'],
          title: 'Notes from Tomorrow',
          start: '2021-11-20T11:15',
          end: '2021-11-20T12:00',
          type: 'talk',
          trackId: '2',
          abstract: `We are experiencing life-affirming transformations and cataclysmic ecological warnings. Extractive industries and excessive production chains are driving global ecological collapse. A comprehensive, radical approach towards; design, production, desires, and material custody is imperative in the planetary climate crisis age. It is time to review deeper environmental values, pursuing future design practice(s).<br><br>Designers are not only accountable for innovative solutions, but are also intertwined with; unsustainable growth, pervasive consumer culture and environmental collapse. By evading ecological implications, designers are complicit in (potential) problems they have created. Authors believe in the agency of designers; in a future discipline(s) supported with skills and tools to develop a ground-breaking path reducing impacts on environments, interventions reside within.<br><br>The talk will interrogate concepts of »reductionism« by problematising the simplification of prevalent ecological problem-framing proposing reduction as an ecological design strategy and a philosophical attitude. A subtractive future is not solely concerned with »efficiencies« but degrowth; strategies, change(s) in behaviour, re-connections and new economies that can be grown through »reductionism through design«.<br><br>Authors foresee triangulations between; a »post-industrial design« world, ecological systems (reliant on sustaining life), material reduction (diminishing our impact to the surrounding world), and community empowered responses. The proposition challenges; prevalent manufacturing processes, highlighting relevant alternative case studies and examples of alternative practice(s) of how »Industries of Design« can reduce its impact on ecological systems. These principles could offer some contextual strategies leading us out of an Anthropocentric (user-focused) design commercialism into more planet-centred derivatives. Authors perceive that reductive strategies will be critical for future ecological design and crafted understanding.`,
        },
        {
          speaker: [
            'Anastasiia Raina',
            'Danlei Huang',
            'Yimei Hu',
            'Georgie Nolan',
            'Meredith Binnette',
          ],
          title: 'Microbial Cosmologies',
          start: '2021-11-20T11:15',
          end: '2021-11-20T12:00',
          type: 'talk',
          trackId: '3',
          abstract: `<em>Microbial Cosmologies</em> is an immersive exploration into the future of mobility in a microbe-centric world where the microbiome defines our identity and citizenship. The world runs on Global Gut Technology, energy is produced from microbial biofuels harvested from the local environment, and human waste powers adaptive techno-natural machinery. Economies revolve around cultivating a unique human microbiome currency, and synthetic biology is used to program and govern this microbiopolitical state. Post-pandemic society has embraced artificial evolution and dramatic shifts in urban planning, notions of citizenship, biometric monitoring, and quarantine communities.`,
        },
        {
          title: 'Coffee Break',
          start: '2021-11-20T12:00',
          end: '2021-11-20T12:15',
          type: 'break',
        },
        {
          title: 'Reindigenizing Technology',
          speaker: ['Neema Githere'],
          start: '2021-11-20T12:15',
          end: '2021-11-20T13:15',
          type: 'keynote',
          abstract: `What does it look like to take a step beyond decolonization towards reindigenization? How does designing through an ethic of Radical Love bring us closer to right-relationship with one another and the land?<br><br>Weaving together Natasha Myers’ conceptualization of the Planthroposcene, Robyn Wall Kimmerer’s teachings from Braiding Sweetgrass, and Leah Lakshmi Piepzna-Samarasinha’s lessons from the disability justice movement; this keynote explores how centering indigenous values of care through affective design can provide a blueprint for deconstructing the elaborate technology of colonialism.`,
        },
        {
          title: 'Lunch Break',
          start: '2021-11-20T13:15',
          end: '2021-11-20T14:30',
          type: 'break',
        },
        {
          title: 'Welcome Back Address',
          start: '2021-11-20T14:30',
          end: '2021-11-20T14:45',
        },
        {
          speaker: ['Ina Scheffler'],
          title:
            'Re(programming) as a Community Venture and Process - Historical Attempts and Contemporary Pioneering',
          start: '2021-11-20T14:45',
          end: '2021-11-20T16:15',
          type: 'workshop',
          trackId: '1',
          abstract:
            'In a workshop, two aspects will be the center of attention. Firstly, works of design and the arts repeatedly show common traits and characteristics bound to time, material, possibilities, politics, and circumstance, which result in more or less distinct styles. Those blossom and fade. Form, creators, impact, and endurance may vary, works remain and continue to be seen heard, experienced, forgotten, (re)imagined, and (re)experienced. <br> Secondly, the workshop will hold the space to take a look back and focus on two examples of communities that brought to life design and art which still occupy recipients imagination today and will most likely do so in the future. Historically, communities have served as loci of creation, favouring the continuance of work and extending the body of work. Two communities created very different approaches and practices concerning their works in the realms of design and art. Still recognisable and distinct today the styles and pieces of work created in these two contexts continue to be relevant in contemporary discourse. In the US, the Shakers transformed religious beliefs and teachings, as well as the labour of everyday work and life into pieces of design with artistic qualities, which remain visible and recognised today. In stark contrast, the Black Mountain College transformed ties to art and design still present in the teachings of the Bauhaus and cut them loose in favour of a new approach to art and visual studies. This transformation resulted in innovative and distinctly independent pieces of art. Both styles were - among other influences such as individual disposition or economic factors - created within, without, despite, or within a community.',
        },
        {
          speaker: [
            'Assol Hernandez Uribe',
            'Carolina Ornelas',
            'Diego Alatorre',
            'Francisca Lucas',
            'Oliver Baron',
            'Zoe Rush',
          ],
          title: 'PATIO: Design & Crafts – building encounters',
          start: '2021-11-20T14:45',
          end: '2021-11-20T16:15',
          type: 'workshop',
          trackId: '2',
          sharedTrack: '1',
          abstract: `»Through an inclusive and fluid collaboration, we aim to prototype and iterate through Patio a space of potentiality and alterity. We host workshops, convening people interested in systems of learning and making to explore how these could transition to future autonomy and sustainability.<br><br>This workshop has its focus on reconstructing design education, through the inclusion of artisans' knowledge in learning environments. We attempt to construct a meeting point between artisans and designers.<br><br><strong>Requirements:</strong> To participate in this workshop you need an additional hour in the week before to complete an audiowalk and upload your reflections to a shared platform.«`,
        },

        {
          title: 'Commited to Presents',
          speaker: ['Dorsa Javaherian', 'Abigail Schreider'],
          start: '2021-11-20T14:45',
          end: '2021-11-20T16:15',
          type: 'round table',
          trackId: '2',
          sharedTrack: '2',
          abstract: `<em>Committed to Presents</em> wishes to be a platform to prolong Attending [to] Futures conversations on the conference's fringes. The aim is to foster collective reflections and discuss points of undoing and unlearning. Seeking Situated Knowledge, participants of this space can discuss their thoughts, learnings, and questions inspired and provoked by the conference. <em>Committed to Presents</em> wants to debate contrasts between present realities and possible futures.`,
        },
        {
          speaker: ['Elvia Vasconcelos', 'Danae Tapia'],
          title: 'Fiction as a Critical Design Strategy',
          start: '2021-11-20T14:45',
          end: '2021-11-20T16:15',
          type: 'workshop',
          trackId: '3',
          sharedTrack: '1',
          abstract:
            '»This is a session in which we will investigate the uses of live sketching combined with creative writing as the starting points of a design methodology of exchange. We will engage in a back and forth experiment between ourselves and the participants. The output will be a piece of fiction produced in the workshop plus the documentation of the exchange.«',
        },
        {
          speaker: ['Research Institute of Botanical Linguistics / Marius Förster', 'Meike Hardt'],
          title: 'Rehearsing interconnected design practices — Getting started with an audio walk',
          start: '2021-11-20T14:45',
          end: '2021-11-20T16:15',
          type: 'workshop',
          trackId: '3',
          sharedTrack: '2',
          abstract:
            'RIBL (Research Institute of Botanical Linguistics) invites you to an audio-walk in »nature«, followed by a discussion of posthuman design perspectives. We intend to de-center the human perspective while imagining alternative (co)existence and looking for sensitive, empathic, and interconnected ways of designing. <br><br> The workshop aims to enmesh the participants into a multi-sensory transdisciplinary exchange.',
        },
        {
          speaker: [
            'Juan de la Rosa',
            'Juan Sebastian Bedoya',
            'Valentina Barrera',
            'Carlos Andrés Garzón',
          ],
          title:
            'Design, sustainability and collective deliberation through tangible future inquiry: The role of design as a facilitator for social participation and community flourishing',
          start: '2021-11-20T16:15',
          end: '2021-11-20T17:00',
          type: 'talk',
          trackId: '1',
          abstract: `The first two decades of the twenty-first century have been characterized by a growing perception of failure of the socio-political systems and their economic policies. Social researchers have argued that there is a need to move from the current democratic system based on opinion to a more active participation and democratic collective deliberation. This shift implies an effort to engage communities into active processes of analysis and ideation that can help them recognize their values and the visions of desirable futures and goals. <br><br>This paper presents a community-based case study that seeks to introduce a possible role of design in this process.`,
        },
        {
          speaker: ['Jordan Whitewood-Neal'],
          title:
            'No Longer Dreaming of Dropped Curbs: A Critical Study of Future Practices of Conservation and Access in Architectural Education',
          start: '2021-11-20T16:15',
          end: '2021-11-20T17:00',
          type: 'talk',
          trackId: '2',
          abstract: `Dreaming of space begins in architectural education, and disability of all kinds can lead us to enriched and vivid dreams of a city which preserves the disabled body as an agent of space. The Architectural Association represents a pedagogy focused on future making, but institutional boundaries are perpetuated by contradicting concepts of conservation and access, limiting some students from having a voice. <br><br> This talk, therefore, argues for the value of disabled students through a critical study of the school's past, and potential future.`,
        },
        {
          speaker: ['Medelyn Capozzi', 'Joëlle Dubé'],
          title: 'Inviting Future Generations into Present Negotiations',
          start: '2021-11-20T16:15',
          end: '2021-11-20T17:00',
          type: 'talk',
          trackId: '3',
          abstract: `»Our research starts from the premise that present-day decision-making structures systematically favor short-term decision-making and disregard the rights and voices of future generations by their very design.<br><br>Having investigated a range of creative counter-hegemonic projects that use decision-making as a medium, we believe arts-led approaches can open up the realm of discourse beyond what strict adherence to rationality allows, and bring a sense of radical relationality to the fore.«`,
        },
        {
          title: 'Coffee Break',
          start: '2021-11-20T17:00',
          end: '2021-11-20T17:15',
          type: 'break',
        },
        {
          speaker: ['Bonne Zabolotney'],
          title:
            'Political Economy Pushes Back: How Structures of Power Affect Design Culture Narratives Vancouver',
          start: '2021-11-20T17:15',
          end: '2021-11-20T18:00',
          type: 'talk',
          trackId: '1',
          abstract: `This talk identifies problematic preconditions in design history that regulate how we express design history and discusses how forces of political economy resist change. Underwriting these preconditions are assumptions that design reflects the society in which they are placed. In reality, much of the design we study has been invested in replicating an institutional status quo. To combat this, historians must develop narratives balancing affect with an understanding of economic/cultural power.`,
        },
        {
          speaker: ['César Neri'],
          title: 'Latinofuturism - Recontextualizing ',
          start: '2021-11-20T17:15',
          end: '2021-11-20T18:00',
          type: 'talk',
          trackId: '2',
          abstract: `The development of technologies of mass communication in the past century has solidified Eurocentric capital modernity as the universal ideal. The promise of a connected world has been fulfilled in the interest of Western hegemony, further normalizing structures of coloniality into the collective imagination.<br><br><em>Latinofuturism</em> aims to build worlds that reaffirm the existence of the plurality of Latinx identities while proposing alternative systems of capital distribution and governance. Latinofuturism aims to dispel the notion of Western universality through social dreaming.`,
        },
        {
          speaker: ['Nida Abdullah', 'Chris Lee', 'Amanda Huynh', 'Swati Piparsania', 'Xinyi Li'],
          title: 'Teachers Project : Action Research Probe',
          start: '2021-11-20T17:15',
          end: '2021-11-20T18:00',
          type: 'talk',
          trackId: '3',
          abstract: `<em>The Teachers Project</em> served as a collective healing space, where gathering together was desirable. Prompts and discussions explored the everyday creep of our complicity, of participating in institutional education, and the colonial system. How do we recov­er? How do we reflect upon on our tools, our gestures, our environments and our own authority as power structures?<br><br>This session will share the history of the project and will be an open discussion prompting participants to reflect on how we collectivelynegotiate the demands andexpectations of the institution with radically re-figured possibilities? How do we respond to surveillance and retribution in response to this kind of practice?`,
        },
        {
          title: 'Final Words',
          start: '2021-11-20T18:00',
          end: '2021-11-20T18:30',
        },
      ],
    }
  },
}
</script>

<style scoped>
.page-program {
  min-width: 640px;
}
h1 {
  margin-right: auto;
}
.button-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.button-container button {
  width: initial;
}
.button-container button + button {
  margin-left: 10px;
}
@media screen and (max-width: 1000px) {
  .button-container {
    flex-direction: column;
    align-items: start;
  }
  .button-container div {
    display: flex;
    align-items: start;
    flex-direction: column;
  }
  .button-container button {
    margin-top: 10px;
    font-size: 1rem;
  }
  .button-container button + button {
    margin-left: 0;
  }
}
</style>
