<template>
  <div class="page page-lecture">
    <div class="indent">
      <p>Every semester KISD hosts a series of talks on different approaches, realms, and perspectives of design.</p>
      <p>This summer term, the KISDtalk series will be part of the Attending [to] Futures endeavor and lead up to the conference in November.</p>
      <p>The KISDtalks take place on Tuesdays or Wednesdays at 5:30 pm (ECT). They are a public and will take place via zoom. Stay tuned for the zoom link and timetable!</p>
    </div>
    <div class="tb-container">
      <div class="table row1">
            <div class="tb date">
              <button class="table">
              <p>07.04.2021</p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <a href="http://fredvanamstel.com" target="_blank">Frederick van Amstel</a>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
              <a href="https://dadin.ct.utfpr.edu.br" target="_blank">UTFPR, Brazil</a>
              </button>
            </div>
            <div class="tb event">
              <button class="table true">
              <a href="https://kisd.de/termine/designing-for-liberation/" target="_blank">Designing for Liberation</a>
              </button>
            </div>
      </div>
      <div class="table row2">
            <div class="tb date">
              <button class="table">
              <p>14.04.2021</p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <a href="http://www.foundland.info" target="_blank">Ghalia Elsrakbi / Lauren Alexander </a>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
              <p>foundland</p>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      <div class="table row3">
            <div class="tb date">
              <button class="table">
              <p>12.05.2021 </p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <p>Maziar Rezai</p>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
               <a href="https://www.hbk-bs.de" target="_blank">HBK Braunschweig</a>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      <div class="table row4">
            <div class="tb date">
              <button class="table">
              <p>19.05.2021 </p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <a href="https://www.andreasick.de" target="_blank">Andrea Sick</a>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
               <a href="https://www.hfk2020.de" target="_blank">HfK Bremen</a>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      <div class="table row5">
            <div class="tb date">
              <button class="table">
              <p>25.05.2021 </p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <p>Ben Schmitz</p>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
               <p></p>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      <div class="table row6">
            <div class="tb date">
              <button class="table">
              <p>09.06.2021 </p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <a href="https://www.dinabenbrahim.com" target="_blank">Dina Benbrahim</a>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
               <p></p>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      <div class="table row7">
            <div class="tb date">
              <button class="table">
              <p>23.06.2021 </p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
              <p>Åså Stahl und Kristina Lindström</p>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
               <a href="http://www.unmakingstudio.se/about/" target="_blank">Un/Making Studio</a>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      <div class="table row8">
            <div class="tb date">
              <button class="table">
              <p>30.06.2021 </p>
              </button>
            </div>
            <div class="tb name">
              <button class="table">
                <a href="https://ani-liu.com" target="_blank">Ani Liu</a>
              </button>
            </div>
            <div class="tb school">
              <button class="table">
                <p></p>
              </button>
            </div>
            <div class="tb event">
              <button class="table">
              <p>t.b.a.</p>
              </button>
            </div>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {}
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

.tb-container {
  margin: 1em 0;
  border-top: 1px solid black;
}

.table {
display: flex;
flex-wrap: nowrap;
justify-content: center;
}

.tb {
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  padding: 0.2em 0.5em; 
  flex-grow: 10;
}

.tb.date {
  flex: 0 0 9em;

}

.tb + .tb {
    border-left: 0;
}

button.table {
  border: 0px;
  border-radius: 100px;
  color: var(--dark-text-color);
  background: var(--background-color);
  cursor: auto;
  text-transform: none;
}

button.table.true {
  border-radius: 100px;
  color: var(--background-color);
  background: black;
  
}

button.table.true a{
  color: var(--background-color);
  
}




</style>
