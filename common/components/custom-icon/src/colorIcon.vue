<template>
  <svg class="svg-icon icon" :style="style">
    <use :xlink:href="type" />
  </svg>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      type: {
        type: String,
        required: true,
      },
      size: {
        type: [Number, String],
        default: 14,
      },
    },
    setup(props) {
      const style = {
        fontSize: `${Number(props.size)}px`,
      };
      return { style };
    },
  });
</script>
<style lang="less" scoped>
  .svg-icon {
    cursor: pointer;
  }
</style>
