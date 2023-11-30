<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:52
 * @LastEditTime: 2022-06-10 18:12:20
-->
<template>
  <div class="module">
    <!-- {{ moduleData }} -->
    <div
      class="risk head"
      v-if="!moduleData.analyze_res && !Object.keys(moduleData.engines).length"
    >
      <check-circle-filled class="icon" />
      <div class="value">暂未发现异常行为</div>
    </div>
    <div v-else-if="moduleData.analyze_res" class="title head">
      <warning-filled class="icon" />
      <div class="value">{{ moduleData.analyze_res }}'</div>
    </div>
    <CollapseIcon
      class="collInfo"
      v-model:activeKey="activeKey"
      :allKeys="Object.keys(moduleData.engines)"
    >
      <a-collapse-panel :header="key" v-for="(item, key) in moduleData.engines" :key="key">
        <Table
          :row-class-name="(_, index) => (index % 2 === 0 ? 'tableStriped' : undefined)"
          :columns="columns"
          class="singleTable"
          :dataSource="item"
          :pagination="false"
        />
      </a-collapse-panel>
    </CollapseIcon>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Collapse, Table } from 'ant-design-vue';
  import { WarningFilled, CheckCircleFilled } from '@ant-design/icons-vue';
  import CollapseIcon from '../../collapse-icon';
  export default defineComponent({
    components: {
      Table,
      CollapseIcon,
      [Collapse.Panel.name]: Collapse.Panel,
      WarningFilled,
      CheckCircleFilled,
    },
    props: {
      moduleData: {
        type: Object,
        required: true,
      },
    },
    setup() {
      // 默认显示折叠
      const activeKey = ref([]);
      const columns = [
        {
          title: '病毒名',
          dataIndex: 'det',
          width: 200,
        },
        // {
        //   title: '感染文件',
        //   dataIndex: 'path',
        //   width: 300,
        //   customRender: ({ text }) => createVNode(intectFile, { text }),
        // },
      ];
      return {
        columns,
        activeKey,
      };
    },
  });
</script>
<style lang="less" scoped>
  .title {
    background: rgba(255, 53, 67, 0.1);
    font-size: 14px;
    font-weight: 500;
    color: #ff3543;
    margin-bottom: 10px;
    position: relative;
  }
  .head {
    display: flex;
    align-items: flex-start;
    padding: 20px 30px;
  }
  .risk {
    font-size: 14px;
    color: #34a753;
    background: rgba(52, 167, 83, 0.1);
    position: relative;
  }
  .icon {
    font-size: 20px;
    margin-right: 10px;
  }

  .module {
    :deep(.tableStriped) {
      background-color: #fafafa;
    }
  }
  .collInfo {
    border: none !important;
    position: relative !important;
    .ant-collapse-item {
      margin-bottom: 10px;
      border: none;
      :deep(.ant-collapse-header) {
        padding: 10px !important;
        background: #fafafa;
        color: #ff3543;
      }
    }
    :deep(.ant-collapse-content) {
      border: 1px solid #fafafa;
      border-top: none;
      .ant-collapse-content-box {
        padding: 0 10px;
      }
    }
  }
</style>
