<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-12-15 17:24:32
-->
<template>
  <div class="page-container">
    <div>
      <h1>404</h1>
      <h1>oh...</h1>
      <router-link to="/" class="ant-btn ant-btn-primary"> 回到首页 </router-link>
    </div>
    <img src="../../../assets/404.gif" alt="" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '404',
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
