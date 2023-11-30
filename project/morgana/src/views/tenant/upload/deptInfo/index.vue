<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-14 16:08:25
 * @LastEditTime: 2022-04-20 15:32:31
-->
<template>
  <slots-form ref="slotRef" :colsMap="formItems" :fields="formData" />
</template>
<script lang="ts">
import { defineComponent, unref, toRefs, ref, onBeforeUnmount } from "vue";
import { useFormItems, state } from "./index";
import slotsForm from "@hydra/components/slots-form";
export default defineComponent({
  components: {
    slotsForm,
  },
  setup() {
    const formItems = useFormItems();
    const slotRef = ref<any>(null);
    onBeforeUnmount(() => {
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
