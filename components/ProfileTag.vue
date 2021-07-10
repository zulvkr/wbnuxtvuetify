<template>
  <v-chip
    small
    outlined
    class="rounded align-center"
    :color="$vuetify.theme.dark ? 'accent' : 'accent accent--text text--darken-4'"
    :style="$vuetify.theme.dark ? 'color: white !important' : ''"
  >
    <slot></slot>
  </v-chip>
</template>