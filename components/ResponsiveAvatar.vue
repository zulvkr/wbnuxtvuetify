<template>
  <fragment>
    <div class="d-none d-sm-flex" style="width: 31.5%">
      <v-avatar class="mx-auto" size="168">
        <v-img :src="src"> </v-img>
      </v-avatar>
    </div>
    <div class="d-flex d-sm-none" style="width: 91px">
      <v-avatar class="mx-auto" size="91">
        <v-img :src="src"></v-img>
      </v-avatar>
    </div>
  </fragment>
</template>

<script>
export default {
  props: ['src'],
}
</script>