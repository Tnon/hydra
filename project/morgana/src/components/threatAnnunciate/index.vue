<template>
  <div class="container">
    <div class="header">最新威胁全网通告</div>
    <a-table
      class="singleTable"
      :columns="columns"
      :data-source="dataList"
      :pagination="false"
    >
    </a-Table>
  </div>
</template>>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { requestThreatAnnunciate } from '@/api/threatSearch'; // 接口待填地址,接口名已更改
  import { columns } from './index';

  export default defineComponent({
    // name: 'ThreatAnnunciate',
    // components: { Table },
    setup() {
      const dataList = ref<any>([]);
      const params: tableParams<{}> = {
        page: {
            page_index: 1,
            page_size: 5,
        },
        orderby: undefined,
        filter: {},
      };
      function getTableData(params: tableParams<{}>) {
        requestThreatAnnunciate(params).then((res) => {
          const { items } = res;
          dataList.value = items;
        })
      };
      getTableData(params);
      return {
        columns,
        dataList,
      }
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    background: rgba(255, 255, 255, 0.08) !important;
    // backdrop-filter: blur(24px);
    margin-bottom: 10px;

    :deep(.ant-table) {
      background: transparent;
      color: #fff;
      // word-break: break-all;
    }

    :deep(.ant-table-thead > tr > th) {
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :deep(.ant-empty-description) {
      color: #fff;
    }
    .header {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      line-height: 24px;
      padding: 20px 20px 0 20px;
    }
  }
</style>