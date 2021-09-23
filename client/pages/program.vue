<template>
  <div class="page page-program">
    <div class="">
      <div class="button-container">
        <h1>Program</h1>
        <button
          v-for="day in days"
          :key="day.key"
          @click="setDate(day.date)"
          :class="{ active: selectedDate === day.date }"
        >
          {{day.date.toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}}
        </button>
      </div>
      <Calendar
        ref="calendarContainer"
        :events="events"
        :hues="hues"
      />
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Program',
  components: {
    Calendar
  },
  computed: {
    days() {
      const d = Array.from(new Set(this.events.map(e => e.start.split('T')[0])))
      return d.map((e, i) => ({key: i, date: new Date(e)}))
    }
  },
  methods: {
    setDate(date) {
      this.$refs.calendarContainer.setDate(date)
      this.selectedDate = date
      setTimeout(() => this.$refs.calendarContainer.arrangePanels(), 100)
    },
    setInitialDate() {
      const initialDate = this.days.reduce((acc, e, i, array) => {
        return (
          (new Date()).toDateString() == e.date.toDateString() ||
          Date.parse(e.date) < Date.parse(acc.date)
        ) ? e : acc
      }).date
      this.setDate(initialDate)
    }
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
        // default: 'hsl(50, 80%, 60%)',
        // keynote: 'hsl(0, 80%, 70%)',
        // talk: 'hsl(110, 30%, 70%)',
        // workshop: 'hsl(220, 100%, 70%)',
        // exhibition: 'hsl(305, 10%, 70%)',
        // break: 'hsl(0, 0%, 90%)',

        // default: 'hsl(50, 80%, 60%)',
        // keynote: 'hsl(0, 80%, 80%)',
        // talk: 'hsl(110, 30%, 60%)',
        // workshop: 'hsl(220, 100%, 40%)',
        // exhibition: 'hsl(305, 10%, 95%)',
        // break: 'hsl(0, 0%, 70%)',

        default: 'hsl(50, 70%, 60%)',
        keynote: 'hsl(35, 70%, 50%)',
        talk: 'hsl(110, 20%, 50%)',
        workshop: 'hsl(220, 100%, 40%)',
        exhibition: 'hsl(300, 50%, 40%)',
        break: 'hsl(0, 0%, 90%)',
      },
      events: [
        // THURSDAY
        {
          title: 'Online Exhibition',
          start: '2021-11-18T09:00:00+01:00',
          end: '2021-11-18T21:00:00+01:00',
          type: 'exhibition',
          panelId: '4'
        },
        {
          title: 'Welcome Address',
          start: '2021-11-18T10:00:00+01:00',
          end: '2021-11-18T10:30:00+01:00',
        },
        {
          speaker: ['Silvy Chakkalakal'],
          start: '2021-11-18T10:30:00+01:00',
          end: '2021-11-18T11:30:00+01:00',
          type: 'keynote',
        },
        {
          speaker: ['Sven Quadflieg'],
          title: 'Weird Problems – Rethinking Privileged Design?',
          start: '2021-11-18T11:30:00+01:00',
          end: '2021-11-18T12:15:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Marius Förster'],
          title: 'Attenuating (to) Futures?',
          start: '2021-11-18T11:30:00+01:00',
          end: '2021-11-18T12:15:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Johannes Breuer', 'Marlene Bart', 'Stefanie Holzheu'],
          title: 'The Atlas of Data Bodies – Cross-Institutional Design Education.',
          start: '2021-11-18T11:30:00+01:00',
          end: '2021-11-18T12:15:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Coffee',
          start: '2021-11-18T12:15:00+01:00',
          end: '2021-11-18T12:30:00+01:00',
          type: 'break',
        },
        {
          speaker: ['Becky Nasadowski'],
          title: 'Design Narratives, the White Spatial Imaginary, and the Symbolic Economies of Cities',
          start: '2021-11-18T12:30:00+01:00',
          end: '2021-11-18T13:15:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Mushon Zer-Aviv'],
          title: 'The Ideas Lying Around',
          start: '2021-11-18T12:30:00+01:00',
          end: '2021-11-18T13:15:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['SpecSpace / Anke Haarmann', 'Frieder Bohaumilitzky', 'Tom Bieling', 'Torben Koerschkes'],
          title: 'Design of Unrest: Right-wing Metapolitics – Paralogy – Knowledge Spaces – Chaos',
          start: '2021-11-18T12:30:00+01:00',
          end: '2021-11-18T13:15:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Lunch.',
          start: '2021-11-18T13:15:00+01:00',
          end: '2021-11-18T14:30:00+01:00',
          type: 'break',
        },
        {
          title: 'Welcome Back Address',
          start: '2021-11-18T14:30:00+01:00',
          end: '2021-11-18T14:45:00+01:00',
        },
        {
          speaker: ['Kim Tran', 'Fernande Bodo'],
          title: '“Architecture is a white discipline” - A Critical Rethinking of Design Education',
          start: '2021-11-18T14:45:00+01:00',
          end: '2021-11-18T16:15:00+01:00',
          type: 'workshop',
          panelId: '1'
        },
        {
          speaker: ['Mushon Zer-Aviv'],
          title: 'The Ideas Lying Around: A Speculative Policy Workshop',
          start: '2021-11-18T14:45:00+01:00',
          end: '2021-11-18T16:15:00+01:00',
          type: 'workshop',
          panelId: '2'
        },
        {
          speaker: ['Mira Schmitz'],
          title: '“Design: An Intersectional Entanglement” - Redesigning Difference',
          start: '2021-11-18T14:45:00+01:00',
          end: '2021-11-18T16:15:00+01:00',
          type: 'workshop',
          panelId: '3'
        },
        {
          speaker: ['Lauren Williams'],
          title: 'Artifacts from/for a Liberated Detroit',
          start: '2021-11-18T16:15:00+01:00',
          end: '2021-11-18T17:00:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Edith Lázár'],
          title: 'Out of Stock. A Fashion Journal having \'Nothing to Wear\' But Ready to Dress-up the Future',
          start: '2021-11-18T16:15:00+01:00',
          end: '2021-11-18T17:00:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Isabella Brandalis', 'Henrique Eira', 'Søren Rosenbak'],
          title: 'Patadesign School: An Exceptional School of Exceptions',
          start: '2021-11-18T16:15:00+01:00',
          end: '2021-11-18T17:00:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Coffee',
          start: '2021-11-18T17:00:00+01:00',
          end: '2021-11-18T17:15:00+01:00',
          type: 'break',
        },
        {
          speaker: ['Danah Abdulla'],
          start: '2021-11-18T17:15:00+01:00',
          end: '2021-11-18T18:15:00+01:00',
          type: 'keynote',
        },
        {
          title: 'Good Bye',
          start: '2021-11-18T18:15:00+01:00',
          end: '2021-11-18T18:30:00+01:00',
        },
        {
          title: 'Get Together On Site / Dinner & Drinks',
          start: '2021-11-18T19:00:00+01:00',
          end: '2021-11-18T20:00:00+01:00',
        },
        // FRIDAY
        {
          title: 'Online Exhibition',
          start: '2021-11-19T09:00:00+01:00',
          end: '2021-11-19T21:00:00+01:00',
          type: 'exhibition',
          panelId: '4'
        },
        {
          title: 'Welcome Address',
          start: '2021-11-19T10:00:00+01:00',
          end: '2021-11-19T10:15:00+01:00',
        },
        {
          speaker: ['Lisa Baumgarten'],
          start: '2021-11-19T10:15:00+01:00',
          end: '2021-11-19T11:15:00+01:00',
          type: 'keynote',
        },
        {
          speaker: ['Michaela Büsse'],
          title: 'Design Autonomy',
          start: '2021-11-19T11:15:00+01:00',
          end: '2021-11-19T12:00:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Jaione Cerrato', 'Jon Halls'],
          title: 'Props for Conversation',
          start: '2021-11-19T11:15:00+01:00',
          end: '2021-11-19T12:00:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Nina Juric'],
          title: 'Design is the Language',
          start: '2021-11-19T11:15:00+01:00',
          end: '2021-11-19T12:00:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Coffee',
          start: '2021-11-19T12:00:00+01:00',
          end: '2021-11-19T12:15:00+01:00',
          type: 'break',
        },
        {
          speaker: ['Imad Gebrayel'],
          start: '2021-11-19T12:15:00+01:00',
          end: '2021-11-19T13:15:00+01:00',
          type: 'keynote',
        },
        {
          title: 'Lunch Break',
          start: '2021-11-19T13:15:00+01:00',
          end: '2021-11-19T14:30:00+01:00',
          type: 'break',
        },
        {
          title: 'Welcome Back Address',
          start: '2021-11-19T14:30:00+01:00',
          end: '2021-11-19T14:45:00+01:00',
        },
        {
          speaker: ['Design & Oppression Network: Frederick van Amstel', 'Bibiana Serpa', 'Marco Mazzarotto', 'Rafa Angelon'],
          title: 'Wicked Problems, Wicked Designs',
          start: '2021-11-19T14:45:00+01:00',
          end: '2021-11-19T16:15:00+01:00',
          type: 'workshop',
          panelId: '1'
        },
        {
          speaker: ['Mushon Zer-Aviv'],
          title: 'The Ideas Lying Around: A Speculative Policy Workshop',
          start: '2021-11-19T14:45:00+01:00',
          end: '2021-11-19T16:15:00+01:00',
          type: 'workshop',
          panelId: '2'
        },
        {
          speaker: ['Mira Schmitz'],
          title: '“Design: An Intersectional Entanglement” - Redesigning Difference',
          start: '2021-11-19T14:45:00+01:00',
          end: '2021-11-19T16:15:00+01:00',
          type: 'workshop',
          panelId: '3'
        },
        {
          speaker: ['Lauren Williams'],
          title: 'Artifacts from/for a Liberated Detroit',
          start: '2021-11-19T16:15:00+01:00',
          end: '2021-11-19T17:00:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Edith Lázár'],
          title: 'Out of Stock. A Fashion Journal having \'Nothing to Wear\' But Ready to Dress-up the Future',
          start: '2021-11-19T16:15:00+01:00',
          end: '2021-11-19T17:00:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Isabella Brandalis', 'Henrique Eira', 'Søren Rosenbak'],
          title: 'Patadesign School: An Exceptional School of Exceptions',
          start: '2021-11-19T16:15:00+01:00',
          end: '2021-11-19T17:00:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Coffee',
          start: '2021-11-19T17:00:00+01:00',
          end: '2021-11-19T17:15:00+01:00',
          type: 'break',
        },
        {
          speaker: ['Danah Abdulla'],
          start: '2021-11-19T17:15:00+01:00',
          end: '2021-11-19T18:15:00+01:00',
          type: 'keynote',
        },
        {
          title: 'Good-Bye',
          start: '2021-11-19T18:15:00+01:00',
          end: '2021-11-19T18:30:00+01:00',
        },
        {
          title: 'Get Together On Site / Dinner & Drinks',
          start: '2021-11-19T19:00:00+01:00',
          end: '2021-11-19T20:00:00+01:00',
        },
        // SATURDAY
        {
          title: 'Online Exhibition',
          start: '2021-11-20T09:00:00+01:00',
          end: '2021-11-20T21:00:00+01:00',
          type: 'exhibition',
          panelId: '4'
        },
        {
          title: 'Welcome Address',
          start: '2021-11-20T10:00:00+01:00',
          end: '2021-11-20T10:15:00+01:00',
        },
        {
          speaker: ['Mindy Seu'],
          start: '2021-11-20T10:15:00+01:00',
          end: '2021-11-20T11:15:00+01:00',
          type: 'keynote',
        },
        {
          speaker: ['Ngọc Triêu'],
          title: 'Eastbound: Towards the Decolonial Future(s) of Vietnamese Design',
          start: '2021-11-20T11:15:00+01:00',
          end: '2021-11-20T12:00:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Rob Phillips', 'Alon Meron', 'Delfina Fantini van Ditmar'],
          title: 'Notes from Tomorrow',
          start: '2021-11-20T11:15:00+01:00',
          end: '2021-11-20T12:00:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Anastasiia Raina', 'Danlei Huang', 'Yimei Hu', 'Georgie Nolan', 'Meredith Binnette'],
          title: 'Microbial Cosmologies',
          start: '2021-11-20T11:15:00+01:00',
          end: '2021-11-20T12:00:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Coffee',
          start: '2021-11-20T12:00:00+01:00',
          end: '2021-11-20T12:15:00+01:00',
          type: 'break',
        },
        {
          speaker: ['Neema Githere'],
          start: '2021-11-20T12:15:00+01:00',
          end: '2021-11-20T13:15:00+01:00',
          type: 'keynote',
        },
        {
          title: 'Lunch Break',
          start: '2021-11-20T13:15:00+01:00',
          end: '2021-11-20T14:30:00+01:00',
          type: 'break',
        },
        {
          title: 'Welcome Back Address',
          start: '2021-11-20T14:30:00+01:00',
          end: '2021-11-20T14:45:00+01:00',
        },
        {
          speaker: ['Ina Scheffler'],
          title: 'Re(programming) as a Community Venture and Process - Historical Attempts and Contemporary Pioneering',
          start: '2021-11-20T14:45:00+01:00',
          end: '2021-11-20T16:15:00+01:00',
          type: 'workshop',
          panelId: '1'
        },
        {
          speaker: ['Zoë Rush', 'Francisca Lucas', 'Carolina Ornelas'],
          title: 'Patio',
          start: '2021-11-20T14:45:00+01:00',
          end: '2021-11-20T16:15:00+01:00',
          type: 'workshop',
          panelId: '2'
        },
        {
          speaker: ['Elvia Vasconcelos', 'Danae Tapia'],
          title: 'Fiction as a Critical Design Strategy',
          start: '2021-11-20T14:45:00+01:00',
          end: '2021-11-20T16:15:00+01:00',
          type: 'workshop',
          panelId: '3',
          sharedPanel: '1'
        },
        {
          speaker: ['Research Institute of Botanical Linguistics / Marius Förster', 'Meike Hardt'],
          title: 'Rehearsing interconnected design practices — Getting started with an audio walk',
          start: '2021-11-20T14:45:00+01:00',
          end: '2021-11-20T16:15:00+01:00',
          type: 'workshop',
          panelId: '3',
          sharedPanel: '2'
        },
        {
          speaker: ['Juan de la Rosa', 'Juan Sebastian Bedoya', 'Valentina Barrera', 'Carlos Andrés Garzón'],
          title: 'Design, sustainability and collective deliberation through tangible future inquiry: The role of design as a facilitator for social participation and community flourishing',
          start: '2021-11-20T16:15:00+01:00',
          end: '2021-11-20T17:00:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['Jordan Whitewood-Neal'],
          title: 'No Longer Dreaming of Dropped Curbs: A Critical Study of Future Practices of Conservation and Access in Architectural Education',
          start: '2021-11-20T16:15:00+01:00',
          end: '2021-11-20T17:00:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Medelyn Capozzi', 'Joëlle Dubé'],
          title: 'Inviting Future Generations into Present Negotiations',
          start: '2021-11-20T16:15:00+01:00',
          end: '2021-11-20T17:00:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Coffee',
          start: '2021-11-20T17:00:00+01:00',
          end: '2021-11-20T17:15:00+01:00',
          type: 'break',
        },
        {
          speaker: ['Bonne Zabolotney'],
          title: 'Political Economy Pushes Back: How Structures of Power Affect Design Culture Narratives Vancouver',
          start: '2021-11-20T17:15:00+01:00',
          end: '2021-11-20T18:00:00+01:00',
          type: 'talk',
          panelId: '1'
        },
        {
          speaker: ['César Ner'],
          title: 'Latinofuturism - Recontextualizing ',
          start: '2021-11-20T17:15:00+01:00',
          end: '2021-11-20T18:00:00+01:00',
          type: 'talk',
          panelId: '2'
        },
        {
          speaker: ['Nida Abdullah', 'Chris Lee', 'Amanda Huynh', 'Swati Piparsania', 'Xinyi Li'],
          title: 'Teachers Project : Action Research Probe',
          start: '2021-11-20T17:15:00+01:00',
          end: '2021-11-20T18:00:00+01:00',
          type: 'talk',
          panelId: '3'
        },
        {
          title: 'Final Words',
          start: '2021-11-20T18:00:00+01:00',
          end: '2021-11-20T18:30:00+01:00',
        },
      ]
    }
  }
}
</script>

<style scoped>
h1 {
  margin-right: auto;
}
.button-container {
  display: flex;
  align-items: center;
}
.button-container button {
  margin-left: 10px;
  width: initial;
}
.button-container button.active {
  margin-left: 10px;
  width: initial;
}
</style>
