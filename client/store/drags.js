export const state = () => ({
  elements: {}
})

export const mutations = {
  setElements(state, elements) {
    state.elements = elements
  },
  setElement(state, element) {
    state.elements[element.id] = element
  }
}

export const getters = {
  all (state) {
    return state.elements
  }
}
