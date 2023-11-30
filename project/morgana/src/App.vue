<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 15:00:28
 * @LastEditTime: 2022-04-20 15:00:28
-->
<!--
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-07-21 11:29:14
 * @LastEditTime: 2022-01-14 18:37:11
-->
<template>
  <div>
    <config-provider :locale="zhCN">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
        <!-- 弹框统一组件 start -->
        <component :is="modelVisible" />
        <!-- 弹框统一组件 end -->
      </router-view>
    </config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { ConfigProvider } from "ant-design-vue";
import { Language } from "@/enums/language";
import { useGlobalModal } from "@/store/modules";
export default defineComponent({
  components: { ConfigProvider },
  setup() {
    const globalModalStore = useGlobalModal();
    //全局弹框
    const modelVisible = computed(() => globalModalStore.modalValue);
    return {
      enUS,
      zhCN,
      modelVisible,
      Language,
    };
  },
});
</script>

<style lang="less">
@import "styles/global.less";
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s ease-in;
}

.slide-up-enter-form,
.slide-up-leave-to {
  transform: translateY(-100%);
}
</style>
