<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 12:03:03
 * @LastEditTime: 2022-04-20 20:39:08
-->
<template>
  <a-upload :showUploadList="showUploadList" :headers="headers">
    <slot></slot>
  </a-upload>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { useUserToken } from '@/store/modules'; //不知道
  export default defineComponent({
    components: {
      [Upload.name]: Upload,
    },
    props: {
      showUploadList: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const userTokenStore = useUserToken();
      const token = computed(() => userTokenStore.token);
      const tokenType = computed(() => userTokenStore.tokenType);
      const headers = {
        Authorization: `${unref(tokenType)} ${unref(token)}`,
      };

      return {
        headers,
      };
    },
  });
</script>
