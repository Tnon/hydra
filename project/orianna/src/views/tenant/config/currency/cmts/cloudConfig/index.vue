<template>
  <div class="main">
    <div class="title">云端样本存储配置</div>
    <a-radio-group v-model:value="is_destroy" class="radioBox">
      <a-radio :value="false" class="radio">样本存储至云端</a-radio>
      <a-radio :value="true" class="radio">样本不存储至云端，检测后销毁</a-radio>
    </a-radio-group>
    <div><a-button type="primary" @click="confirmUpdate" class="buttton">确认保存</a-button></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { getTenentCloudInfo, setCloudInfo } from '@/api/tenant/config';

  const is_destroy = ref(false);
  //获取
  watchEffect(async () => {
    const { is_sample_destroy } = await getTenentCloudInfo();
    is_destroy.value = is_sample_destroy;
  });
  // 设置
  const confirmUpdate = async () => {
    await setCloudInfo({ is_sample_destroy: is_destroy.value });
  };
  
</script>

<style lang="scss" scoped>
  .main{
    
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 16px;
      font-weight: 500;
      color: #293038;
      margin-bottom: 20px;
    }

    .radioBox {
      display: flex;
      flex-direction: column;

      .radio {
        margin-bottom: 20px;
      }
    }

    .buttton {
      display: block;
      margin: 15px 0 0 30px;
    }
  }
</style>