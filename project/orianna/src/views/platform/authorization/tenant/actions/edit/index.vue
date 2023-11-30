<template>
  <div>
    <a-form labelAlign="left" :labelCol="{ span: 4 }">
      <a-form-item label="手机号码" v-bind="validateInfos.user_phone">
        <a-input v-model:value="user_phone"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { Form } from 'ant-design-vue';
  import { validatePhoneNumber } from '@hydra/utils/reg';
  const useForm = Form.useForm;

  export default defineComponent({
    props: {
      phone_number: String,
    },
    setup(props) {
      // reactive后续可扩展
      const state = reactive({
        user_phone: props.phone_number || '', // 手机号码
      });

      const rulesRef = reactive({
        user_phone: [
          {
            required: true,
            validator: validatePhoneNumber,
            message: '请输入正确的手机号码',
            trigger: 'change',
          },
        ],
      });

      const { validate, validateInfos } = useForm(state, rulesRef);
      return {
        ...toRefs(state),
        state,
        validate,
        validateInfos,
      };
    },
  });
</script>
