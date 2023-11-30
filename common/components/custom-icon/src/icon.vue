<template>
  <i :class="`axsj ${type}`" class="iIcon" :style="style"></i>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      type: {
        type: String,
        required: true,
      },
      color: {
        type: String,
      },
      size: {
        type: [Number, String],
        default: 14,
      },
    },
    setup(props) {
      const style = {
        fontSize: `${Number(props.size) / 32}rem`,
        color: props.color,
      };
      return { style };
    },
  });
</script>
<style lang="less" scoped>
  .iIcon {
    cursor: pointer;
  }
</style>
