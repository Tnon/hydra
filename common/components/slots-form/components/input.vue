<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 12:14:56
 * @LastEditTime: 2022-05-19 10:13:15
-->
<template>
  <div class="inputBtn">
    <a-input
      :type="formItem.type"
      :placeholder="formItem.placeholder"
      v-model:value.trim="modelValue"
      :disabled="disKeys[dataIndex] || disabled"
    />
    <slot v-if="formItem.extraSlot"></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { Input } from 'ant-design-vue';
  import { FormItem } from '../types/schema';
  export default defineComponent({
    name: 'FormInput',
    components: {
      [Input.name]: Input,
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
      return {
        modelValue,
      };
    },
  });
</script>
<style lang="less" scoped>
  .inputBtn {
    display: flex;
    .btn {
      margin-left: 20px;
    }
  }
</style>
