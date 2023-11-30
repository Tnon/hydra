<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-28 22:32:54
 * @LastEditTime: 2022-06-06 11:10:52
-->
<template>
  <div class="container">
    <!-- 头部说明 start -->
    <div class="header">
      <div>最新威胁全网通告</div>
      <a-button type="primary" @click="noticePublish">威胁通告发布</a-button>
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
      :get-list-func="getThreatList"
    />
    <!-- 通告表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getThreatAdd, getThreatList } from '@/api/platform/threat';
  import { useModal } from '@/hooks/use-modal';
  import { useColumns } from './index';
  import { addModal } from './addModal';
  //table dom
  const tableRef = ref<any>(null);
  const refreshTable = (boolean?: Boolean) => {
    unref(tableRef).refreshTableData(boolean);
  };
  // 列
  const columns = useColumns(refreshTable);
  // 通告发布
  const noticePublish = () => {
    useModal(
      {
        title: '威胁通告发布',
        width: 720,
        handleOk: async (modelRef) => {
          await unref(modelRef.slotRef).formRef.validate();
          const sendForm = { ...modelRef.state.formData };
          await getThreatAdd(sendForm);
          refreshTable(true);
        },
      },
      addModal,
    );
  };
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
