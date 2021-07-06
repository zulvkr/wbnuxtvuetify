<template>
  <v-rating
    style="padding-right: 8px; margin-left: -3px; display: flex"
    color="orange"
    length="5"
    :value="value"
    :size="$vuetify.breakpoint.xs ? 23 : 25"
    readonly
  >
  </v-rating>
</template>

<script>
export default {
  props: {
    value: Number,
  },
}
</script>