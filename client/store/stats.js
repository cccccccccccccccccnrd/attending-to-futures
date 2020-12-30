export const state = () => ({
  navigator: null,
  mouseX: '0',
  mouseY: '0',
  clicks: 0,
  print: null,
})

export const actions = {
  async init ({ commit, state }) {
    console.log(navigator)
    commit('setNavigator', navigator)

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
  setNavigator(state, navigator) {
    state.navigator = navigator
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
  setPrint(state, print) {
    state.print = print
  }
}

export const getters = {
  all (state) {
    return state
  }
}
