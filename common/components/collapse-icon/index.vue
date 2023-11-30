<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:56:14
 * @LastEditTime: 2022-04-22 17:12:12
-->
<template>
  <Collapse v-model:activeKey="activeKeyCmp">
    <template #expandIcon="{ isActive }">
      <RightOutlined class="transIcon" :class="{ showHide: isActive }" />
    </template>
    <slot></slot>
  </Collapse>
</template>
<script lang="ts">
  import { computed, defineComponent, inject, unref, watch } from 'vue';
  import { Collapse } from 'ant-design-vue';
  import { RightOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      Collapse,
      [Collapse.Panel.name]: Collapse.Panel,
      RightOutlined,
    },
    props: {
      activeKey: {
        type: Array,
        default: () => [],
      },
      allKeys: {
        type: Array,
        default: () => [],
      },
    },

    setup(props, { emit }) {
      const activeKeyCmp = computed<any>({
        get: () => props.activeKey,
        set: (v) => emit('update:activeKey', v),
      });
      activeKeyCmp.value = [...props.allKeys!];
      const isOpenAllCollpase = inject('OpenAllAction');
      //手动展开所有
      watch(
        () => unref(isOpenAllCollpase),
        () => {
          activeKeyCmp.value = props.allKeys!;
        },
      );
      return { isOpenAllCollpase, activeKeyCmp };
    },
  });
</script>
<style lang="less" scoped>
  .transIcon {
    transition: all 0.3s;
  }
  .showHide {
    transform: rotate(90deg);
  }
</style>
