<template>
  <v-rating
    :value="value"
    class="pr-2 d-flex align-end"
    :style="`
      margin-left: -3px;
      height: ${isXs ? 24.42 : 25.42}px;
    `"
    color="orange"
    length="5"
    :size="isXs ? 19.81 : 21.8"
    readonly
    dense
  >
  </v-rating>
</template>

<script>
export default {
  props: {
    value: Number,
  },
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xs
    },
  },
}
</script>