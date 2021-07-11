# Quick Walkthrough

This piece of software is intended for coding challenge of a front-end design interview. The challenge is to replicate the design of a webpage that uses Vuetify.


It is also my experimentation using Vuex, Vuetify and Nuxt. If you are the interviewer, I hope this readme find you well. You could also access the video in [this youtube video](https://youtu.be/tjtzAXCR7G0)

The webpage is deployed [here in Netlify](https://brave-payne-6e0dd1.netlify.app/)

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
  - [Theme variant](#theme-variant)
  - [Acknowledgement](#acknowledgement)

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

States of the app are managed in both `index.vue` component and Vuex. Vuex is responsible for data wrangling and interaction between components, while `index.vue` maintain state of selected `image_category`.

Besides that, this app calls global state `this.$vuetify.breakpoint.xs` (aliased `isXs`) and `this.$vuetify.theme.dark` to check mobile display viewport and dark theme respectively.

### Vuex

- `hotel` state contains raw data acquired from Axios. See [data.json](./static/data.json)

#### Getters

- `getProfile`: return object derived from `catalog_data` with additional `named_rating` property.

```js
{
  "named_rating": "Excellent",
  ...catalog_data
}
```

- `getImgCategories`: return array of unique captions of all images with additional `"All"` category.

```js
[ 
  "All",
  ...uniqueCategories
]
```

- `getImg`: return object that contains each category. Every category contains `image` objects with corresponding caption.

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

This module is used in index.vue page and ImageDialog.vue component.

- `image_dialog: Boolean`: True => overlay visibile.
- `image_index: Number` Index of current selected image.
- `image_list: Array`: Array of image objects for selected category.


```js
[
  {
    "caption": "Category 1",
    "size_lg": "...url",
    "size_sm": "...url",
    "size_xs": "...url"
  },
  {
    "caption": "Category 1",
    ...imageUrls
  },
  // ...
]
```

## Components

[vue-fragment](https://github.com/Thunberg087/vue-fragment) is installed so multi-root component can be used. It's an implementation of [Vue 3 fragment](https://v3.vuejs.org/guide/migration/fragments.html#overview) / [React fragment](https://reactjs.org/docs/fragments.html) in vue.js v2.

Each components self-explained by the name:

- CircleRating.vue
- ImageDialog.vue: The overlay image component
- NFooter.vue
- PhotosSubtitle.vue: The photos tab with grid icon
- ProfileTag.vue: The hotel tag on the right side of star rating
- ResponsiveAvatar.vue
- StarRating.vue
- ThemeSwitchBar.vue
- ThemeSwitcher.vue

## Styling

Styling of this app leverage:

- Vuetify settings in nuxt.config.js.
- Vuetify SASS variables.
- Vuetify components props.
- Vuetify provided classes.
- Some custom CSS classes each component.
- Inline stylings.

Negative margins, decimal paddings and hardcoded colors are sprinkled in the template to get the pixel perfect look.

### Responsive styling

Responsiveness is managed in 2 different ways:

- CSS based, breakpoint variant available for vuetify padding, margin, display and typography.

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

- CSS based responsiveness is only limited to spacing, display and typography.
- JS based responsiveness is flexible, but it's verbose and always evaluate view port as 0 in server side. JavaScript is generally more resource costly for browser than CSS.

## Theme variant

There is dark and light theme variant. The theme is controlled by `$vuetify.theme.dark: Boolean` global state. This state is mutated directly by `ThemeSwitcher.vue`.

## Acknowledgement

The design and the API is provided by wisatabook.com for a code challenge.
