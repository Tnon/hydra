<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 12:14:56
 * @LastEditTime: 2022-05-19 10:12:06
-->
<template>
  <a-checkbox-group
    v-model:value="modelValue"
    v-bind="formItem"
    ref="checkbpx"
    :disabled="disKeys[dataIndex] || disabled"
  >
    <template v-if="formItem.options && formItem.options.length">
      <template v-for="option in formItem.options" :key="option.value">
        <a-checkbox :value="option.value">
          {{ option.label }}
        </a-checkbox>
      </template>
    </template>
  </a-checkbox-group>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { Checkbox } from 'ant-design-vue';
  import { FormItem } from '../types/schema';
  export default defineComponent({
    name: 'FormCheckbox',
    components: {
      [Checkbox.name]: Checkbox,
      [Checkbox.Group.name]: Checkbox.Group,
    },
    props: {
      formItem: {
        // 表单项
        type: Object as PropType<FormItem>,
        default: () => ({}),
      },
      disabled: Boolean,
      disKeys: {
        type: Object,
        required: true,
      },
      dataIndex: {
        type: String,
        required: true,
      },
      value: undefined as any, // 表单项值
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const modelValue = computed({
        get: () => props.value,
        set: (val) => emit('update:value', val),
      });

      return {
        modelValue,
      };
    },
  });
</script>
