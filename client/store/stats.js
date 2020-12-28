export const state = () => ({
  userAgent: '',
  mouseX: '0',
  mouseY: '0',
  clicks: 0
})

export const actions = {
  init ({ commit, state }) {
    commit('setUserAgent', navigator.userAgent)
    commit('setUserAgent', navigator.userAgent)

    document.addEventListener('mousemove', (event) => {
      commit('setMouseX', event.clientX)
      commit('setMouseY', event.clientY)
    })

    document.addEventListener('click', (event) => {
      commit('setClicks', state.clicks + 1)
    })
  }
}

export const mutations = {
  setUserAgent(state, userAgent) {
    state.userAgent = userAgent
  },
  setMouseX(state, mouseX) {
    state.mouseX = mouseX
  },
  setMouseY(state, mouseY) {
    state.mouseY = mouseY
  },
  setClicks(state, clicks) {
    state.clicks = clicks
  },
}

export const getters = {
  all (state) {
    return state
  }
}
