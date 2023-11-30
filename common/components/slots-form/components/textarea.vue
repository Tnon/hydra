<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-26 17:54:02
 * @LastEditTime: 2022-05-19 10:18:05
-->
<template>
  <a-textarea
    :autoSize="{ minRows: 6, maxRows: 6 }"
    :disabled="disKeys[dataIndex] || disabled"
    :placeholder="formItem.placeholder"
    v-model:value="modelValue"
  />
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, onMounted } from 'vue';
  import { Input } from 'ant-design-vue';
  import { FormItem } from '../types/schema';
  export default defineComponent({
    name: 'FormTextarea',
    components: {
      [Input.TextArea.name]: Input.TextArea,
    },
    props: {
      formItem: {
        // 表单项
        type: Object as PropType<FormItem>,
        default: () => ({}),
      },
      disKeys: {
        type: Object,
        required: true,
      },
      dataIndex: {
        type: String,
        required: true,
      },
      disabled: Boolean,
      value: undefined as any, // 表单项值
    },
    setup(props, { emit }) {
      const modelValue = computed({
        get: () => props.value,
        set: (val) => emit('update:value', val),
      });
      onMounted(() => {});
      return {
        modelValue,
      };
    },
  });
</script>
