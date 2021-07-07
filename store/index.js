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
      review_rating,
      ...props
    } = data['catalog_data']

    function nameRating(rating) {
      return rating >= 90
        ? 'Excellent'
        : rating >= 80
        ? 'Very Good'
        : rating >= 75
        ? 'Good'
        : rating >= 60
        ? 'Acceptable'
        : 'Poor'
    }

    const named_rating = nameRating(+review_rating)

    return {
      review_rating,
      named_rating,
      ...props
    }
  },

  images({ data }) {
    const images = data.images
    const captions = ['All,', ...images.reduce(reducerCaption, new Set())]

    function reducerCaption(acc, curr) {
      acc.add(curr.caption)
      return acc
    }
    return {
      captions,
    }
  },
}
