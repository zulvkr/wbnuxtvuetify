export const state = () => ({
  data: 0,
})

export const actions = {
  async getData({ commit }) {
    const data = await this.$axios.$get('/data.json')
    commit('SET_DATA', data)
  },
}

export const mutations = {
  SET_DATA(state, data) {
    state.data = data
  },
}

export const getters = {
  profile({ data }) {
    const {
      hero_image,
      name,
      star_rating,
      category,
      address,
      review_rating,
      review_count,
    } = data['catalog_data']

    return {
      hero_image,
      name,
      star_rating,
      category,
      address,
      review_rating,
      review_count,
    }
  },

  // images({ data }) {
  //   images = data.images

  //   function reducerImageCaption(acc, curr) {
  //     acc.add(curr)
  //     return acc
  //   }

  //   const captions = [...images.reduce(reducerImageCaption, new Set())]

  //   return {}
  // },
}
