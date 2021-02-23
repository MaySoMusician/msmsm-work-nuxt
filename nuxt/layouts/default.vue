<template>
  <v-app>
    <TheNavigationLeft v-model="drawer" />

    <v-app-bar class="Header" app flat dense color="primary lighten-1">
      <v-app-bar-nav-icon class="d-lg-none" @click.stop="drawer = !drawer" />
      <Icon03 height="42px" width="42px" />
      <v-toolbar-title class="Header-Title pl-2"
        >MaySoMusician の音楽スタジオ</v-toolbar-title
      >
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn icon v-on="on" @click.stop="rightDrawer = !rightDrawer">
            <v-badge color="accent" overlap>
              <span slot="badge">2</span>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>2 unread notifications</span>
      </v-tooltip> -->
    </v-app-bar>

    <v-main>
      <!-- <v-container id="MainContainer">
        <nuxt />
      </v-container> -->
      <nuxt />
      <v-footer class="Footer" color="primary lighten-1">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <small v-html="copyright" />
      </v-footer>
    </v-main>
    <v-snackbar v-model="showSnackbar" color="error" timeout="8000">
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false">閉じる</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import TheNavigationLeft from '@/components/TheNavigationLeft.vue'
import { store } from '@/store/index'
import { websiteCopyright, baseUrl } from '@/userModules/constants'
import Icon03 from '@/assets/icon03.svg?inline'

type Data = {
  drawer: boolean
  showSnackbar: boolean
  snackbarText: string
}

type Computed = {
  copyright: string
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: { TheNavigationLeft, Icon03 },
  async asyncData() {
    if (process.browser) return
    try {
      // Binds it on server side then unbind again to avoid memory leaks on the server.
      await store.dispatch('bindProgrammingProjectsCollection')
      store.dispatch('unbindProgrammingProjectsCollection')
    } catch (e) {
      console.error(e)
    }
  },
  data() {
    return {
      drawer: false,
      // title: websiteName,
      showSnackbar: false,
      snackbarText: '',
    }
  },
  computed: {
    copyright() {
      return websiteCopyright
    },
  },
  mounted() {
    try {
      store.dispatch('bindProgrammingProjectsCollection')
    } catch (e) {
      this.snackbarText = 'データベース接続エラー: 3'
      this.showSnackbar = true
    }
  },
  head() {
    const href = `${baseUrl}${this.$route.path.slice(1)}`
    return {
      meta: [{ hid: 'og:url', property: 'og:url', content: href }],
      link: [{ rel: 'canonical', href }],
    }
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

:root {
  overflow-y: auto;
}

.v-application {
  font-feature-settings: 'palt' 1;

  // Applied both to light & dark theme
  .v-btn:not(.v-btn--outlined) {
    &.primary {
      color: map-deep-get($material-light, 'text', 'primary');
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

.Header {
  &-Title {
    font-size: 1.5rem !important;
    font-weight: 700;
  }
}

.Footer {
  position: sticky !important;
  top: 100vh;

  small {
    font-size: 0.74rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    p {
      margin: {
        bottom: 0.1em;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.Logo {
  height: 48px;
  width: auto;
  margin: {
    top: 4px;
  }
}
</style>
