<!--
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-08-16 10:05:59
 * @LastEditTime: 2022-05-31 21:59:19
-->
<template>
  <div class="header">
    <template v-for="(item, index) in colsMap">
      <div class="notice">{{ item.title }}</div>
    </template>
  </div>
  <div class="content">
    <a-form ref="formRef" name="dynamic_form_nest_item" :model="fields!.items">
      <a-space v-for="(user, index) in fields!.items" :key="user" class="space" align="baseline">
        <template v-for="(item, num) in colsMap">
          <a-form-item
            :name="[index, item.dataIndex]"
            style="display: flex; margin-right: 20px"
            :rules="{
              required: true,
              message: item.formProps?.placeholder,
            }"
          >
            <a-input
              v-model:value="user[item.dataIndex]"
              :placeholder="item.formProps?.placeholder"
              :maxLength="500"
            />
          </a-form-item>
        </template>
        <MinusCircleOutlined v-if="index > 0" @click="removeUser(user)" class="reduce" />
      </a-space>
      <a-button type="dashed" block @click="addUser()" class="add">
        <PlusOutlined />
        {{ addTitle }}
      </a-button>
    </a-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  import type { FormInstance } from 'ant-design-vue';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { TableColumn } from '../../../types/tableColumn';

  export default defineComponent({
    components: {
      MinusCircleOutlined,
      PlusOutlined,
    },
    props: {
      colsMap: {
        type: Array as PropType<TableColumn[]>,
      },
      fields: {
        type: Object,
        default: () => ({}),
      },
      addTitle: String,
    },
    setup(props) {
      const formRef = ref<FormInstance>();
      const removeUser = (item) => {
        let index = props.fields!.items.indexOf(item);
        if (index !== -1 && props.fields!.items.length > 1) {
          props.fields!.items.splice(index, 1);
        }
      };
      const addUser = () => {
        props.fields!.items.push({});
      };
      return {
        formRef,
        removeUser,
        addUser,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    font-size: 14px;
    margin-bottom: 10px;
    .notice {
      width: 220px;
    }
  }
  .space {
    display: flex;
    :deep(.ant-input) {
      width: 200px;
    }
    .reduce {
      margin-top: 10px;
    }
  }
  .add {
    margin-top: 5px;
  }
</style>
