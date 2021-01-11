import Vue from 'vue'

Vue.use({
  install: (Vue, options) => {
    Vue.directive('drag', {
      bind (el, binding, vnode, oldVnode) {
        if (!el.id) return console.log('Add an id 😈')
        el.style.position = 'absolute'

        let clientX = 0
        let clientY = 0
        let prevClientX = 0
        let prevClientY = 0

        el.onmousedown = (event) => {
          event = event || window.event
          event.preventDefault()
          prevClientX = event.clientX
          prevClientY = event.clientY

          document.onmousemove = (event) => {
            event = event || window.event
            event.preventDefault()

            clientX = prevClientX - event.clientX
            clientY = prevClientY - event.clientY
            prevClientX = event.clientX
            prevClientY = event.clientY

            const top = (el.offsetTop - clientY) < -1 ? -1 : ((el.offsetTop - clientY) > (el.parentElement.clientHeight - el.offsetHeight) ? (el.parentElement.clientHeight - el.offsetHeight) : (el.offsetTop - clientY))
            const left = (el.offsetLeft - clientX) < -1 ? -1 : ((el.offsetLeft - clientX) > (el.parentElement.clientWidth - el.offsetWidth) ? (el.parentElement.clientWidth - el.offsetWidth) : (el.offsetLeft - clientX))

            binding.value({
              id: el.id,
              top: top,
              left: left
            })

            el.style.top = `${top}px`
            el.style.left = `${left}px`
          }

          document.onmouseup = () => {
            document.onmouseup = null
            document.onmousemove = null
          }
        }
      }
    })
  }
}, this.$store)
