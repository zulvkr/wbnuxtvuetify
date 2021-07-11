<template>
  <v-tabs
    id="photos-tab"
    :fixed-tabs="isXs ? true : false"
    centered
    :height="isXs ? 44 : 53"
    background-color="transparent"
    :color="isDark ? 'white' : 'rgba(0,0,0,.87)'"
  >
    <v-tab>
      <div class="d-flex align-center text-caption">
        <v-icon
          :size="isXs ? 22 : 16"
          left
          style="margin-right: 0"
          color="gray darken-4"
        >
          mdi-grid
        </v-icon>
        <span
          class="d-none d-sm-flex font-weight-medium pl-2"
          style="font-size: 0.75rem; padding-top: 2px"
        >
          Photos
        </span>
      </div>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xs
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
  },
}
</script>

<style lang="scss">
@media (min-width: 600px) {
  #photos-tab .v-tabs-slider-wrapper {
    top: 0;
  }
}

@media (max-width: 599.9px) {
  #photos-tab .v-tabs-slider-wrapper {
    left: 0px !important;
    width: 100vw !important;
  }
}
</style>