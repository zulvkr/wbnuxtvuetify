<template>
  <div v-if="isDataLoaded">
    <v-main class="py-16">
      <v-container class="max-w-screen-md xs:mt--8">
        <div class="lite-margin">
          <v-app-bar fixed color="#fff" elevate-on-scroll>
            <v-container class="max-w-screen-md">
              <v-row no-gutters>
                <div class="d-flex justify-end col-sm-12 col-12">
                  <div class="mt-5">
                    <theme-switcher />
                  </div>
                </div>
              </v-row>
            </v-container>
          </v-app-bar>
          <div id="header" class="d-flex mb-48">
            <responsive-avatar :src="getProfile['hero_image']" />
            <div class="px-3" />
            <div>
              <h1 class="text-h6 text-sm-h4 font-weight-medium">
                {{ getProfile['name'] }}
              </h1>
              <div class="d-flex pb-2 pb-sm-3 align-center">
                <star-rating :value="getProfile['star_rating']"></star-rating>
                <v-chip
                  small
                  outlined
                  class="rounded align-center"
                  color="secondary"
                  >{{ getProfile['category'] }}</v-chip
                >
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

          <!-- end-header -->

          <div id="gallery" class="xs-no-gutters">
            <v-divider></v-divider>
            <v-tabs centered height="53">
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

            <v-slide-group
              show-arrows
              id="category-select"
              v-model="image_category"
            >
              <v-slide-item
                v-for="category in getImgCategories"
                :key="category"
                v-slot="{ active, toggle }"
              >
                <v-chip-group>
                  <v-chip
                    class="text-sz-xs font-weight-medium"
                    :input-value="active"
                    active-class="primary--text font-weight-bold"
                    outlined
                    rounded
                    @click="toggle"
                  >
                    {{ category }}
                  </v-chip>
                </v-chip-group>
              </v-slide-item>
            </v-slide-group>

            <v-window v-model="image_category">
              <v-window-item
                v-for="category in getImgCategories"
                :key="category"
              >
                <v-container>
                  <v-row>
                    <v-col> </v-col>
                  </v-row>
                </v-container>
                <div class="d-flex flex-wrap">
                  <div
                    style="flex: 0 0 33.333333%"
                    v-for="(img, index) in getImg[category]"
                    :key="index"
                    class=""
                  >
                    <v-img
                      :lazy-src="img.size_xs"
                      :src="img.size_lg"
                      :srcset="`${img.size_sm} 350w`"
                      class=""
                      :alt="`${category}-${index}`"
                      :aspect-ratio="1"
                    />
                  </div>
                </div>
                <!-- {{ getImg[category]['xs'] }} -->
              </v-window-item>
            </v-window>
          </div>

          <!-- end-gallery -->

          <!-- separator -->

          <v-divider class="my-8 rounded-lg"></v-divider>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header class="text-h5 font-weight-medium">
                Raw Data
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-caption">
                {{ rawData }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- raw data -->

          <!-- {{ rawData }} -->
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
import ThemeSwitcher from '../components/ThemeSwitcher.vue'

export default {
  theme: { dark: false },
  components: { ResponsiveAvatar, CircleRating, StarRating, ThemeSwitcher },

  async created() {
    // only loading component after data fetched, work in server
    await this.$store.dispatch('fetchHotel')
    this.isDataLoaded = true
  },
  data() {
    return {
      isDataLoaded: false,
      length: 3,
      onboarding: 0,
      image_category: 'All',
    }
  },
  computed: {
    rawData() {
      return this.$store.state.hotel
    },
    ...mapGetters(['getProfile', 'getImgCategories', 'getImg']),
  },
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      console.log(this.$vuetify.theme.dark)
    },
  },
}
</script>

<style lang="scss">
* {
  outline: red 1px dotted !important;
}

.container {
  .lite-margin {
    margin: {
      top: min(max(29px, 7vh), 92px);
      bottom: min(max(29px, 9vh), 92px);
    }
  }
}

.no-transition-child > * {
  transition: none !important;
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

@media (max-width: 600px) {
  .xs-no-gutters {
    margin-left: -12px;
    margin-right: -12px;
    max-width: 100vw;
  }
  .xs\:mt--8 {
    margin-top: -8px;
  }
}
</style>
