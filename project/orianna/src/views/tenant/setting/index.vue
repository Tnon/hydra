<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2022-06-16 10:59:36
-->
<template>
  <div class="setting">
    <div class="titleCom header">基础设置</div>
    <div class="content">
      <div class="title">重置密码</div>
      <div class="main">
        <slots-from ref="slotsForm" :colsMap="formItems" :fields="fields" />
      </div>
      <a-button type="primary" class="confirm" @click="saveConfig"> 保存 </a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref } from 'vue';
  import SlotsFrom from '@hydra/components/slots-form';
  import { updateTenantPassword } from '@/api/tenant/setting';
  import { useUserToken } from '@/store/modules';
  import { checkStrong } from '@hydra/utils/tools';
  import { pCompile } from '@hydra/utils/urlUtils';
  export default defineComponent({
    components: {
      SlotsFrom,
    },
    setup() {
      const slotsForm = ref<any>('');
      const fields = reactive({
        id: '',
        old_password: '',
        new_password: '',
        repeat_password: '',
      });
      const pwdLevelMode = reactive({
        low: false,
        middle: false,
        high: false,
        level: 0,
      });
      // 密码校验
      const validatePWD = (_, value) => {
        const results = checkStrong(value ?? '', '');
        Object.assign(pwdLevelMode, results);
        if (pwdLevelMode.level === 3) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      };
      const validatePWDCheck = (_, value) => {
        if (value !== fields.new_password) {
          return Promise.reject();
        }
        return Promise.resolve();
      };
      const formItems: any = [
        {
          title: '旧密码:',
          dataIndex: 'old_password',
          formProps: {
            type: 'password',
            placeholder: '请输入旧密码',
            rules: [
              {
                required: true,
                message: '请输入旧密码',
              },
            ],
          },
        },
        {
          title: '新密码:',
          dataIndex: 'new_password',
          formProps: {
            type: 'password',
            placeholder: '请输入新密码',
            mode: pwdLevelMode,
            rules: [
              {
                required: true,
                message: '请输入新密码',
                validator: validatePWD,
              },
            ],
          },
        },
        {
          title: '确认密码:',
          dataIndex: 'repeat_password',
          formProps: {
            type: 'password',
            placeholder: '请再次输入新密码',
            rules: [
              {
                required: true,
                message: '两次输入的密码不一致',
                validator: validatePWDCheck,
              },
            ],
          },
        },
      ];

      // 保存
      // 获取当前用户id
      const useUserTokenStore = useUserToken();
      const userId = useUserTokenStore.userInfo.id;
      const saveConfig = async () => {
        await slotsForm.value.validate();
        // 重置密码
        const { code } = await updateTenantPassword(
          Object.assign(
            {},
            { id: userId },
            { old_password: pCompile(unref(slotsForm).fields.old_password) },
            { new_password: pCompile(unref(slotsForm).fields.new_password) },
            { repeat_password: pCompile(unref(slotsForm).fields.repeat_password) },
          ),
        );
        !code && unref(slotsForm).resetFields();
      };
      return {
        formItems,
        fields,
        slotsForm,
        saveConfig,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-weight: 500;
    color: #293038;
  }
  .content {
    background: #fff;
    height: calc(100vh - 160px);
    border-radius: 4px;
    margin: 0 20px 20px 20px;
    .title {
      padding: 20px 20px 0 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
    .main {
      padding: 30px 20px 10px 30px;
    }
    ::v-deep(.ant-input) {
      width: 400px;
    }
    ::v-deep(.ant-col-4) {
      flex: 0 0 100px;
    }
    ::v-deep(.ant-form-item-label > label) {
      font-size: 14px;
    }
    .confirm {
      margin-left: 130px;
    }
  }
</style>
