export const state = () => ({
  image_dialog: false,
  image_list: [],
  image_index: 0,
})

export const actions = {}

export const mutations = {
  TOGGLE_IMG(state) {
    state.image_dialog = !state.image_dialog
  },
  SET_IMG_LIST(state, list) {
    state.image_list = list
  },
  SET_IMG_INDEX(state, index) {
    state.image_index = index
  },
}

export const getters = {}
