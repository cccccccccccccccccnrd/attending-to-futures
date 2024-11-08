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
import { DateTime } from 'luxon'

export default {
  name: 'Program',
  components: {},
  props: {
    events: {
      type: Array,
    },
    hues: {
      type: Object,
    },
    tracks: {
      type: Object,
    },
  },
  computed: {
    timeZoneOffset() {
      return (DateTime.now().setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).offset - DateTime.now().setZone(this.timeZone).offset) / 60 || 0
    },
    week() {
      return {
        hourStart: Math.min(Math.max(10 + this.timeZoneOffset, 0), 24),
        hourEnd: Math.min(Math.max(20 + this.timeZoneOffset, 0), 24),
      }
    },
    schedules() {
      if (!this.events) return
      const events = [...this.events].map(e => {
        const regex = /(T\d.+)(?=\:)/
        e.start = e.start.replace(regex, (h) => 'T' + String(Number(h.replace('T', '')) + this.timeZoneOffset).padStart(2, '0'))
        e.end = e.end.replace(regex, (h) => 'T' + String(Number(h.replace('T', '')) + this.timeZoneOffset).padStart(2, '0'))
        return e
      })
      return events.map((e, i) => ({
        start: e.start,
        end: e.end,
        body: ' ',
        title: e.title.replace( /[»«]/g, c => c == '»' ? '«' : '»' ),
        calendarId: '1',
        id: String(i + 1),
        category: 'time',
        color: this.hues[e.type] || this.hues.default || this.defaultHue,
        bgColor: 'transparent',
        borderColor: this.hues[e.type] || this.hues.default || this.defaultHue,
        raw: {
          trackId: e.trackId,
          sharedTrack: e.sharedTrack,
          type: e.type,
          speaker: e.speaker ? this.list(e.speaker) : '',
          abstract: e.abstract ? e.abstract.replace( /[»«]/g, c => c == '»' ? '«' : '»' ) : '', // fixes swapped character in font
          online: e.online
        },
      }))
    },
  },
  mounted() {
    this.ready = false
    this.$nextTick(() => {
      setTimeout(() => this.arrangeTracks(), 100)
      setInterval(() => {
        this.arrangeTracks()
      }, 1000);
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button') || e.target.classList.contains('tui-full-calendar-popup')) {
          e.target.closest(".tui-full-calendar-popup").remove()
        }
      })
    })
  },
  update() {
    this.arrangeTracks()
  },
  data() {
    return {
      timeZone: 'Europe/Berlin',
      ready: false,
      defaultHue: 'hsl(200, 50%, 90%)',
      calendarList: [{ id: '1' }],
      timezones: [
        {
          timezoneName: 'Europe/Berlin',
          // timezoneName: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Berlin',
        },
      ],
      view: 'day',
      taskView: false,
      scheduleView: ['time'],
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
      const trackId = schedule.raw.trackId ? `data-track-id="${schedule.raw.trackId}" data-track="${this.tracks[schedule.raw.trackId]}"` : ''
      const sharedTrack = schedule.raw.sharedTrack
        ? `data-shared-track="${schedule.raw.sharedTrack}"`
        : ''
      const time = schedule.raw.type === 'track' ? '' : `<span class="time">${this.getTime(schedule)}</span>`
      const durationMins = Math.ceil(
        Math.abs(new Date(schedule.end._date) - new Date(schedule.start._date)) / (1000 * 60)
      )
      const duration = durationMins < 20 ? `data-duration="${durationMins}"` : ''
      let classesArray = []
      if (schedule.raw.type) {
        classesArray.push(schedule.raw.type)
      }
      if (durationMins < 20 || schedule.raw.trackId === '4') {
        classesArray.push('inline')
      }
      const uc = (s) => s[0].toUpperCase() + s.substring(1)
      const type = ['keynote', 'talk', 'workshop', 'break', 'performance', 'round table', 'exhibition'].includes(schedule.raw.type) ? `<span class='type'>${uc(schedule.raw.type)}</span>` : ''
      const classes = `class="${classesArray.join(' ')}"`
      const style = `style="--color: ${schedule.color};"`


      const speaker = schedule.raw.speaker ? `<span class="speaker">${schedule.raw.speaker}</span>` : ''
      let title = schedule.title ? `<span class="title">${schedule.title}</span>` : ''
      let keynoteTitle = ''
      if (schedule.raw.type === 'keynote' && compact) {
        keynoteTitle = title
        title = ''
      }
      let online = ''
      if (schedule.raw.online) {
        if (schedule.raw.type === 'workshop') {
          online = 'online'
        } else {
          online = 'only stream'
        }
      } else {
        if (schedule.raw.type === 'workshop') {
          online = 'only on-site'
        } else if (schedule.raw.type === 'round table') {
          online = 'hybrid'
        } else if (schedule.raw.type === 'audio walk') {
          online = 'on-site and online (exhibition)'
        } else {
          // online = 'on-site & stream'
        }
      }

      const closeBtn = `
        <div class="close-button">
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

      const track = schedule.raw.trackId && schedule.raw.trackId !== 4 ? `<span class="track" style="margin-left: auto;" title="Track ${schedule.raw.trackId}: ${this.tracks[schedule.raw.trackId]}"><span>${this.tracks[schedule.raw.trackId]}</span><span>${schedule.raw.trackId}</span></span>` : ''
      const bar = `<div class="bar">${type}${closeBtn}</div>`

      const abstract = schedule.raw.abstract ? `<div class="abstract">${schedule.raw.abstract}</div>` : ''
      let content
      if (compact) {
        content = `
          ${type}
          ${time}
          <span class="header">${speaker}${title}</span>
          ${keynoteTitle}
          ${online ? `<span style='margin-top: 0.5em'>${online}</span>` : ''}
        `
      } else {
        content = `
          ${bar}
          <span style="display: flex; width: 100%; flex-wrap: wrap; align-items: center;">${time}${track}</span>

          <span class="header">
            ${speaker}
            ${title}
          </span>
          ${online ? `<span style='margin-bottom: 0.5em'>${online}</span>` : ''}
          ${abstract}
        `
      }
      return `<div ${trackId} ${sharedTrack} ${duration} ${classes} ${style}>${content}</div>`
    },
    list(array, glue = 'and') {
      return array.reduce(
        (list, item, i, arr) => list + (i === arr.length - 1 ? ` ${glue} ` : ', ') + item
      )
    },
    setDate(date) {
      if (
        date &&
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
    arrangeTracks() {
      if (!this.$refs.calendar) return
      if (!this.$refs.calendar.$el) return
      const schedules = this.$refs.calendar.$el.querySelectorAll(
        '.tui-full-calendar-time-date-schedule-block'
      )
      schedules.forEach((schedule) => {
        const trackIdEl = schedule.querySelector('[data-track-id]')
        const trackId = trackIdEl ? trackIdEl.getAttribute('data-track-id') : false
        const sharedTrackEl = schedule.querySelector('[data-track-id]')
        const sharedTrack = sharedTrackEl ? sharedTrackEl.getAttribute('data-shared-track') : false
        const durationEl = schedule.querySelector('[data-duration]')
        const duration = durationEl ? durationEl.getAttribute('data-duration') : false

        let exhibition = 0
        let width = 100 - exhibition
        let left = 0
        let paddingLeft = 0

        if (trackId) {
          width /= 3
          left = (trackId - 1) * width
          schedule.classList.add('track')
          if (trackId === '4') width = exhibition
        }
        if (sharedTrack) {
          width /= 2
          left += (sharedTrack - 1) * width
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
}
</style>
