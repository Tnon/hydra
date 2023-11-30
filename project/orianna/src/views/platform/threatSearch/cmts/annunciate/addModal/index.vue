<!--
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-08-16 10:05:59
 * @LastEditTime: 2022-05-30 01:05:41
-->
<template>
  <dynamic-form ref="slotRef" :fields="formData" :colsMap="formItems" :addTitle="addTitle" />
</template>
<script lang="ts">
  import { defineComponent, onBeforeUnmount, ref, toRefs, unref } from 'vue';
  import { state, useFormItems } from './index';
  import { dynamicForm } from '@hydra/components/dynamic-form';

  export default defineComponent({
    components: {
      dynamicForm,
    },
    setup() {
      const slotRef = ref<any>(null);
      const formItems = useFormItems() as any;
      onBeforeUnmount(() => {
        // 重置动态表单数据，和状态（默认展示一组）
        unref(slotRef).formRef.resetFields();
        state.formData.users = [{}];
      });
      return {
        slotRef,
        state,
        formItems,
        ...toRefs(state),
      };
    },
  });
</script>
