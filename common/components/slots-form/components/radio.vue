<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 12:14:56
 * @LastEditTime: 2022-05-19 10:15:47
-->
<template>
  <a-radio-group :disabled="disKeys[dataIndex] || disabled" v-model:value="modelValue">
    <template v-for="item in formItem.options" :key="item.label">
      <a-radio :value="item.value">{{ item.label }}</a-radio>
    </template>
  </a-radio-group>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, onMounted } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { FormItem } from '../types/schema';
  export default defineComponent({
    name: 'FormRadio',
    components: {
      [Radio.name]: Radio,
      [Radio.Group.name]: Radio.Group,
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
