<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-04-20 13:51:56
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <recordHead :state="state" :device_code="device_code" :refreshTable="refreshTable" />
    <!-- 头部 end -->
    <div class="main">
      <!-- 总计 statr -->
      <recordTotal :state="state" :id="id" />
      <!-- 总计 end -->

      <!-- 表格 statr -->
      <slots-table
        :scroll="{ y: 'calc(100vh - 360px)' }"
        ref="tableRef"
        :columns="columns"
        class="tabContent"
        row-key="id"
        :arguments="state"
        :get-list-func="getAuthDetailList"
      />
      <!-- 表格 end -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import recordHead from './header';
  import { recordTotal } from './total/index';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './index';
  import { getAuthDetailList } from '@/api/platform/authorization';
  import { useRoute, useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      recordHead,
      recordTotal,
      SlotsTable,
    },
    setup() {
      //路由器
      const route = useRouter();
      //获取路由参数
      const {
        query: { device_code, id },
      } = useRoute() as any;
      if (!device_code) {
        route.push({
          name: 'platform-authorization',
        });
      }
      // 列
      const columns = useColumns();
      //搜索条件
      const state = reactive({
        id,
        date_range: '',
      });
      //表格
      const tableRef = ref<any>(null);
      //刷新
      const refreshTable = (bool?: Boolean) => {
        tableRef.value.refreshTableData(bool);
      };
      return {
        state,
        getAuthDetailList,
        columns,
        refreshTable,
        tableRef,
        device_code,
        id,
      };
    },
  });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    .main {
      padding: 0 20px 20px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .tabContent {
        margin-top: 20px;
      }
    }
  }
</style>
