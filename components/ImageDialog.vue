<template>
  <div class="text-center">
    <v-dialog
      :value="image_dialog"
      v-on:input="toggleImgDialog"
      max-width="1024"
    >
      <div>
        <v-carousel hide-delimiters height="max-content" :value="image_index">
          <v-carousel-item
            width="900"
            min-height="667"
            class="mx-auto"
            v-for="(img, index) in image_list"
            :key="index"
            :src="img.size_lg"
            transition="slide-x-transition"
            reverse-transition="slide-x-reverse-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      image_list: (state) => state.overlay.image_list,
      image_index: (state) => state.overlay.image_index,
      image_dialog: (state) => state.overlay.image_dialog,
    }),
  },
  methods: {
    toggleImgDialog() {
      this.$store.commit('overlay/TOGGLE_IMG')
    },
  },
}
</script>

<style>
</style>