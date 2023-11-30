<template>
  <div>
    <div class="header">通用配置</div>
    <div class="content">
      <div class="twoColumns">
        <!-- 连接配置 start -->
        <cloud-connect
          @updateStatus="updateStatus"
          :cloud_connect="state.cloud_connect"
          :cloud_connect_status="state.cloud_connect_status"
          :pageLoading="pageLoading"
          class="left"
        />
        <!-- 连接配置 end -->

        <!-- 连接配置 start -->
        <server-config
          :device_code="state.device_code"
          :link_status="state.link_status"
          :pageLoading="pageLoading"
          class="right"
        />
        <!-- 连接配置 end -->
      </div>

      <!-- 系统授权 start -->
      <system-auth :pageLoading="pageLoading" :cloud_connect_info="state.cloud_connect_info" />
      <!-- 系统授权 end -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { serverConfig } from './cmts/serverConfig';
  import { cloudConnect } from './cmts/cloudConnect';
  import { systemAuth } from './cmts/systemAuth';
  import { getCurrencData } from '@/api/config';
  const state = reactive({
    cloud_connect_info: {
      auto_begin: 0,
      auto_end: 0,
      auto_total_day: 0,
      auto_used_day: 0,
      behavior_ver: '',
      device_code: '',
      device_id: 0,
      expert_total: 0,
      expert_used: 0,
      sys_ver: '',
    },
    cloud_connect: '',
    cloud_connect_status: 1,
    gateway_connect: '',
    gateway_connect_status: 1,
    device_code: '', // 邮件网关——传输密钥
    link_status: 0, // 邮件网关——连接状态
  });
  //页面loading
  const pageLoading = ref(false);
  const updateStatus = async (boolean?: boolean) => {
    if (boolean) {
      pageLoading.value = true;
    }
    const res = await getCurrencData();
    Object.assign(state, res);
    pageLoading.value = false;
  };
  onMounted(() => {
    updateStatus(true);
  });
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
    border-radius: 4px;
    margin: 0 20px;
    overflow: auto;

    .twoColumns {
      display: flex;

      .left, .right {
        width: 50%;
      }
    }
  }
</style>
