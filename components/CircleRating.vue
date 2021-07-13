<template>
  <v-progress-circular
    :value="value"
    color="secondary"
    :rotate="270"
    :size="isXs ? 32 : 34"
    :width="isXs ? 3 : 3.5"
  >
    <div class="text-caption text-sm-body-2 font-weight-medium">
      {{ value }}
    </div>
  </v-progress-circular>
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