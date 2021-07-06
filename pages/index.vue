<template>
  <div v-if="isDataLoaded">
    <v-main class="py-16">
      <v-app-bar fixed color="#fff" elevate-on-scroll></v-app-bar>
      <v-container class="max-w-screen-md">
        <div class="lite-margin">
          <div id="header" class="d-flex mb-48">
            <responsive-avatar :src="profile['hero_image']" />
            <div class="px-3" />
            <div>
              <h1 class="text-h6 text-sm-h4 font-weight-medium">
                {{ profile['name'] }}
              </h1>
              <div class="d-flex pb-2 pb-sm-3 align-center">
                <star-rating :value="profile['star_rating']"></star-rating>
                <v-chip
                  small
                  outlined
                  class="rounded align-center"
                  color="secondary"
                  >{{ profile['category'] }}</v-chip
                >
              </div>
              <div class="text-caption text-sm-body-2 pb-2">
                {{ profile['address'] }}
              </div>
              <div class="d-flex align-center">
                <circle-rating :value="profile['review_rating']" />
                <span class="text-caption text-sm-body-2 pl-2">
                  Excellent ·&nbsp;
                </span>
                <span class="text-caption text-sm-body-2">
                  {{ profile['review_count'].toLocaleString() }} reviews
                </span>
              </div>
            </div>
          </div>

          <!-- end-header -->

          <div id="gallery">
            <v-tabs centered height="53" color="secondary">
              <v-tab>
                <div class="d-flex align-center text-caption">
                  <v-icon size="16" left style="margin-right: 0">
                    mdi-grid
                  </v-icon>
                  <span
                    class="d-none d-sm-flex font-weight-medium pl-2"
                    style="font-size: 0.75rem"
                  >
                    Photos
                  </span>
                </div>
              </v-tab>
            </v-tabs>
          </div>
          
          <!-- end-gallery -->

          <!-- separator -->

          <!-- raw data -->
          <h1>Hello world!</h1>
          <h1>Hello world!</h1>
          {{ rawData }}
        </div>
      </v-container>
    </v-main>
    <v-footer class="d-none d-sm-flex" absolute>
      <v-container class="max-w-screen-md">
        <span> © </span>
        Wisatabook · <span>Terms &amp; Condition</span>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import CircleRating from '../components/CircleRating.vue'
import ResponsiveAvatar from '../components/ResponsiveAvatar.vue'
import StarRating from '../components/StarRating.vue'
import { mapGetters } from 'vuex'

export default {
  components: { ResponsiveAvatar, CircleRating, StarRating },
  async created() {
    await this.$store.dispatch('getData')
    this.isDataLoaded = true
  },
  data() {
    return {
      isDataLoaded: false,
    }
  },
  computed: {
    rawData() {
      return this.$store.state.data
    },

    ...mapGetters(['profile']),
  },
}
</script>

<style lang="scss">
* {
  outline: red 0.1px dashed !important;
}

.container {
  .lite-margin {
    margin: {
      top: min(max(29px, 7vh), 92px);
      bottom: min(max(29px, 9vh), 92px);
    }
  }
}

.v-tabs-slider-wrapper {
  top: 0;
}

.max-w-screen-md {
  max-width: 924px !important;
}

.mb-48 {
  margin-bottom: 48px;
}
</style>
