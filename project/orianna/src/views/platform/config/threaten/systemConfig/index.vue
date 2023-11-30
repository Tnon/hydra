<template>
  <div class="systemConfig">
    <div class="header">系统配置</div>
    <a-radio-group v-model:value="smsStatus">
      <a-radio :value="0" class="radio">关闭短信验证</a-radio>
      <a-radio :value="1" class="radio">开启短信验证</a-radio>
    </a-radio-group>
    <div><a-button type="primary" @click="confirmUpdate" class="button">确认保存</a-button></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { requestSMSInfo, setSMSInfo } from '@/api/platform/config';

  export default defineComponent({
    setup() {
      const smsStatus = ref(0); // 短信验证是否开启，初始未开启
      const confirmUpdate = () => {
        setSMSInfo({ sms_status: smsStatus.value });
      };

      onMounted(async () => {
        const { sms_status } = await requestSMSInfo();
        smsStatus.value = sms_status;
      });
      return {
        smsStatus,
        confirmUpdate,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .systemConfig {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
    background: #fff;
    .header {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 20px;
    }
    .button {
      display: block;
      margin: 15px 0 0 120px;
    }
  }
</style>
