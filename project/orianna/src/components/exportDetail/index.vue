<template>
  <slots-table
    :scroll="{ y: 300 }"
    :columns="columns"
    class="content"
    row-key="id"
    :get-list-func="exportSampleList"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { exportSampleList } from '@/api/public';
  import { exportReportExcel } from '@hydra/utils/tools';

  import { useColumns } from './index';
  import { SlotsTable } from '@/components/slots-table';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    components: {
      SlotsTable,
      [Tag.name]: Tag,
    },
    setup() {
      // 列
      const columns = useColumns();

      const download = (item) => {
        exportReportExcel(item.url, item.filename);
      }
      return {
        columns,
        exportSampleList,
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
