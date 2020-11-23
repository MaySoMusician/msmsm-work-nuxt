<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="8" class="Title-Wrapper"></v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { titlePerPage } from '@/userModules/constants'

type Data = {}

type Computed = {}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: {},
  data() {
    return {}
  },
  computed: {},
  head() {
    return {
      title: titlePerPage.index,
      titleTemplate: '',
      meta: [
        { hid: 'og:title', property: 'og:title', content: titlePerPage.index },
      ],
    }
  },
})
</script>

<style lang="scss" scoped></style>
