export const state = () => ({ hotel: {} })

export const actions = {
  async fetchHotel({ commit }) {
    const hotel = await this.$axios.$get('/data.json')
    commit('SET_HOTEL', hotel)
  },
}

export const mutations = {
  SET_HOTEL(state, hotel) {
    state.hotel = hotel
  },
}

export const getters = {
  getProfile({ hotel }) {
    const { review_rating, ...props } = hotel.catalog_data
    const named_rating = nameRating(+review_rating)

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

    return {
      review_rating,
      named_rating,
      ...props,
    }
  },

  getImgCategories({ hotel }) {
    return ['All', ...hotel.images.reduce(getUniqueCaptions, new Set())]

    function getUniqueCaptions(uniques, { caption }) {
      uniques.add(caption)
      return uniques
    }
  },

  getImg({ hotel }, { getImgCategories: cats }) {
    const images = {}

    for (const cat of cats) {
      images[cat] = hotel.images.filter(isCategory(cat))
    }

    function isCategory(cat) {
      return function ({ caption }) {
        if (cat === 'All') {
          return true
        }
        return cat === caption
      }
    }
    return images
  },
}
