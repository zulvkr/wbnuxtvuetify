# Quick Walkthrough

This piece of software is intended for coding challenge of a front-end design interview. The challenge is to replicate the design of a webpage that uses Vuetify.

It is also my experimentation using Vuex, Vuetify and Nuxt. If you are the interviewer, I hope this README find you well. You could also access the video version of this README in [this youtube video](/)

- [Quick Walkthrough](#quick-walkthrough)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [State](#state)
    - [Vuex State](#vuex-state)
    - [Vuex Getters](#vuex-getters)
    - [Vuex Action and Mutation](#vuex-action-and-mutation)
  - [Components](#components)
  - [Styling](#styling)
    - [Responsive styling](#responsive-styling)

## Dependencies

- Nuxt.js with Vuetify and Axios module
- Vue fragment
- API for the source of data

## Installation

```bash
git clone https://github.com/zulvkr/wbnuxtvuetify.git

cd wbnuxtvuetify

yarn add

```

See package.json and [Nuxt command](https://nuxtjs.org/docs/2.x/get-started/commands) for the details.

## State

States of the app are managed in both the `index.vue` component and Vuex. Vuex is responsible for data wrangling.

Besides that, this app calls built-in state `this.$vuetify.breakpoint.xs` and `this.$vuetify.theme.dark` (aliased `isXs` and `isDark`) to check mobile display viewport and dark theme respectively.

### Vuex State

- `hotel`: is the only one state managed in Vuex which contains raw data acquired from Axios.

### Vuex Getters

- `getProfile`: return object derived from `catalog_id` data with additional `named_rating` property.

```js
{}

```

- `getImgCategories`: return array of unique captions of all images.

```js
[]

```

- `getImg`: return object that contains each category. Every category contains filtered `image` objects.

```js
{}

```

### Vuex Action and Mutation

Action `fetchHotel` and mutation `SET_HOTEL` used to fetch raw data and set `hotel` state respectively.

## Components

Some small intricate parts of the page are made into components. While they are not reusable yet, it allows cleaner markup in the page. [vue-fragment](https://github.com/Thunberg087/vue-fragment) is installed so you can wrap multi-root component with `<fragment></fragment>` instead of `<div></div>`. It's an implementation of [Vue 3 fragment](https://v3.vuejs.org/guide/migration/fragments.html#overview) / [React fragment](https://reactjs.org/docs/fragments.html) in vue.js v2.

## Styling

Styling of this app leverage:

- Vuetify components props if possible
- Vuetify provided classes
- Vuetify SASS variables
- some custom CSS classes and... 
- lots of inline styling. 
- You may also want to check Vuetify settings in nuxt.config.js.

Admittedly, custom CSS classes are made only due to some CSS are unreadable when inlined. It's a one pager project with limited time after all, so I didn't consider class reusability. Negative margins, paddings and hardcoded colors are sprinkled in the template to get the (almost) pixel perfect look.

### Responsive styling

Responsiveness in Vuetify is managed in 2 different ways:

- CSS based, breakpoint variant available for padding, margin, display and typography
- JS based, using `this.$vuetify.breakpoint` state

Both has pros and cons:

- CSS based responsiveness is only limited to spacing, display and typography, which is very very limited.
- JS based responsiveness is flexible, but it will always evaluate display port as 0 in server side.
