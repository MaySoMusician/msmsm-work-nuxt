<template>
  <v-img v-bind="$attrs" contain>
    <template #placeholder>
      <v-row
        class="fill-height ma-0"
        style="position: relative"
        align="center"
        justify="center"
      >
        <v-skeleton-loader v-if="$attrs.src" type="image" width="100%" />
        <div v-else style="width: 100%">
          <v-skeleton-loader boilerplate type="image" width="100%" />
          <span
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 0.7rem;
            "
            >NO IMAGE</span
          >
        </div>
      </v-row>
    </template>
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped></style>
