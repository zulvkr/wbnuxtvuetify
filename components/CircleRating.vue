<template>
  <v-progress-circular
    :value="value"
    color="purple darken-1"
    :size="$vuetify.breakpoint.xs ? 32 : 34"
    :rotate="270"
    width="3"
    cla
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
}
</script>