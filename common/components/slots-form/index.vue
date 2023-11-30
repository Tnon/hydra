<template>
  <a-form ref="schemaFormRef" class="customForm" v-bind="formItemLayout">
    <template v-for="item in colsMap?.filter((ele) => ele.formProps)" :key="item.dataIndex">
      <div class="subTitle" v-if="item.dataIndex === 'slots'">
        {{ item.formProps?.subTitle }}
      </div>
      <a-form-item v-else :label="item.title" v-bind="{ ...validateInfos[item.dataIndex] }">
        <component
          @btnEvent="btnEvent"
          :disabled="disabled"
          v-model:value="fields[item.dataIndex]"
          :form-item="item.formProps"
          :dataIndex="item.dataIndex"
          :is="getComponent(item.formProps?.type)"
          :disKeys="disKeys"
        >
          <slot :validate="validate"></slot>
        </component>
      </a-form-item>
    </template>
  </a-form>
</template>
<script lang="ts">
  import { Form } from 'ant-design-vue';
  import { defineComponent, reactive, PropType, onUnmounted } from 'vue';
  import components from './components';
  import { TableColumn } from './types/tableColumn';
  interface Props {
    colsMap: TableColumn[];
    fields: object;
    formItemLayout: object;
    disKeys: object;
    disabled: boolean;
  }
  const useForm = Form.useForm;
  export default defineComponent({
    components: {
      ...components,
      [Form.name]: Form,
      [Form.Item.name]: Form.Item,
    },
    props: {
      colsMap: {
        type: Array as PropType<TableColumn[]>,
      },
      fields: {
        type: Object,
        default: () => ({}),
      },
      disKeys: {
        type: Object,
        default: () => ({}),
      },
      formItemLayout: {
        type: Object,
        default: () => ({
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
          labelAlign: 'left',
        }),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props: Partial<Props>, { emit }) {
      //表单验证规则
      const rulesRef = reactive(
        props
          .colsMap!.filter((ele) => ele.formProps)
          .reduce((pre, cur: any) => {
            pre[cur.dataIndex] = cur.formProps!.rules || [];
            return pre;
          }, {}),
      );
      //特殊事件
      const btnEvent = () => {
        emit('btnEvent');
      };

      //给filed主动赋键
      props.colsMap!.forEach((ele: any) => {
        if (ele.dataIndex !== 'slots' && ele.formProps) {
          props.fields![ele.dataIndex] = props.fields![ele.dataIndex] ?? undefined;
          props.fields![ele.dataIndex] =
            props.fields![ele.dataIndex] === '-' ? '' : props.fields![ele.dataIndex];
        }
      });

      const { resetFields, validate, validateInfos, validateField } = useForm(
        props.fields!,
        rulesRef,
      );

      const preset = [
        'input',
        'select',
        'radio',
        'checkbox',
        'textarea',
        'password',
        'inputNumber',
      ];
      // 获取组件名称
      const getComponent = (type) => {
        // 预设组件
        if (preset.includes(type)) {
          // type = type === 'password' ? 'input' : type
          return 'hooks-form-' + type;
        }
        return type;
      };
      onUnmounted(() => {
        resetFields();
      });
      return {
        validateInfos,
        validateField,
        getComponent,
        validate,
        resetFields,
        btnEvent,
      };
    },
  });
</script>
<style lang="less" scoped>
  .subTitle {
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 20px;
  }
</style>
