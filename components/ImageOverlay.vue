<template>
  <div class="text-center">
    <!-- <v-btn color="error" @click="overlay = !overlay"> Show Overlay </v-btn> -->

    <v-overlay :value="overlay">
      <div style="max-width: 1024px; width:100%">
        aaa
      </div>
      <!-- <v-carousel v-model="model" hide-delimiters>
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" width="500px" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel> -->
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    overlay: Boolean,
    index: Number,
    iterable: Array
  },

  // watch: {
  //   overlay(val) {
  //     val &&
  //       setTimeout(() => {
  //         this.overlay = false
  //       }, 2000)
  //   },
  // },
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
}
</script>