<template>
  <v-rating
    :value="value"
    class="pr-2 d-flex align-end"
    :style="`margin-left: -3px;height: ${size}px;`"
    color="orange"
    length="5"
    :size="$vuetify.breakpoint.xs ? 19.81 : 21.8"
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
    size() {
      return this.$vuetify.breakpoint.xs ? 24.42 : 25.42
    },
  },
}
</script>