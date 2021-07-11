<template>
  <v-switch
    inset
    :color="$vuetify.theme.dark ? 'primary' : 'gray lighten-4'"
    prepend-icon="mdi-weather-night"
    @change="toggleDarkTheme()"
  ></v-switch>
</template>

<script>
export default {
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>