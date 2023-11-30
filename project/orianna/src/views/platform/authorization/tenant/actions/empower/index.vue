<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-27 10:21:45
 * @LastEditTime: 2022-04-20 13:56:02
-->
<template>
  <div>
    <div class="formItem">
      <span class="label">自动检测授权</span>
      <span class="item">
        <span class="preLabel">追加</span>
        <a-input-number v-model:value="auto_change" class="iptNumber" />
        <span class="sufLabel">月</span>
      </span>
    </div>
    <div class="formItem">
      <span class="label">专家分析授权</span>
      <span class="item">
        <span class="preLabel">追加</span>
        <a-input-number v-model:value="expert_change" class="iptNumber" />
        <span class="sufLabel">次</span>
      </span>
    </div>
    <span class="item">
      <a-form labelAlign="left" :labelCol="{ span: 4 }">
        <a-form-item label="备注" v-bind="validateInfos.remark">
          <a-textarea
            :autoSize="{ minRows: 6, maxRows: 6 }"
            class="iptNumber"
            v-model:value="remark"
          />
        </a-form-item>
      </a-form>
    </span>
  </div>
</template>

<script lang="ts">
import { validateByteLength } from "@hydra/utils/reg";
import { Form, Input, InputNumber } from "ant-design-vue";
import { defineComponent, reactive, toRefs } from "vue";
const useForm = Form.useForm;

export default defineComponent({
  components: {
    [InputNumber.name]: InputNumber,
    [Input.TextArea.name]: Input.TextArea,
  },
  setup() {
    const state = reactive({
      auto_change: 0,
      expert_change: 0,
      remark: "",
    });
    //正则
    const rulesRef = reactive({
      remark: [
        {
          message: "备注不能超过200个字符",
          validator: validateByteLength(200),
        },
      ],
    });
    // hooks
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

<style scoped lang="less">
.formItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  .label {
    flex: 16.667% 0 0;
    font-size: 12px;
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iptNumber {
      flex: 1;
    }
    .preLabel {
      margin-right: 10px;
    }
    .sufLabel {
      margin-left: 10px;
    }
  }
}
</style>
