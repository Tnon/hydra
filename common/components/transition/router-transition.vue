<template>
  <router-view v-slot="{ Component }">
    <transition name="zoom-fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'RouterTransition',
    props: {
      notNeedKey: {
        type: Boolean,
        default: false,
      },
      animate: {
        type: Boolean,
        default: true,
      },
    },
    setup() {},
  });
</script>
