<template>
  <div>
    <div class="header">安全配置</div>
    <div class="content">
      <!-- acl start -->
      <acl-control />
      <!-- acl end -->

      <!-- pwd start -->
      <pwd-lock />
      <!-- pwd end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import aclControl from './acl/index.vue';
  import pwdLock from './pwdLock/index.vue';
</script>
<style lang="less" scoped>
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 500;
    color: #293038;
  }
  .content {
    height: calc(100vh - 160px);
    background: #fff;
    margin: 0 20px;
  }
</style>
