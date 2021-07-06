<template>
  <v-progress-circular :value="value" color="purple" :size="34" :rotate="270">
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