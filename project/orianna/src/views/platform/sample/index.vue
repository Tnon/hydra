<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-12-15 14:37:31
 * @LastEditTime: 2022-05-19 14:25:46
-->
<template>
  <div class="container">
    <div class="header">
      <div class="titleCom">样本</div>
      <div>
        <input-search v-model:value="search_data" placeholder="请输入关键字" @search="refreshTable" />
        <a-button type="primary" class="marginLeft16" @click="exportSample">导出样本</a-button>
        <a-button class="marginLeft16" @click="showExportDetail">导出详情</a-button>
      </div>
    </div>
    <!-- 头部筛选 start -->
    <top-filter
      v-model:risk_type="risk_type"
      v-model:sample_scene="sample_scene"
      @search="refreshTable"
    />
    <!-- 头部筛选 end -->
    <slots-table
      :scroll="{ y: 'calc(100vh - 360px)' }"
      ref="tableRef"
      :columns="columns"
      class="content"
      row-key="id"
      :arguments="agms"
      :get-list-func="getSampleList"
    />
  </div>
</template>

<script lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { defineComponent, reactive, toRefs, ref, unref } from 'vue';
  import { getSampleList } from '@/api/platform/sample';
  import { useColumns } from './index';
  import { InputSearch } from '@hydra/components/input-search';
  import topFilter from '@hydra/components/filter';

  import { useModal } from '@/hooks/use-modal';
  import exportSampleContent from '@/components/exportSampleContent/index.vue';
  import exportDetail from '@/components/exportDetail/index.vue';

  export default defineComponent({
    components: {
      SlotsTable,
      InputSearch,
      topFilter,
    },
    setup() {
      //table dom
      const tableRef = ref<any>(null);
      // 列
      const columns = useColumns();

      //搜索数据源
      const agms = reactive({
        search_data: '', // 搜索数据源
        risk_type: 0, // 风险类型
        sample_scene: 0, // 样本场景  （字段待定）
      });

      //搜索
      const refreshTable = () => {
        unref(tableRef).refreshTableData();
      };

      function exportSample() {
        useModal(
          {
            title: '样本导出',
            contentProps: {
              outRiskType: agms.risk_type,
              outSampleScene: agms.sample_scene,
            },
            handleOk: async (contentRef) => {
              await contentRef.requestExport();
            },
          },
          exportSampleContent,
        );
      }

      function showExportDetail() {
        useModal(
          {
            title: '导出详情',
            footer: false,
            width: 700,
            showRightColse: true,
          },
          exportDetail,
        );
      }
      return {
        ...toRefs(agms),
        columns,
        agms,
        getSampleList,
        refreshTable,
        tableRef,
        exportSample,
        showExportDetail,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    .header {
      flex: 80px 0 0;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;

      .marginLeft16 {
        margin-left: 16px;
      }
    }
    .content {
      padding: 0 20px 20px 20px;
      flex: 1;
    }
  }
</style>
