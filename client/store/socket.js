export const state = () => ({
  socket: null
})

export const actions = {
  init (context) {
    const url = window.location.hostname === 'localhost' ? 'ws://localhost:1718' : 'wss://www.attendingtofutures.de/ws'
    context.commit('setSocket', new WebSocket(url))
  },
  send (context, [type, payload]) {
    const msg = {
      type: type,
      payload: payload
    }

    if (context.getters.socket) {
      context.getters.socket.send(JSON.stringify(msg))
    } else {
      console.log('socket not found on store state, re-mount the component?')
    }
  }
}

export const mutations = {
  setSocket (state, socket) {
    state.socket = socket
  }
}

export const getters = {
  socket (state) {
    return state.socket
  }
}
