<template>
  <div class="page page-lecture no-padding-pls">
    <div class="indent" style="padding: 1rem 0 0 1rem;">
      <p>Every semester KISD hosts a series of talks on different approaches, realms, and perspectives of design.</p>
      <p>This summer term, the KISDtalk series will be part of the Attending [to] Futures endeavor and lead up to the conference in November.</p>
      <p>The KISDtalks take place on Tuesdays or Wednesdays at 5:30 pm (ECT). They are a public and will take place via zoom.</p>
      <p>via Zoom: <a href="https://th-koeln.zoom.us/j/88240480389" target="_blank">https://th-koeln.zoom.us/j/88240480389</a><br>Meeting-ID: 882 4048 0389<br>Code: KISDtalks</p>
    </div>
    <div
      class="table"
      :class="{ current: lecture.current, done: lecture.done }"
      v-for="(lecture, index) in lectures"
      :key="`lecture-${index}`"
    >
      <div
        v-if="lecture.current"
        class="tb current">
        <p>&rarr;</p>
      </div>
      <div class="tb date">
        <p>{{lecture.date}}</p>
      </div>
      <div class="tb name">
        <a
          v-if="lecture.name[1]"
          :href="lecture.name[1]"
          target="_blank"
        >{{lecture.name[0]}}</a>
        <p
          v-else
        >{{lecture.name[0]}}</p>
      </div>
      <!-- <div
        v-if="lecture.school[0] && lecture.school[1]"
        class="tb school"
      >
        <a
          v-if="lecture.school[1]"
          :href="lecture.school[1]"
          target="_blank"
        >{{lecture.school[0]}}</a>
        <p
          v-else
        >{{lecture.school[0]}}</p>
      </div> -->
      <div class="tb event">
        <a
          v-if="lecture.event[1]"
          :href="lecture.event[1]"
          target="_blank"
        >{{lecture.event[0]}}</a>
        <p
          v-else
        >{{lecture.event[0]}}</p>
      </div>
      <div class="tb recording">
        <a
          v-if="lecture.recording"
          :href="lecture.recording"
          target="_blank"
        ><div class="circle"></div></a>
        <div
          v-else
          class="circle cap"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      lectures: [{
        date: '07.04.2021',
        name: ['Frederick van Amstel', 'http://fredvanamstel.com'],
        school: ['UTFPR, Brazil', 'https://dadin.ct.utfpr.edu.br'],
        event: ['Designing for Liberation', 'https://kisd.de/termine/designing-for-liberation/'],
        recording: null,
        done: true
      }, {
        date: '14.04.2021',
        name: ['Ghalia Elsrakbi, Lauren Alexander', 'http://www.foundland.info'],
        school: ['foundland', null],
        event: ['Archive Afterlife', 'https://kisd.de/termine/archive-afterlife/'],
        recording: null,
        done: true
      }, {
        date: '12.05.2021',
        name: ['Maziar Rezai', 'https://www.hbk-bs.de'],
        school: ['HBK Braunschweig', 'https://www.hbk-bs.de'],
        event: ['Design Activism and Democracy', null],
        recording: null,
        current: true
      }, {
        date: '19.05.2021',
        name: ['Andrea Sick', 'https://www.andreasick.de'],
        school: ['HfK Bremen', 'https://www.hfk2020.de'],
        event: ['t.b.a.', null],
        recording: null
      }, {
        date: '25.05.2021',
        name: ['Ben Schmitz', null],
        school: [null, null],
        event: ['t.b.a.', null],
        recording: null
      }, {
        date: '09.06.2021',
        name: ['Dina Benbrahim', 'https://www.dinabenbrahim.com'],
        school: [null, null],
        event: ['The Heart', null],
        recording: null
      }, {
        date: '23.06.2021',
        name: ['Åså Stahl, Kristina Lindström', 'http://www.unmakingstudio.se/about/'],
        school: ['Un/Making Studio', 'http://www.unmakingstudio.se/about/'],
        event: ['t.b.a.', null],
        recording: null
      }, {
        date: '30.06.2021',
        name: ['Ani Liu', 'https://ani-liu.com'],
        school: [null, null],
        event: ['t.b.a.', null],
        recording: null
      }]
    }
  },
  mounted () {
  },
  computed: {},
  methods: {}
}
</script>

<style scoped>
.indent {
  max-width: 600px;
}

p {
  margin: 1em 0;
}

p:first-of-type {
  margin: 0;
}

.table {
  display: flex;
  flex-wrap: nowrap;
  /* justify-content: center; */
  font-size: 1.5em;
}

.table:last-of-type .tb {
  border-bottom: 0;
}

.tb {
  min-height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0.5em;
  border-top: 1px solid var(--dark-text-color);
}

.table a:not(.recording a) {
  padding: 0.5em;
  border: 1px solid var(--dark-text-color);
  border-radius: 10px;
}

.table a:not(.recording a):hover {
  color: var(--background-color);
  background: var(--dark-text-color);
}

.table.current a:not(.recording a) {
  color: var(--background-color);
  background: var(--dark-text-color);
}

.table.done {
  --done: silver;
}

.table.done {
  color: var(--done);
}

.table.done a {
  color: var(--done);
  border-color: var(--done) !important;
}

.table.done a:not(.recording a):hover {
  color: var(--background-color);
  background: var(--done);
}

.table.done .circle {
  border-color: var(--done);
}

.circle {
  width: 0.75em;
  height: 0.75em;
  background: var(--dark-text-color);
  border-radius: 100px;
}

.circle.cap {
  background: var(--background-color);
  border: 1px solid var(--dark-text-color);
}

@media screen and (max-width: 600px) {
  .table {
    flex-flow: column;
    font-size: 1em;
    border-bottom: 1px solid black;
  }

  .tb {
    border: 0;
  }
}
</style>
