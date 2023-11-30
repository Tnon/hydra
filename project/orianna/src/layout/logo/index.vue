<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2022-02-07 14:59:14
-->
<template>
  <div class="logo">
    <!-- <a-image :src="wholeUrl" :fallback="defaultLogo"> -->
    <a-image :src="logoUrl" :fallback="defaultLogo">
      <template #placeholder>
        <loading-outlined />
      </template>
    </a-image>
  </div>
</template>
<script lang="ts">
  import defaultLogo from '@/assets/images/M01-白色.png';
  import { defineComponent } from 'vue';
  import { Image } from 'ant-design-vue';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'Index',
    components: {
      [Image.name]: Image,
      LoadingOutlined,
    },
    props: {
      logoUrl: String,
    },

    setup() {
      return {
        defaultLogo,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
    ::v-deep(img) {
      height: 40px;
      width: 40px;
    }

    .title {
      color: white;
      margin-bottom: 0;
    }
  }
</style>
