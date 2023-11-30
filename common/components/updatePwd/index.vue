<!--
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2022-05-19 11:36:04
-->
<template>
  <slots-from ref="slotsForm" :disKeys="{ account: true }" :colsMap="formItems" :fields="fields" />
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import SlotsFrom from '../slots-form';
  import { TableColumn } from './types/tableColumn';
  import { checkStrong } from '@hydra/utils/tools';
  export default defineComponent({
    components: {
      SlotsFrom,
    },
    props: {
      account: String,
      id: String,
    },
    setup(props) {
      const slotsForm = ref<any>('');
      const fields = reactive({
        id: props.id!,
        account: props.account!,
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
      const validatePWD = (_, value) => {
        const results = checkStrong(value ?? '', fields.account || '');
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
      const formItems: TableColumn[] = [
        {
          title: '账号',
          dataIndex: 'account',
          formProps: {
            type: 'input',
            placeholder: '请输入账号',
            rules: [{ required: true, message: '账号不能为空' }],
          },
        },
        {
          title: '旧密码',
          dataIndex: 'old_password',
          formProps: {
            type: 'password',
            placeholder: '请输入旧的密码',
            rules: [
              {
                required: true,
                message: '请输入旧的密码',
              },
            ],
          },
        },
        {
          title: '新密码',
          dataIndex: 'new_password',
          formProps: {
            type: 'password',
            placeholder: '请输入新的密码',
            mode: pwdLevelMode,
            rules: [
              {
                required: true,
                message: '请输入新的密码',
                validator: validatePWD,
              },
            ],
          },
        },
        {
          title: '密码确认',
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

      return {
        formItems,
        fields,
        slotsForm,
      };
    },
  });
</script>
