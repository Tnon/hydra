<template>
  <a-table :columns="columns" :data-source="exportList" :scroll="{ y: 300 }" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-tag :color="record.status === 1 ? 'orange' : record.status === 2 ? '#87d068' : '#f50'">
          {{ record.status === 1 ? '生成中...' : record.status === 2 ? '已生成' : '生成失败' }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'operate'">
        <a-button :disabled="record.status !== 2" type="link" @click="download(record)"
          >下载</a-button
        >
      </template>
    </template>
  </a-table>

  <a-pagination
    class="pagination"
    v-model:current="pagination.current"
    v-model:page-size="pagination.pageSize"
    :total="pagination.total"
    :show-total="(total) => `共 ${total} 条`"
    @change="pageChange"
  >
  </a-pagination>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { exportSampleList } from '@/api/public';
  import { exportReportExcel } from '@hydra/utils/tools';

  import { TableColumn } from '@/types/tableColumn';
  import { Tag } from 'ant-design-vue';

  const columns: TableColumn[] = [
    {
      title: '报表文件名',
      dataIndex: 'filename',
      key: 'filename',
      ellipsis: true,
    },
    {
      title: '导出时间',
      dataIndex: 'create_at',
      key: 'create_at',
    },
    {
      title: '生成状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
    },
  ];

  export default defineComponent({
    components: {
      [Tag.name]: Tag,
    },
    setup() {
      const state = reactive({
        exportList: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
        },
      });

      async function getExportList() {
        const datas = {
          page: {
            page_index: state.pagination.current,
            page_size: state.pagination.pageSize,
          },
        };
        const { items, total } = await exportSampleList(datas);
        state.exportList = items;
        state.pagination.total = total;
      }
      getExportList();

      function pageChange() {
        getExportList();
      }

      function download(item) {
        exportReportExcel(item.url, item.filename);
      }
      return {
        ...toRefs(state),
        columns,
        download,
        pageChange,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 30px;
    text-align: right;
  }
</style>
