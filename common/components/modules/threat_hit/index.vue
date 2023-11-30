<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:55
 * @LastEditTime: 2022-05-19 11:19:24
-->
<template>
  <!-- 威胁情报 start -->
  <CollapseIcon class="collInfo" v-model:activeKey="activeKey" :allKeys="Object.keys(threatHit)">
    <a-collapse-panel
      v-for="(item, key) in threatHit"
      :key="key"
      :header="moduleLableNames[key] + '(' + item.length + ')'"
      :class="key"
    >
      <template v-for="(text, index) in item" :key="index">
        <div class="text">
          {{ text }}
        </div>
      </template>
    </a-collapse-panel>
  </CollapseIcon>
  <!-- 威胁情报 end -->
</template>
<script lang="ts">
  import { Collapse } from 'ant-design-vue';
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import CollapseIcon from '../../collapse-icon';
  export default defineComponent({
    components: {
      CollapseIcon,
      [Collapse.Panel.name]: Collapse.Panel,
    },
    props: {
      moduleLableNames: Object as any,
      moduleData: Object as any,
    },
    setup(props) {
      // 折叠内容展开
      const activeKey = ref([]);
      const threatHit = reactive({
        high_risk: [], //高危情报命中
        medium_risk: [], //中危情报命中
        low_risk: [],
      });
      watchEffect(() => {
        for (let k in threatHit) {
          threatHit[k] = props.moduleData![k] ?? [];
        }
      });
      return {
        threatHit,
        activeKey,
      };
    },
  });
</script>
<style lang="less" scoped>
  .collInfo {
    border: none !important;
    .ant-collapse-item {
      margin-bottom: 10px;
      border: none;
      :deep(.ant-collapse-header) {
        padding: 10px !important;
        background: #fafafa;
      }
    }
    :deep(.ant-collapse-content) {
      border: 1px solid #fafafa;
      border-top: none;
      .ant-collapse-content-box {
        padding: 0 10px;
      }
    }
    .text {
      padding: 10px 0;
    }
    .high_risk {
      :deep(.ant-collapse-header) {
        background: rgba(255, 53, 67, 0.1);
        color: #ff3543;
      }
    }
    .medium_risk {
      :deep(.ant-collapse-header) {
        background: rgba(248, 165, 86, 0.1);
        color: #f8a556;
      }
    }
    .low_risk {
      :deep(.ant-collapse-header) {
        background: rgba(233, 218, 73, 0.1);
        color: #e9da49;
      }
    }
  }
</style>
