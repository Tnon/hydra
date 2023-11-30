<template>
  <component :is="iconType" :type="type" :size="size" />
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import colorIcon from './src/colorIcon.vue';
  import Icon from './src/icon.vue';
  export default defineComponent({
    components: {
      colorIcon,
      Icon,
    },
    props: {
      type: {
        type: String,
        required: true,
      },
      size: [String, Number],
    },
    setup(props) {
      const iconType = computed(() => (props.type.indexOf('#') === 0 ? colorIcon : Icon));
      return {
        iconType,
      };
    },
  });
</script>
