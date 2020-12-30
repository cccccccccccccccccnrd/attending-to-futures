import Vue from 'vue'

Vue.use({
  install: (Vue, options) => {
    Vue.directive('drag', {
      bind (el, binding, vnode, oldVnode) {
        if(!el.id) return console.log('Add an id 😈')
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
            binding.value({
              id: el.id,
              top: el.offsetTop - clientY,
              left: el.offsetLeft - clientX
            })
            el.style.top = `${el.offsetTop - clientY}px`
            el.style.left = `${el.offsetLeft - clientX}px`
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
