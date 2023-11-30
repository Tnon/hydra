<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 12:14:56
 * @LastEditTime: 2022-05-19 11:34:47
-->
<template>
  <a-select
    :placeholder="formItem.placeholder"
    v-model:value="modelValue"
    ref="select"
    :disabled="disKeys[dataIndex] || disabled"
  >
    <template v-if="formItem.options && formItem.options.length">
      <template v-for="option in formItem.options" :key="option.value">
        <Option :value="option.value">
          {{ option.label }}
        </Option>
      </template>
    </template>
    <template v-else>
      <template v-for="option in asyncOptions" :key="option.id">
        <Option :value="option.id">
          {{ option.repname }}
        </Option>
      </template>
    </template>
  </a-select>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed, onMounted, reactive } from 'vue';
  import { Select } from 'ant-design-vue';
  import { isFunction } from '@hydra/utils/tools';
  import { FormItem } from '../types/schema';
  export default defineComponent({
    name: 'FormSelect',
    components: {
      [Select.name]: Select,
      Option: Select.Option,
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
      value: undefined as any, // 表单项值
      disabled: Boolean,
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      let asyncOptions = reactive<any>([]);
      const getOptions = async () => {
        if (isFunction(props.formItem.asyncOptions)) {
          const data = await props.formItem.asyncOptions();
          Object.assign(asyncOptions, data);
        }
      };

      const modelValue = computed({
        get: () => props.value,
        set: (val) => emit('update:value', val),
      });
      onMounted(() => {
        getOptions();
      });
      return {
        modelValue,
        asyncOptions,
      };
    },
  });
</script>
