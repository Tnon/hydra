<template>
  <div class="container">
    <div class="header">
      <div class="titleCom">授权</div>
      <div>
        <input-search
          v-model:value="search_data"
          placeholder="搜素租户或设备"
          @search="refreshTable"
        />
        <a-button class="addLic" @click="addCode" type="primary"> 新增设备码 </a-button>
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 300px)' }"
      ref="tableRef"
      :columns="columns"
      class="content"
      row-key="id"
      :arguments="agms"
      :get-list-func="getAuthList"
    />
  </div>
</template>

<script lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { defineComponent, reactive, toRefs, ref, unref } from 'vue';
  import { addAuthCode, getAuthList } from '@/api/platform/authorization';
  import { useColumns, useFormItems } from './index';
  import { InputSearch } from '@hydra/components/input-search';
  import { useModal } from '@/hooks/use-modal';
  import slotsForm from '@hydra/components/slots-form';
  export default defineComponent({
    components: {
      SlotsTable,
      InputSearch,
    },
    setup() {
      //table dom
      const tableRef = ref<any>(null);
      //搜索
      const refreshTable = (boolean?: boolean) => {
        unref(tableRef).refreshTableData(boolean);
      };
      // 列
      const columns = useColumns(refreshTable);

      //搜索数据源
      const agms = reactive({
        search_data: '',
      });

      //新增设备码
      const addCode = () => {
        useModal(
          {
            title: '新增设备码',
            contentProps: {
              colsMap: useFormItems(),
              fields: reactive({}),
            },
            handleOk: async (contRef) => {
              await contRef.validate();
              const { code } = await addAuthCode(unref(contRef).fields);
              if (code) {
                return Promise.reject('');
              }
              refreshTable(true);
            },
          },
          slotsForm,
        );
      };
      return {
        ...toRefs(agms),
        columns,
        agms,
        getAuthList,
        refreshTable,
        tableRef,
        addCode,
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
      .addLic {
        margin-left: 40px;
      }
    }
    .content {
      padding: 0 20px 20px 20px;
      flex: 1;
    }
  }
</style>
