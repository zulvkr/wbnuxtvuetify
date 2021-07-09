# Quick Walkthrough

This piece of software are intended for coding challenge of a front-end design interview, also my experimentation using Vuex, Vuetify and Nuxt. If you are the interviewer, I hope this README find you well. You could also access the video version of this README in [this youtube video]()

## Dependencies
- Nuxt.js with Vuetify and Axios module
- Vue fragment

## State

States of the app are managed in both the `index.vue` component and Vuex. Vuex is responsible for data wrangling.

Besides that, this app calls built-in state `this.$vuetify.breakpoint.xs` and `this.$vuetify.theme.dark` (aliased `isXs` and `isDark`) to check mobile display viewport and dark theme respectively.

### Vuex State

- `hotel`: is the only one state managed in Vuex which contain raw data acquired from Axios.

#### Vuex Getters

- `getProfile`: return object derived from `catalog_id` data with additional `named_rating` property.

```js
{}

```

- `getImgCategories`: return array of unique captions of all images.

```js
[]

```

- `getImg`: return object contain `image` filtered by each category

```js
{}

```

### Vuex Action and Mutation

Action `fetchHotel` and mutation `SET_HOTEL` used to fetch data and set hotel state respectively.

## Styling

Styling in this app involved a lot of negative margin, "!important" and inline styling. These practice are necessary.
