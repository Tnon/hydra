<template>
  <div class="container">

    <!-- 头部说明 start -->
    <div class="header">
      <div>威胁热搜</div>
    </div>
    <!-- 头部说明 end -->

    <!-- 热搜表格 start -->
    <a-table
      class="singleTable"
      :columns="columns"
      :data-source="dataList"
      :pagination="false"
    >
    </a-Table>
    <!-- 热搜表格 end -->
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { TableColumn } from "@/types/tableColumn";
  import { requestHotThreat } from '@/api/threatSearch'; // 接口待填地址,接口名已更改
  // 列配置
  const columns: TableColumn[] = [
    {
      title: "威胁值",
      dataIndex: "sample_name",
      width: 150,
      ellipsis: true,
    },
    {
      title: "威胁类型",
      dataIndex: "category",
      width: 150,
    },
    {
      title: "热度评分",
      dataIndex: "score",
      width: 150,
    },
    {
      title: "最新时间",
      dataIndex: "activeTime",
      width: 150,
    },
  ];
  const dataList = ref<any>([]);

  const getTableData = async () => {
    const res = await requestHotThreat();
    // 错误兼容，若返回数组，证明后端未报错（报错的话返回的是对象）
    if (Array.isArray(res)) {
      dataList.value = res;
    }
    // const { code } = await requestHotThreat();
    // if (!code) {
    //   dataList.value = resList;
    // }
  }
  getTableData();
</script>
<style lang="scss" scoped>
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

    // .singleTable {
    //   min-height: 400px;
    //   overflow: auto;
    // }
  }
</style>
