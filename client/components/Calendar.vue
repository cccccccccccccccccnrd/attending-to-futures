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
      :useCreationPopup="useCreationPopup"
      :useDetailPopup="useDetailPopup"
    />
  </no-ssr>
</template>

<script>
export default {
  name: 'Program',
  props: {
    events: {
      type: Array,
    },
    hues: {
      type: Object,
    },
  },
  computed: {
    schedules() {
      if (!this.events) return
      return this.events.map((e, i) => ({
        start: e.start,
        end: e.end,
        title:
          e.title && e.speaker
            ? `${this.list(e.speaker)}: ${e.title}`
            : e.title || this.list(e.speaker),
        calendarId: '1',
        id: String(i + 1),
        category: 'time',
        color:
          this.contrast('hsl(0,0%,0%)', this.hues[e.type] || this.hues.default || this.defaultHue) >
          12
            ? 'black'
            : 'white',
        bgColor: this.hues[e.type] || this.hues.default || this.defaultHue,
        borderColor: 'transparent',
        raw: {
          panelId: e.panelId,
          sharedPanel: e.sharedPanel,
          type: e.type,
        },
      }))
    },
  },
  mounted() {
    this.ready = false
    this.$nextTick(() => {
      setTimeout(() => this.arrangePanels(), 100)
      // console.log(this.$refs.calendar.querySelectorAll('[data-schedule-id]'))
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
        startDayOfWeek: 1,
        hourStart: 9,
        hourEnd: 21,
        workweek: true,
      },
      disableDblClick: true,
      isReadOnly: true,
      template: {
        time: (schedule) => {
          const panelId = schedule.raw.panelId ? `data-panel-id="${schedule.raw.panelId}"` : ''
          const sharedPanel = schedule.raw.sharedPanel
            ? `data-shared-panel="${schedule.raw.sharedPanel}"`
            : ''
          const time = this.startToEnd(schedule.start._date, schedule.end._date)

          const durationMins = Math.ceil(
            Math.abs(new Date(schedule.end._date) - new Date(schedule.start._date)) / (1000 * 60)
          )
          const duration = durationMins < 20 ? `data-duration="${durationMins}"` : ''
          let classesArray = []
          if (schedule.raw.type) {
            classesArray.push(schedule.raw.type)
          }
          if (durationMins < 20) {
            classesArray.push('inline')
          }
          const classes = `class="${classesArray.join(' ')}"`
          return `<div ${panelId} ${sharedPanel} ${duration} ${classes}">
            <span class="time">${time}</span>
            <span class="title">${schedule.title}</span>
          </div>`
        },
      },
      useCreationPopup: false,
      useDetailPopup: true,
      theme: {
        // // week header 'dayname'
        // 'week.dayname.height': '42px',
        // 'week.dayname.borderTop': '1px solid #e5e5e5',
        // 'week.dayname.borderBottom': '1px solid #e5e5e5',
        // 'week.dayname.borderLeft': 'inherit',
        // 'week.dayname.paddingLeft': '0',
        // 'week.dayname.backgroundColor': 'inherit',
        // 'week.dayname.textAlign': 'left',
        // 'week.today.color': '#333',
        // 'week.pastDay.color': '#bbb',

        // // week vertical panel 'vpanel'
        // 'week.vpanelSplitter.border': '1px solid #e5e5e5',
        // 'week.vpanelSplitter.height': '3px',

        // // week daygrid 'daygrid'
        // 'week.daygrid.borderRight': '1px solid #e5e5e5',
        // 'week.daygrid.backgroundColor': 'inherit',

        // 'week.daygridLeft.width': '72px',
        // 'week.daygridLeft.backgroundColor': 'inherit',
        // 'week.daygridLeft.paddingRight': '0',
        // 'week.daygridLeft.borderRight': '1px solid #e5e5e5',

        // 'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
        // 'week.weekend.backgroundColor': 'inherit',

        // // week timegrid 'timegrid'
        // 'week.timegridLeft.width': '72px',
        // 'week.timegridLeft.backgroundColor': 'inherit',
        // 'week.timegridLeft.borderRight': '1px solid #e5e5e5',
        // 'week.timegridLeft.fontSize': '11px',
        // 'week.timegridLeftTimezoneLabel.height': '40px',
        // 'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

        'week.timegridOneHour.height': '100px',
        'week.timegridHalfHour.height': () =>
          parseInt(this.theme['week.timegridOneHour.height'], 10) / 2 + 'px',
        'week.timegridHalfHour.borderBottom': '1px solid #f0f0f0',
        // 'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

        // 'week.timegrid.paddingRight': '2px',
        // 'week.timegrid.borderRight': '1px solid #e5e5e5',
        'week.timegridSchedule.borderRadius': '0',
        // 'week.timegridSchedule.borderRadius': '5px',
        // 'week.timegridSchedule.paddingLeft': '2px',

        // 'week.currentTime.color': '#515ce6',
        // 'week.currentTime.fontSize': '11px',
        // 'week.currentTime.fontWeight': 'normal',

        // 'week.pastTime.color': '#bbb',
        // 'week.pastTime.fontWeight': 'normal',

        // 'week.futureTime.color': '#333',
        // 'week.futureTime.fontWeight': 'normal',

        // 'week.currentTimeLinePast.border': '1px dashed #515ce6',
        // 'week.currentTimeLineBullet.backgroundColor': '#515ce6',
        // 'week.currentTimeLineToday.border': '1px solid #515ce6',
        // 'week.currentTimeLineFuture.border': 'none',

        // // week creation guide style
        // 'week.creationGuide.color': '#515ce6',
        // 'week.creationGuide.fontSize': '11px',
        // 'week.creationGuide.fontWeight': 'bold',

        // // week daygrid schedule style
        // 'week.dayGridSchedule.borderRadius': '2px',
        'week.dayGridSchedule.height': '0',
        'week.dayGridSchedule.marginTop': '0px',
        // 'week.dayGridSchedule.marginLeft': '0px',
        // 'week.dayGridSchedule.marginRight': '0px'
      },
    }
  },
  methods: {
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

        let exhibition = 15
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
    luminance(r, g, b) {
      const a = [r, g, b].map((v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      })
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
    },
    contrast(hsl1, hsl2) {
      const rgb1 = this.HSLToRGB(hsl1)
      const rgb2 = this.HSLToRGB(hsl2)
      const lum1 = this.luminance(rgb1[0], rgb1[1], rgb1[2])
      const lum2 = this.luminance(rgb2[0], rgb2[1], rgb2[2])
      const brightest = Math.max(lum1, lum2)
      const darkest = Math.min(lum1, lum2)
      console.log(rgb1, rgb2, lum1, lum2, (brightest + 0.05) / (darkest + 0.05))
      return (brightest + 0.05) / (darkest + 0.05)
    },
    HSLToRGB(hsl) {
      const hslArray = hsl
        .replace(/%|hsl\(|\)/g, '')
        .split(',')
        .map((e) => parseInt(e.trim(), 10))

      let h = hslArray[0]
      let s = hslArray[1]
      let l = hslArray[2]
      // Must be fractions of 1
      s /= 100
      l /= 100

      let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0
      if (0 <= h && h < 60) {
        r = c
        g = x
        b = 0
      } else if (60 <= h && h < 120) {
        r = x
        g = c
        b = 0
      } else if (120 <= h && h < 180) {
        r = 0
        g = c
        b = x
      } else if (180 <= h && h < 240) {
        r = 0
        g = x
        b = c
      } else if (240 <= h && h < 300) {
        r = x
        g = 0
        b = c
      } else if (300 <= h && h < 360) {
        r = c
        g = 0
        b = x
      }
      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)

      return [r, g, b]
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
