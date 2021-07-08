<template>
  <v-switch
    v-model="switchTheme"
    inset
    :color="`gray lighten-4`"
    prepend-icon="mdi-weather-night"
    @change="toggleDarkTheme()"
  ></v-switch>
</template>

<script>
export default {
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      console.log(this.$vuetify.theme.dark)
    },
  },
}
</script>