<template>
  <div class="Wrapper">
    <v-chip
      v-bind="$attrs"
      class="mr-0 pl-1 pr-1 Chip-NoActivable"
      label
      :ripple="false"
      small
      outlined
    >
      <v-avatar left class="AuthorIcon">
        <!-- <Icon03
          v-if="getAuthorIcon(author) === 'MAYSO'"
          style="height: 16px; width: 16px"
        /> -->
        <img
          v-if="getAuthorIcon(author) === 'MAYSO'"
          style="height: 16px; width: 16px"
          src="@/assets/icon03.svg"
        />
        <v-icon v-else-if="getAuthorIcon(author) === 'NONE'" size="16px">
          {{ mdiAccount }}
        </v-icon>
      </v-avatar>
      {{ author }} </v-chip
    >として<template v-if="myRole">&mdash;{{ myRole }}</template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Icon03 from '@/assets/icon03.svg'
import { mdiAccount } from '@mdi/js'

type AuthorIcon = 'MAYSO' | 'KYOU' | 'NONE'

type Data = {
  mdiAccount: string
}

type Methods = {
  getAuthorIcon(value: string): AuthorIcon
}

type Props = {
  author: string
  myRole: string
}

export default Vue.extend<Data, Methods, unknown, Props>({
  components: {
    /* Icon03 */
  },
  props: {
    author: {
      type: String,
      required: true,
    },

    myRole: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mdiAccount,
    }
  },
  methods: {
    getAuthorIcon(value) {
      if (value.includes('MaySoMusician')) return 'MAYSO'
      else return 'NONE'
    },
  },
})
</script>

<style lang="scss" scoped>
.AuthorIcon.v-avatar {
  height: 16px !important;
  width: 16px !important;
  min-width: 16px !important;
  margin: {
    left: 0 !important;
    right: 4px !important;
  }
}

/* Copied from FeaturedCardProgrammingProject.vue */
.Wrapper,
.Chip-NoActivable.v-chip {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.65rem !important;
  line-height: 120% !important; // Adjusted
  overflow-wrap: normal;
}

.Chip-NoActivable.v-chip {
  height: 18px;

  &:active {
    box-shadow: unset;
  }
}
</style>
