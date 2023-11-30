<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-28 22:32:54
 * @LastEditTime: 2022-06-06 11:16:57
-->
<template>
  <div class="container">
    <!-- 头部说明 start -->
    <div class="header">
      <div>最新威胁全网通告</div>
    </div>
    <!-- 头部说明 end -->

    <!-- 通告表格 start -->
    <!-- :scroll="{ y: 'calc(100vh - 260px)' }" -->
    <slots-table
      :scroll="{ y: 'calc(100vh - 500px)' }"
      ref="tableRef"
      :columns="columns"
      class="content"
      row-key="id"
      :get-list-func="requestThreatAnnunciate"
    />
    <!-- 通告表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';
  import { requestThreatAnnunciate } from '@/api/threatSearch';
  import { useColumns } from './index';
  // 列
  const columns = useColumns();
</script>
<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
</style>
