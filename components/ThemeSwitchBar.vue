<template>
  <v-app-bar
    fixed
    :color="$vuetify.theme.dark ? 'rgb(18, 18, 18)' : 'white'"
    elevate-on-scroll
  >
    <v-container class="max-w-screen-md">
      <v-row no-gutters>
        <div class="d-flex justify-end col-sm-12 col-12">
          <div class="mt-5 pr-3">
            <theme-switcher />
          </div>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import ThemeSwitcher from './ThemeSwitcher.vue'
export default {
  components: { ThemeSwitcher },
  
}
</script>