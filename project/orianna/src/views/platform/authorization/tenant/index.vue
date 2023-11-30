<template>
  <div class="container">
    <div class="header">
      <!-- {{ state }} -->

      <div class="titleCom">授权</div>
      <div>
        <input-search
          v-model:value="search_data"
          placeholder="搜素租户或设备"
          @search="refreshTable"
        />
        <a-button class="addLic" @click="addCode" type="primary"> 新增租户 </a-button>
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 300px)' }"
      ref="tableRef"
      :columns="columns"
      class="content"
      row-key="id"
      :arguments="agms"
      :get-list-func="getTenantList"
    />
  </div>
</template>

<script lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { defineComponent, reactive, toRefs, ref, unref, watch, onUnmounted } from 'vue';
  import { addTenantUser, getTenantList, getTenantName } from '@/api/platform/authorization';
  import { useColumns, useFormItems, state } from './index';
  import { InputSearch } from '@hydra/components/input-search';
  import { useModal } from '@/hooks/use-modal';
  import slotsForm from '@hydra/components/slots-form';
  import { pCompile } from '@hydra/utils/urlUtils';
  // function debounce(func, wait) {
  //   let timeout;
  //   return function () {
  //     // 清空定时器
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(func, wait);
  //   };
  // }
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

      const getAccount = async () => {
        if (!state.formData.tenant_name) {
          state.formData.tenant_account = '';
          state.formData.password = '';
          return;
        }
        const { tenant_account } = await getTenantName({ tenant_name: state.formData.tenant_name });
        state.formData.tenant_account = tenant_account;
        state.formData.password = 'M01@admin8888';
      };
      //写timer防抖
      let timer: any = null;
      watch(
        () => state.formData.tenant_name,
        () => {
          //如果有先清空
          if (timer) clearTimeout(timer);
          timer = setTimeout(getAccount, 200);
        },
      );
      //新增租户
      const addCode = () => {
        useModal(
          {
            title: '新增租户',
            width: 700,
            contentProps: {
              colsMap: useFormItems(),
              fields: state.formData,
            },
            handleOk: async (contRef) => {
              await contRef.validate();
              const sendForm = { ...unref(contRef).fields };
              sendForm.password = pCompile(sendForm.password);
              const { code } = await addTenantUser(sendForm);
              if (code) {
                return Promise.reject('');
              }
              refreshTable(true);
            },
          },
          slotsForm,
        );
      };
      onUnmounted(() => {
        if (timer) clearTimeout(timer);
      });
      return {
        state,
        ...toRefs(agms),
        columns,
        agms,
        getTenantList,
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
