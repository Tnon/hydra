<template>
  <div>
    <div class="header">通用配置</div>
    <div class="content">
      <div class="twoColumns">
        <!-- 邮件网关配置 start -->
        <server-config class="left"/>
        <!-- 邮件网关配置 end -->

        <!-- 云端连接配置 start -->
        <cloud-config class="right"/>
        <!-- 云端连接配置 end -->
      </div>

      <!-- 系统授权 start -->
      <system-auth />
      <!-- 系统授权 end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import cloudConfig from './cmts/cloudConfig/index.vue';
  import { serverConfig } from './cmts/serverConfig/index';
  import { systemAuth } from './cmts/systemAuth';
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
    overflow: auto;
    background: #fff;
    border-radius: 4px;
    margin: 0 20px;

    .twoColumns {
      display: flex;

      .left, .right {
        width: 50%;
      }
    }
  }
</style>
