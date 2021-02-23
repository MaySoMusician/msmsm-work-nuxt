<template>
  <v-navigation-drawer
    class="blue-grey darken-4"
    app
    dark
    fixed
    :mini-variant="miniVariant"
    :mini-variant-width="60"
    :width="180"
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-toolbar flat class="transparent" dense>
      <v-list
        class="pa-0"
        :class="{ 'NavList-BorderBottom': miniVariant }"
        width="100%"
      >
        <v-list-item :class="{ 'pr-0': !miniVariant, 'px-0': miniVariant }">
          <v-list-item-content v-if="!miniVariant" class="my-0">
            <v-list-item-title>
              <h2>MSMSM</h2>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="my-0">
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>
                <template v-if="miniVariant">mdi-chevron-right</template>
                <template v-else>mdi-chevron-left</template>
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>

    <!-- <v-tooltip right :disabled="!miniVariant">
        <template #activator="{ on }">
          <v-toolbar flat class="transparent" dense v-on="on">
            <v-list class="pa-0" :class="{ 'NavList-BorderBottom': miniVariant }">
              <v-list-item to="/" exact>
                <v-list-item-action>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Project Overview</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-toolbar>
        </template>

        <span>Project Overview</span>
      </v-tooltip>
      <v-divider></v-divider> -->

    <v-list subheader>
      <!-- <v-subheader></v-subheader> -->
      <template v-for="(item, index) in items">
        <v-tooltip :key="index" right :disabled="!miniVariant">
          <template #activator="{ on }">
            <v-list-item :to="item.to" exact v-on="on">
              <v-list-item-action :class="{ 'mr-4': !miniVariant }">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  miniVariant: boolean
  items: { icon: string; title: string; to: string }[]
}

type Props = {
  value: boolean
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      miniVariant: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/',
        },
        {
          icon: 'mdi-account-details',
          title: 'プロフィール',
          to: '',
        },
        {
          icon: 'mdi-iframe',
          title: 'プログラミング',
          to: '/programming',
        },
        {
          icon: 'mdi-music-clef-bass',
          title: '音楽',
          to: '',
        },
        /* {
          icon: 'mdi-message-processing-outline',
          title: '不具合・要望',
          to: '/feedback',
        }, */
      ],
    }
  },
})
</script>

<style lang="scss">
.v-application {
  nav .v-toolbar__content {
    padding: {
      left: 0;
      right: 0;
    }
  }

  // Applied only to light theme
  &.theme--light {
    background-color: #efefef;
  }

  /* .theme--light {
    &.v-app-bar.v-toolbar.v-sheet {
      background-color: #fbb803;
    }

    &.v-app-bar.v-toolbar.v-sheet {
      box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.2);
    }
  } */
}
</style>

<style lang="scss" scoped>
.NavList-BorderBottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
}
</style>
