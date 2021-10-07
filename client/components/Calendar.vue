<template>
  <no-ssr>
    <VueCalendar
      class="program-container"
      :class="{ hide: !ready }"
      ref="calendar"
      :calendars="calendarList"
      :schedules="schedules"
      :view="view"
      :taskView="taskView"
      :scheduleView="scheduleView"
      :timezones="timezones"
      :theme="theme"
      :week="week"
      :disableDblClick="disableDblClick"
      :isReadOnly="isReadOnly"
      :template="template"
      :useDetailPopup="useDetailPopup"
    />
  </no-ssr>
</template>

<script>
import Window from '@/components/Window.vue'
export default {
  name: 'Program',
  components: {
    Window,
  },
  props: {
    events: {
      type: Array,
    },
    hues: {
      type: Object,
    },
    panels: {
      type: Object,
    },
  },
  computed: {
    schedules() {
      if (!this.events) return
      // console.log(this.events.filter(e => !e.abstract && e.type && !['break', 'exhibition'].includes(e.type)))
      // const tmp = []
      // const double = []
      // this.events.forEach(e => {
      //   if (e.speaker) {
      //     e.speaker.forEach(f => {
      //       if (tmp.includes(f)) double.push(f)
      //       tmp.push(f)
      //     })
      //   }
      // })
      // console.log(tmp)
      // console.log(double)

      return this.events.map((e, i) => ({
        start: e.start,
        end: e.end,
        body: ' ',
        title: e.title,
        calendarId: '1',
        id: String(i + 1),
        category: 'time',
        color: this.hues[e.type] || this.hues.default || this.defaultHue,
        bgColor: 'transparent',
        borderColor: this.hues[e.type] || this.hues.default || this.defaultHue,
        raw: {
          panelId: e.panelId,
          sharedPanel: e.sharedPanel,
          type: e.type,
          speaker: e.speaker ? this.list(e.speaker) : '',
          abstract: e.abstract
        },
      }))
    },
  },
  mounted() {
    this.ready = false
    this.$nextTick(() => {
      setTimeout(() => this.arrangePanels(), 100)
      setInterval(() => {
        this.arrangePanels()
      }, 1000);
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
          e.target.closest(".tui-full-calendar-popup").remove()
        }
      })
    })
  },
  update() {
    this.arrangePanels()
  },
  data() {
    return {
      ready: false,
      defaultHue: 'hsl(200, 50%, 90%)',
      calendarList: [{ id: '1' }],
      timezones: [
        {
          timezoneName: 'Europe/Berlin',
          displayLabel: 'GMT+02:00',
          // tooltip: 'Berlin'
        },
      ],
      view: 'day',
      taskView: false,
      scheduleView: ['time'],

      week: {
        hourStart: 10,
        hourEnd: 21,
      },
      disableDblClick: true,
      isReadOnly: true,
      useDetailPopup: true,
      template: {
        time: (schedule) => this.scheduleTemplate(schedule, true),
        popupDetailBody: (schedule) => this.scheduleTemplate(schedule),
      },
      theme: {
        'week.timegridLeft.width': '50px',
        'week.timegridOneHour.height': '150px',
        'week.timegridHalfHour.height': () =>
          parseInt(this.theme['week.timegridOneHour.height'], 10) / 2 + 'px',
        'week.timegridHalfHour.borderBottom': '1px solid #f0f0f0',
        'week.timegridSchedule.borderRadius': '0',
        'week.dayGridSchedule.height': '0',
        'week.dayGridSchedule.marginTop': '0px',
      },
    }
  },
  methods: {
    scheduleTemplate(schedule, compact = false) {
      const panelId = schedule.raw.panelId ? `data-panel-id="${schedule.raw.panelId}"` : ''
      const sharedPanel = schedule.raw.sharedPanel
        ? `data-shared-panel="${schedule.raw.sharedPanel}"`
        : ''
      const time = `<span class="time">${this.getTime(schedule)}</span>`

      const durationMins = Math.ceil(
        Math.abs(new Date(schedule.end._date) - new Date(schedule.start._date)) / (1000 * 60)
      )
      const duration = durationMins < 20 ? `data-duration="${durationMins}"` : ''
      let classesArray = []
      if (schedule.raw.type) {
        classesArray.push(schedule.raw.type)
      }
      if (durationMins < 20 || schedule.raw.panelId === '4') {
        classesArray.push('inline')
      }
      const uc = (s) => s[0].toUpperCase() + s.substring(1)
      const type = ['keynote', 'talk', 'workshop', 'break', 'exhibition'].includes(schedule.raw.type) ? `<span class='type'>${uc(schedule.raw.type)}</span>` : ''
      const classes = `class="${classesArray.join(' ')}"`
      const style = `style="--color: ${schedule.color};"`


      const speaker = schedule.raw.speaker ? `<span class="speaker">${schedule.raw.speaker}</span>` : ''
      const title = schedule.title && (schedule.raw.type !== 'keynote' || !compact) ? `<span class="title">${schedule.title}</span>` : ''
      const closeBtn = `
        <div class="close-button" data-attr="asd" onclick="alert('asd')">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" xml:space="preserve">
            <style type="text/css">
              .stroke {
                fill: none;
                stroke-width: 1.5px;
                stroke: #FFFFFF;
                stroke-miterlimit: 10;
              }
            </style>
            <g>
              <line class="stroke" x1="0.5" y1="0.5" x2="29.5" y2="29.5"/>
              <line class="stroke" x1="29.5" y1="0.5" x2="0.5" y2="29.5"/>
            </g>
          </svg>
        </div>`

      const panel = schedule.raw.panelId && schedule.raw.panelId !== 4 ? `<span class="panel" style="margin-left: auto;" title="Panel ${schedule.raw.panelId}: ${this.panels[schedule.raw.panelId]}"><span>${this.panels[schedule.raw.panelId]}</span><span>${schedule.raw.panelId}</span></span>` : ''
      const bar = `<div class="bar">${type}${closeBtn}</div>`

      const abstract = schedule.raw.abstract ? `<p class="abstract">${schedule.raw.abstract}</p>` : ''
      let content
      if (compact) {
        content = `
          ${type}
          ${time}
          <span class="header">${speaker}${title}</span>
        `
      } else {
        content = `
          ${bar}
          <span style="display: flex; width: 100%; flex-wrap: wrap; align-items: center;">${time}${panel}</span>
          
          <span class="header">
            ${speaker}
            ${title}
          </span>
          ${abstract}
        `
      }
      return `<div ${panelId} ${sharedPanel} ${duration} ${classes} ${style}>${content}</div>`
    },
    list(array, glue = 'and') {
      return array.reduce(
        (list, item, i, arr) => list + (i === arr.length - 1 ? ` ${glue} ` : ', ') + item
      )
    },
    setDate(date) {
      if (
        new Date(this.$refs.calendar.invoke('getDate')._date).toDateString() !== date.toDateString()
      ) {
        this.ready = false
        this.$refs.calendar.invoke('setDate', date)
      }
    },
    getTime(schedule) {
      return schedule.raw.type === 'exhibition' ? 'all day' : this.startToEnd(schedule.start._date, schedule.end._date)
    },
    startToEnd(start, end) {
      const locale = 'en'
      const format = { hour: '2-digit', minute: '2-digit' }
      const startDate = new Date(start).toLocaleTimeString(locale, format)
      const endDate = new Date(end).toLocaleTimeString(locale, format)
      return `${startDate} &ndash; ${endDate}`.toLowerCase()
    },
    arrangePanels() {
      const schedules = this.$refs.calendar.$el.querySelectorAll(
        '.tui-full-calendar-time-date-schedule-block'
      )
      schedules.forEach((schedule) => {
        const panelIdEl = schedule.querySelector('[data-panel-id]')
        const panelId = panelIdEl ? panelIdEl.getAttribute('data-panel-id') : false
        const sharedPanelEl = schedule.querySelector('[data-panel-id]')
        const sharedPanel = sharedPanelEl ? sharedPanelEl.getAttribute('data-shared-panel') : false
        const durationEl = schedule.querySelector('[data-duration]')
        const duration = durationEl ? durationEl.getAttribute('data-duration') : false

        let exhibition = 6
        let width = 100 - exhibition
        let left = 0
        let paddingLeft = 0

        if (panelId) {
          width /= 3
          left = (panelId - 1) * width
          schedule.classList.add('panel')
          if (panelId === '4') width = exhibition
        }
        if (sharedPanel) {
          width /= 2
          left += (sharedPanel - 1) * width
        }
        schedule.style.setProperty('--width', `${width}%`)
        schedule.style.setProperty('--left', `${left}%`)
        schedule.style.setProperty('--padding-left', `${paddingLeft}%`)
        if (duration) {
          schedule.style.setProperty(
            'height',
            `${(parseInt(this.theme['week.timegridOneHour.height'], 10) / 60) * duration - 2}px`
          )
          schedule.style.setProperty('line-height', '1')
        }
      })
      this.ready = true
    },
  },
}
</script>

<style scoped>
.program-container {
  margin: 1rem -1rem -1rem;
  width: calc(100% + 31px);
}
</style>
