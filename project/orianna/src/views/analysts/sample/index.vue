<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-04-20 12:13:25
-->
<template>
  <div class="container">
    <div class="header">
      <div class="titleCom">样本</div>
      <input-search v-model:value="search_data" placeholder="请输入关键字" @search="refreshTable" />
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 260px)' }"
      ref="tableRef"
      :columns="columns"
      class="content"
      row-key="id"
      :arguments="agms"
      :get-list-func="getWorkList"
    />
  </div>
</template>

<script lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { defineComponent, reactive, toRefs, ref, unref } from 'vue';
  import { getWorkList } from '@/api/analysts/sample';
  import { useColumns } from './index';
  import { InputSearch } from '@hydra/components/input-search';
  import { Router, useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      SlotsTable,
      InputSearch,
    },
    setup() {
      //table dom
      const tableRef = ref<any>(null);
      //路由
      const router: Router = useRouter();
      //搜索
      const refreshTable = (boolean?: boolean) => {
        unref(tableRef).refreshTableData(boolean);
      };
      // 列
      const columns = useColumns(router, refreshTable);

      //搜索数据源
      const agms = reactive({
        search_data: '',
      });

      return {
        ...toRefs(agms),
        columns,
        agms,
        getWorkList,
        refreshTable,
        tableRef,
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
    }
    .content {
      padding: 0 20px 20px 20px;
      flex: 1;
    }
  }
</style>
