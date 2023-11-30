<template>
  <div>
    <div class="header">
      <div class="titleCom">威胁情报</div>
    </div>
    <div class="platCfg">
      <Spin :spinning="loading">
        <div class="title">平台配置</div>
        <slots-form
          ref="slosForm"
          labelAlign="left"
          :formItemLayout="{
            labelCol: { style: { width: '100px' } },
            wrapperCol: { span: 4 },
          }"
          :colsMap="formItems"
          :fields="state"
        />
      </Spin>
      <a-button class="confirm" type="primary" :loading="btnLoading" @click="confirm">
        保存
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { getSystemConfig, setSystemConfig } from '@/api/platform/config';
  import slotsForm from '@hydra/components/slots-form';
  import { Spin } from 'ant-design-vue';
  import { defineComponent, reactive, ref, unref } from 'vue';
  import { useFormItems } from './index';
  export default defineComponent({
    components: {
      slotsForm,
      Spin,
    },
    setup() {
      const slosForm = ref<any>(null);
      const loading = ref(false),
        btnLoading = ref(false);
      const formItems = useFormItems();
      const state = reactive({
        serv_addr: '',
        account: '',
        password: '',
      });

      const getConfig = async () => {
        loading.value = true;
        const res = await getSystemConfig();
        Object.assign(state, res);
        loading.value = false;
      };
      //获取配置
      getConfig();
      //保存配置
      const confirm = async () => {
        await unref(slosForm)?.validate();
        btnLoading.value = true;
        await setSystemConfig(state);
        btnLoading.value = false;
      };
      return {
        formItems,
        state,
        loading,
        confirm,
        btnLoading,
        slosForm,
      };
    },
  });
</script>

<style lang="less" scoped>
  .header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
  }
  .platCfg {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    margin: 0 20px;
    border-bottom: 1px solid #eee;
    .title {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
    .confirm {
      margin-left: 100px;
    }
  }
</style>
