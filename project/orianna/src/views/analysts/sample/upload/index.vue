<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-28 16:50:24
 * @LastEditTime: 2022-04-20 12:04:29
-->
<template>
  <div>
    <a-form labelAlign="left" :labelCol="{ span: 4 }">
      <a-form-item label="风险值" v-bind="validateInfos.result">
        <a-input-number v-model:value="result" />
        <span class="tips">请输入0 - 100区间内的数值</span>
      </a-form-item>
      <a-form-item label="分析概要" v-bind="validateInfos.summary">
        <a-textarea v-model:value.trim="summary" :autoSize="{ minRows: 6, maxRows: 6 }" />
      </a-form-item>
      <a-form-item label="处置建议" v-bind="validateInfos.suggestion">
        <a-textarea
          v-model:value.trim="formState.suggestion"
          :autoSize="{ minRows: 6, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item label="详细分析" v-bind="validateInfos.file">
        <uploadFile :beforeUpload="beforeUpload">
          <a-button class="upload"> 上传附件 </a-button>
        </uploadFile>
        <div v-if="fileName" class="fileList">
          <span>{{ fileName }}</span>
          <DeleteOutlined @click="handleRemove" />
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { InputNumber, Input } from 'ant-design-vue';
  import uploadFile, { FileInfo } from '@/components/upload-file';
  import { Form } from 'ant-design-vue';
  import { validateByteLength } from '@hydra/utils/reg';
  import { DeleteOutlined } from '@ant-design/icons-vue';
  const useForm = Form.useForm;
  export default defineComponent({
    components: {
      [InputNumber.name]: InputNumber,
      [Input.TextArea.name]: Input.TextArea,
      uploadFile,
      DeleteOutlined,
    },
    setup() {
      //文件名
      const fileName = ref('');
      //表单数据
      const formState = reactive({
        result: 0,
        summary: '',
        suggestion: '',
        file: undefined,
      });
      //正则
      const rulesRef = reactive({
        result: [
          {
            required: true,
            message: '请输入0 - 100区间内的数值',
            min: 0,
            max: 100,
            type: 'number',
          },
        ],
        summary: [
          {
            required: true,
            message: '请填写分析概要',
          },
          {
            message: '最多输入2000个字符',
            validator: validateByteLength(2000),
          },
        ],
        suggestion: [
          {
            required: true,
            message: '请填写修复建议',
          },
          {
            message: '最多输入2000个字符',
            validator: validateByteLength(2000),
          },
        ],
      });
      // hooks
      const { validate, validateInfos } = useForm(formState, rulesRef);
      //上传文件先清空 再赋值 保证每次上传一个文件
      const beforeUpload = (file: FileInfo) => {
        fileName.value = '';
        formState.file = undefined;
        formState.file = file as any;
        fileName.value = file.name;
        return false;
      };
      //移除文件
      const handleRemove = () => {
        formState.file = undefined;
        fileName.value = '';
      };
      return {
        ...toRefs(formState),
        validateInfos,
        handleRemove,
        formState,
        beforeUpload,
        validate,
        fileName,
      };
    },
  });
</script>

<style scoped>
  .tips {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
    margin-left: 10px;
  }
  .fileList {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
