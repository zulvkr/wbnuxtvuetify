<template>
  <v-dialog
    :value="image_dialog"
    v-on:input="toggleImgDialog"
    max-width="1024"
    content-class="elevation-0"
  >
    <v-carousel hide-delimiters height="max-content" :value="image_index">
      <v-carousel-item
        v-for="(img, index) in image_list"
        continuous="false"
        max-width="900"
        class="mx-auto"
        :aspect-ratio="$vuetify.breakpoint.sm ? 16 / 9 : ''"
        :key="index"
        :src="img.size_lg"
      />
    </v-carousel>
  </v-dialog>
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