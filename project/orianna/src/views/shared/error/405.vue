<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-12-15 17:27:53
-->
<template>
  <div class="page-container">
    <div>
      <h1>405</h1>
      <h1>没权限</h1>
      <a-button type="link" @click="goBack"> 回到上一页 </a-button>
    </div>
    <img src="../../../assets/404.gif" alt="" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: '405',
    setup() {
      const router = useRouter();
      const goBack = () => {
        router.go(-1);
      };
      return {
        goBack,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
