<template>
  <span class="Badge" :data-year="year">
    <!-- <v-icon left small>{{ icon }}</v-icon> -->
    {{ text }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  year: string
}

type Props = {
  // icon: string
  text: string
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    /* icon: {
      type: String,
      required: true,
    }, */
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    const year = this.text.match(/^(\d{4})年/)?.[1] || ''
    return {
      year,
    }
  },
})
</script>

<style lang="scss" scoped>
.Badge {
  display: inline-block;
  position: relative;
  margin: 2px 10px 2px 0;

  padding: {
    top: 1px;
    bottom: 1px;
    left: 15px;
    right: 5px;
  }

  // height: 20px;
  line-height: 162%;

  background: #ababfc;
  color: #272727;

  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

  font-size: 0.7rem;
  font-weight: 400;

  &::before {
    display: inline-block;
    position: absolute;
    top: calc(50% - 1px);
    left: 6px;

    height: 4px;
    width: 4px;

    border-radius: 10px;
    margin: 0 5px 0 0;

    background: #fff;
    content: '';
  }

  &::after {
    display: inline-block;
    position: absolute;
    top: 0;
    right: -20px;

    height: 0;
    width: 0;

    border: 10px solid;
    border: {
      top-color: transparent;
      right-color: transparent;
      bottom-color: transparent;
    }
    border-left-color: #ababfc;

    content: '';
  }

  &[data-year='2020'] {
    // PANTONE Color of the Year 2020: Classic Blue 19-4052 TPG (#34568b)
    background: #34568b;
    color: #fafafa;

    &::after {
      border-left-color: #34568b;
    }
  }

  &[data-year='2019'] {
    // PANTONE Color of the Year 2019: Living Coral 16-1546 TPG (#fc776a)
    background: #fc776a;
    color: #131313;

    &::after {
      border-left-color: #fc776a;
    }
  }

  &[data-year='2018'] {
    // PANTONE Color of the Year 2018: Ultra Violet 18-3838 TPG (#6b5b95)
    background: #6b5b95;
    color: #ffffff;

    &::after {
      border-left-color: #6b5b95;
    }
  }

  &[data-year='2017'] {
    // PANTONE Color of the Year 2017: Greenery 15-0343 TPG (#92b558)
    background: #92b558;
    color: #1f1f1f;

    &::after {
      border-left-color: #92b558;
    }
  }

  &[data-year='2016'] {
    // PANTONE Color of the Year 2016: Serenity 15-3919 TPG (#95aad3)
    background: #95aad3;
    color: #1f1f1f;

    &::after {
      border-left-color: #95aad3;
    }
  }

  &[data-year='2015'] {
    // PANTONE Color of the Year 2015: Marsala 18-1438 TPG (#975a59)
    background: #975a59;
    color: #ffffff;

    &::after {
      border-left-color: #975a59;
    }
  }

  &[data-year='2014'] {
    // PANTONE Color of the Year 2014: Radiant Orchid 18-3224 TPG (#b067a1)
    background: #b067a1;
    color: #000000;

    &::after {
      border-left-color: #b067a1;
    }
  }

  &[data-year='2013'] {
    // PANTONE Color of the Year 2013: Emerald 17-5641 TPG (#00997b)
    background: #00997b;
    color: #000000;

    &::after {
      border-left-color: #00997b;
    }
  }
}
</style>
