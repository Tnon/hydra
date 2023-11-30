<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-09 11:09:39
 * @LastEditTime: 2022-04-20 20:33:46
-->
<template>
  <div class="container">
    <div class="header">
      <div class="titleCom">用户</div>
      <a-button type="primary" @click="newUser">新建用户</a-button>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 260px)' }"
      ref="tableRef"
      :columns="columns"
      class="content"
      row-key="id"
      :get-list-func="getUserList"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getUserList, addUsers } from '@/api/user';
  import { useColumns } from './index';
  import { addModal } from './addModal';
  import { useModal } from '@/hooks/use-modal';
  import { pCompile } from '@hydra/utils/urlUtils';
  export default defineComponent({
    components: {
      SlotsTable,
    },
    setup() {
      //table dom
      const tableRef = ref<any>(null);
      //搜索
      const refreshTable = (boolean?: Boolean) => {
        unref(tableRef).refreshTableData(boolean);
      };
      // 列
      const columns = useColumns(refreshTable);

      //新建用户
      const newUser = () => {
        useModal(
          {
            title: '新增用户',
            handleOk: async (modelRef) => {
              await unref(modelRef.slotRef).validate();
              const sendForm = { ...modelRef.state.formData };
              sendForm.password = pCompile(sendForm.password);
              sendForm.repeat_password = pCompile(sendForm.repeat_password);
              await addUsers(sendForm);
              refreshTable(true);
            },
          },
          addModal,
        );
      };
      return {
        columns,
        getUserList,
        refreshTable,
        newUser,
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
