<template>
  <div v-if="isDataLoaded">
    <theme-switch-bar />
    <v-main class="py-14 py-md-16">
      <v-container class="max-w-screen-md">
        <div class="py-12 pb-14 pb-md-12">
          <div id="profile" class="d-flex mb-12">
            <responsive-avatar :src="profile['hero_image']" />
            <div class="pl-6">
              <h1 class="text-h6 text-sm-h4 font-weight-medium">
                {{ profile['name'] }}
              </h1>
              <div class="d-flex pb-2 pb-sm-3 align-center">
                <star-rating :value="profile['star_rating']" />
                <profile-tag>{{ profile['category'] }}</profile-tag>
              </div>
              <div class="text-caption text-sm-body-2 pb-2">
                {{ profile['address'] }}
              </div>
              <div class="d-flex align-center">
                <circle-rating :value="profile['review_rating']" />
                <span class="text-caption text-sm-body-2 pl-2">
                  {{ profile['named_rating'] }} ·&nbsp;
                </span>
                <span class="text-caption text-sm-body-2">
                  {{ profile['review_count'].toLocaleString() }} reviews
                </span>
              </div>
            </div>
          </div>

          <!-- end-profile -->

          <div id="gallery" class="no-side-paddings">
            <v-divider class="d-none d-sm-block mx-3"></v-divider>
            <photos-subtitle />
            <v-chip-group
              id="category-select"
              v-model="image_category"
              :active-class="`
                primary--text 
                ${isXs ? '' : 'font-weight-bold'}
              `"
              :show-arrows="isXs ? false : true"
              :style="`
                margin-top: ${isXs ? '0' : '-4px'};
                padding-left:${isXs ? '7.5px' : '0'};
                `"
              class="py-sm-2"
            >
              <v-chip
                v-for="category in img_categories"
                :key="category"
                class="text-sz-xs font-weight-medium"
                outlined
                rounded
              >
                {{ category }}
              </v-chip>
            </v-chip-group>

            <image-dialog />

            <v-window
              id="gallery-grid"
              v-model="image_category"
              class="pt-sm-2"
            >
              <v-window-item v-for="category in img_categories" :key="category">
                <div class="d-flex flex-wrap">
                  <div
                    :style="`
                      flex: 0 0 33.333333%;
                      padding: ${isXs ? '1px' : '12px'};
                    `"
                    v-for="(img, index) in images[category]"
                    :key="index"
                  >
                    <v-img
                      class="img-click-sm"
                      :lazy-src="img.size_xs"
                      :src="img.size_lg"
                      :srcset="`${img.size_sm} 350w`"
                      :alt="`${category}-${index}`"
                      :aspect-ratio="1"
                      @click="zoomImg(images[category], index)"
                    />
                  </div>
                </div>
              </v-window-item>
            </v-window>
          </div>

          <!-- end-gallery -->

          <v-divider class="mb-8 rounded-lg d-none d-sm-block mt-5"></v-divider>

          <v-expansion-panels id="raw-data" class="d-none d-sm-block">
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
    <standard-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CircleRating from '../components/CircleRating.vue'
import ImageDialog from '../components/ImageDialog.vue'
import PhotosSubtitle from '../components/PhotosSubtitle.vue'
import ProfileTag from '../components/ProfileTag.vue'
import ResponsiveAvatar from '../components/ResponsiveAvatar.vue'
import StarRating from '../components/StarRating.vue'
import ThemeSwitchBar from '../components/ThemeSwitchBar.vue'
import StandardFooter from '../components/StandardFooter.vue'

export default {
  components: {
    ResponsiveAvatar,
    CircleRating,
    StarRating,
    ImageDialog,
    ThemeSwitchBar,
    ProfileTag,
    PhotosSubtitle,
    StandardFooter,
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
    ...mapGetters({
      profile: 'getProfile',
      img_categories: 'getImgCategories',
      images: 'getImg',
    }),
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
/* For Development */

// * {
//   outline: red 1px dotted !important;
// }

.v-toolbar__content {
  padding: 0px !important;
}

.max-w-screen-md {
  max-width: 924px !important;
}

.no-side-paddings {
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

@media (max-width: 599.9px) {
  .v-tabs-slider-wrapper {
    left: 0px !important;
    width: 100vw !important;
  }
}
</style>
