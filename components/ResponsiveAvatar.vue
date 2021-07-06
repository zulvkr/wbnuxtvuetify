<template>
  <fragment>
    <v-sheet class="d-none d-sm-flex" width="31.5%">
      <v-avatar class="mx-auto" size="168">
        <v-img :src="src"> </v-img>
      </v-avatar>
    </v-sheet>
    <v-sheet class="d-flex d-sm-none" width="91">
      <v-avatar class="mx-auto" size="91">
        <v-img :src="src"></v-img>
      </v-avatar>
    </v-sheet>
  </fragment>
</template>

<script>
export default {
  props: ['src']
}
</script>