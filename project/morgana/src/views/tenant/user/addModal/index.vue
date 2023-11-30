<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-16 10:05:59
 * @LastEditTime: 2022-04-20 15:33:15
-->
<template>
  <slots-form ref="slotRef" :colsMap="formItems" :fields="formData" />
</template>
<script lang="ts">
import slotsForm from "@hydra/components/slots-form";
import { defineComponent, unref, toRefs, ref, onBeforeUnmount } from "vue";
import { useFormItems, state, initPwdValidate } from "./index";
export default defineComponent({
  components: {
    slotsForm,
  },
  setup() {
    const formItems = useFormItems();
    const slotRef = ref<any>(null);
    onBeforeUnmount(() => {
      initPwdValidate();
      unref(slotRef).resetFields();
    });
    return {
      ...toRefs(state),
      formItems,
      slotRef,
      state,
    };
  },
});
</script>
