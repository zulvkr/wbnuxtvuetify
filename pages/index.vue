<template>
  <div v-if="isDataLoaded">
    <theme-switch-bar />
    <v-main class="py-14 py-md-16">
      <v-container class="max-w-screen-md">
        <div class="lite-margin">
          <div id="profile" class="d-flex mb-12">
            <responsive-avatar :src="getProfile['hero_image']" />
            <div class="pl-6">
              <h1 class="text-h6 text-sm-h4 font-weight-medium">
                {{ getProfile['name'] }}
              </h1>
              <div class="d-flex pb-2 pb-sm-3 align-center">
                <star-rating :value="getProfile['star_rating']"></star-rating>
                <v-chip
                  small
                  outlined
                  class="rounded align-center"
                  :color="
                    isDark ? 'accent' : 'accent accent--text text--darken-4'
                  "
                  :style="isDark ? 'color: white !important' : ''"
                >
                  {{ getProfile['category'] }}
                </v-chip>
              </div>
              <div class="text-caption text-sm-body-2 pb-2">
                {{ getProfile['address'] }}
              </div>
              <div class="d-flex align-center">
                <circle-rating :value="getProfile['review_rating']" />
                <span class="text-caption text-sm-body-2 pl-2">
                  {{ getProfile['named_rating'] }} ·&nbsp;
                </span>
                <span class="text-caption text-sm-body-2">
                  {{ getProfile['review_count'].toLocaleString() }} reviews
                </span>
              </div>
            </div>
          </div>

          <!-- end-profile -->

          <div id="gallery" class="xs-no-gutters">
            <v-divider class="d-none d-sm-block mx-3"></v-divider>

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

            <v-chip-group
              id="category-select"
              v-model="image_category"
              :active-class="`primary--text ${isXs ? '' : 'font-weight-bold'}`"
              :show-arrows="isXs ? false : true"
              :style="`margin-top: ${isXs ? '0' : '-4px'};`"
              :class="isXs ? 'py-2' : ''"
            >
              <span style="padding-right: 7.5px" class="d-sm-none"></span>
              <v-chip
                v-for="category in getImgCategories"
                :key="category"
                class="text-sz-xs font-weight-medium"
                outlined
                rounded
              >
                {{ category }}
              </v-chip>
            </v-chip-group>

            <image-dialog></image-dialog>

            <v-window v-model="image_category" :class="isXs ? '' : 'pt-2'">
              <v-window-item
                v-for="category in getImgCategories"
                :key="category"
              >
                <div class="d-flex flex-wrap">
                  <div
                    :style="`flex: 0 0 33.333333%; padding: ${
                      isXs ? '1' : '12'
                    }px;`"
                    v-for="(img, index) in getImg[category]"
                    :key="index"
                  >
                    <v-img
                      class="img-click-sm"
                      :lazy-src="img.size_xs"
                      :src="img.size_lg"
                      :srcset="`${img.size_sm} 350w`"
                      :alt="`${category}-${index}`"
                      :aspect-ratio="1"
                      @click="zoomImg(getImg[category], index)"
                    />
                  </div>
                </div>
              </v-window-item>
            </v-window>
          </div>

          <!-- end-gallery -->

          <v-divider
            class="mb-8 rounded-lg d-none d-sm-block"
            style="margin-top: 20px"
          ></v-divider>

          <v-expansion-panels class="d-none d-sm-block" id="raw-data">
            <v-expansion-panel>
              <v-expansion-panel-header class="text-h5 font-weight-medium">
                Raw Data
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-caption">
                {{ raw_data }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-container>
    </v-main>

    <v-footer class="d-none d-sm-flex py-5 px-0" absolute>
      <div class="max-w-screen-md mx-auto px-3" style="width: 100%">
        <span style="font-family: 'Roboto'; font-size: 0.9375rem"> © </span>
        <span style="word-spacing: 7px">Wisatabook · </span>
        <span style="font-family: 'Roboto'; font-size: 0.875rem"
          >Terms &amp; Condition</span
        >
      </div>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CircleRating from '../components/CircleRating.vue'
import ImageDialog from '../components/ImageDialog.vue'
import ResponsiveAvatar from '../components/ResponsiveAvatar.vue'
import StarRating from '../components/StarRating.vue'
import ThemeSwitchBar from '../components/ThemeSwitchBar.vue'

export default {
  components: {
    ResponsiveAvatar,
    CircleRating,
    StarRating,
    ImageDialog,
    ThemeSwitchBar,
  },

  async mounted() {
    // only load template after data fetched
    await this.$store.dispatch('fetchHotel')
    this.isDataLoaded = true
  },
  data() {
    return {
      isDataLoaded: false,
      image_category: 'All',
    }
  },
  computed: {
    isXs() {
      return this.$vuetify.breakpoint.xs
    },
    isDark() {
      return this.$vuetify.theme.dark
    },
    raw_data() {
      return this.$store.state.hotel
    },
    ...mapGetters(['getProfile', 'getImgCategories', 'getImg']),
  },
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    zoomImg(list, index) {
      if (!this.isXs) {
        this.$store.commit('overlay/SET_IMG_LIST', list)
        this.$store.commit('overlay/SET_IMG_INDEX', index)
        this.$store.commit('overlay/TOGGLE_IMG')
      }
    },
  },
}
</script>

<style lang="scss">
// For development
// * {
//   outline: red 1px dotted !important;
// }

.container {
  .lite-margin {
    margin: {
      top: 48px;
      bottom: 48px;
    }
  }
}

.v-toolbar__content {
  padding: 0px !important;
}

.no-transition-child > * {
  transition: none !important;
}

.max-w-screen-md {
  max-width: 924px !important;
}

.xs-no-gutters {
  margin-left: -12px;
  margin-right: -12px;
  max-width: 100vw;
}

.no-sides {
  margin-left: -12px;
  margin-right: -12px;
  max-width: 100vw;
}

@media (min-width: 600px) {
  .v-tabs-slider-wrapper {
    top: 0;
  }
  .img-click-sm {
    transition: opacity 0.4s ease-in-out;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}

@media (max-width: 599px) {
  .v-tabs-slider-wrapper {
    left: 0px !important;
    width: 100vw !important;
  }
}
</style>
