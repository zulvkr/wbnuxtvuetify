# Quick Walkthrough

This piece of software is intended for coding challenge of a front-end design interview. The challenge is to replicate the design of a webpage that uses Vuetify.

It is also my experimentation using Vuex, Vuetify and Nuxt. If you are the interviewer, I hope this readme find you well. You could also access the video version in [this youtube video](/)

- [Quick Walkthrough](#quick-walkthrough)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [State](#state)
    - [Vuex](#vuex)
      - [Getters](#getters)
      - [Vuex Overlay Module](#vuex-overlay-module)
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

yarn install
```

See package.json and [Nuxt command](https://nuxtjs.org/docs/2.x/get-started/commands) for the details.

## State

States of the app are managed in both `index.vue` component and Vuex. Vuex is responsible for data wrangling and interaction between components, while `index.vue` maintain state for gallery category.

Besides that, this app calls global state `this.$vuetify.breakpoint.xs` and `this.$vuetify.theme.dark` (aliased `isXs` and `isDark`) to check mobile display viewport and dark theme respectively.

### Vuex

- `hotel`: contains raw data acquired from Axios.

#### Getters

- `getProfile`: return object derived from `catalog_id` data with additional `named_rating` property. See [data.json](./static/data.json)

```js
{
  "named_rating": "Excellent",
  ...catalog_id
}
```

- `getImgCategories`: return array of unique captions of all images with additional `"All"` category.

```js
["All", ...uniqueCategories]
```

- `getImg`: return object that contains each category. Every category contains filtered `image` objects.

```js
{
  "All": [
    {
      "caption": "Category 1",
      "size_lg": "...url",
      "size_sm": "...url",
      "size_xs": "...url"
    },
    {
      "caption": "Category 2",
      ...imageUrls
    },
    // ...
  ],
  "Category 1": [
    {
      "caption": "Category 1",
      ...imageUrls
    }
  ],
  "Category 2": [
    {
      "caption": "Category 2",
      ...imageUrls
    }
  ],
}
```

#### Vuex Overlay Module

- `image_dialog`: Boolean to control overlay visibility.
- `image_index`: Index of current selected image.
- `image_list`: Array of image objects filtered by category.

```js
[
  {
    "caption": "Category 1",
    "size_lg": "...url",
    "size_sm": "...url",
    "size_xs": "...url"
  },
  {
    "caption": "Category 2",
    ...imageUrls
  },
  // ...
]
```

Both `image_list` and `image_index` is undefined initially. Click on image will set their data.

## Components

[vue-fragment](https://github.com/Thunberg087/vue-fragment) is installed so multi-root component can be used. It's an implementation of [Vue 3 fragment](https://v3.vuejs.org/guide/migration/fragments.html#overview) / [React fragment](https://reactjs.org/docs/fragments.html) in vue.js v2.

## Styling

Styling of this app leverage:

- Vuetify settings in nuxt.config.js.
- Vuetify SASS variables.
- Vuetify components props.
- Vuetify provided classes.
- Some custom CSS classes in `index.vue`.
- Inline styling.

Admittedly, custom CSS classes are made only due to some CSS are unreadable when inlined.

Negative margins, decimal paddings and hardcoded colors are sprinkled in the template to get the match original webpage.

### Responsive styling

Responsiveness in Vuetify is managed in 2 different ways:

- CSS based, breakpoint variant available for padding, margin, display and typography.

```html
<div class="d-none d-sm-flex">
  display flex when view port larger than 600px.
</div>
```

- JS based, using `this.$vuetify.breakpoint` state

```vue
<template>
  <div :class="$vuetify.breakpoint.xs ? 'px-2' : 'px-4'" :style="style">
    If view port is below 600px, use `px-2`.
  </div>
</template>

<script>
export default {
  computed: {
    style() => this.$vuetify.breakpoint.xs ? 'margin: 0' : 'margin: 10px'
  }
}
</script>
```

Both has pros and cons:

- CSS based responsiveness is only limited to spacing, display and typography, which is very very limited.
- JS based responsiveness is flexible, but it's verbose and it will always evaluate view port as 0 in server side.

In my case, I didn't differentiate since the page is not server rendered.
