<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-04 14:19:56
 * @LastEditTime: 2022-02-24 18:22:28
-->
<template>
  <a-modal
    v-model:visible="visible"
    :afterClose="remove"
    :closable="showRightColse"
    :getContainer="container"
    :class="{ nofooter: !footer }"
    :width="width"
    :maskClosable="maskClosable"
    :wrapClassName="wrapClassName"
  >
    <template v-if="title || subtitle" #title>
      <span>{{ title }}</span>
      <span class="subtitle" v-if="isString(subtitle)">{{ subtitle }}</span>
      <component v-else-if="subtitle" :is="subtitle" />
    </template>
    <template #footer>
      <div v-if="footer">
        <a-button class="confirmBtn" key="submit" type="primary" :loading="loading" @click="ok">
          确定
        </a-button>
        <a-button key="back" @click="visible = false"> 取消 </a-button>
      </div>
      <span v-else></span>
    </template>
    <component :is="content" v-bind="contentProps" ref="contentRef" />
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent, ref, PropType, unref } from 'vue';
  import { Modal, Input, Button } from 'ant-design-vue';
  import { ModalProps } from './type';
  import { isString } from 'lodash';
  export default defineComponent({
    name: 'FormModal',
    components: {
      [Modal.name]: Modal,
      [Input.name]: Input,
      [Button.name]: Button,
    },
    props: {
      container: {
        type: Function,
        default: () => document.body,
      },
      title: {
        // type: String as PropType<string>,
        type: String,
      },
      remove: {
        type: Function,
      },
      handleOk: {
        type: Function,
      },
      //内容专属 属性
      contentProps: {
        type: Object,
        default: () => ({}),
      },
      content: {
        type: Object,
      },
      footer: {
        type: Boolean,
        default: true,
      },
      maskClosable: {
        type: Boolean,
        default: true,
      },
      subtitle: {
        type: [String, Object],
      },
      width: {
        type: Number,
        default: 550,
      },
      wrapClassName: {
        type: String,
        default: '',
      },
      showRightColse: {
        type: Boolean,
        default: false,
      },
    },
    setup(props: Partial<ModalProps>) {
      let visible = ref<boolean>(true);
      let loading = ref<boolean>(false);
      const contentRef: any = ref<HTMLElement>();
      const ok = async () => {
        loading.value = true;
        try {
          await props.handleOk!(unref(contentRef));
          loading.value = false;
          visible.value = false;
        } catch {
          loading.value = false;
        }
      };
      return {
        visible,
        contentRef,
        ok,
        loading,
        isString,
      };
    },
  });
</script>
<style lang="less" scoped>
  .subtitle {
    font-weight: 300;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    margin-left: 16px;
  }
  .confirmBtn {
    margin-right: 12px;
  }
</style>
