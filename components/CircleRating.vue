<template>
  <v-progress-circular
    :value="value"
    color="secondary"
    :rotate="270"
    :size="$vuetify.breakpoint.xs ? 32 : 34"
    :width="$vuetify.breakpoint.xs ? 3 : 3.5"
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