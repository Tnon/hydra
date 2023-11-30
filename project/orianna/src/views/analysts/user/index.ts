/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-08 16:45:23
 * @LastEditTime: 2022-02-22 18:34:03
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import { updateModal } from './updateModal';
export const useColumns = (refreshTable): TableColumn[] => [
  {
    title: '序号',
    dataIndex: 'seq',
    width: 100,
  },
  {
    title: '账号',
    dataIndex: 'account',
    width: 200,
  },

  {
    title: '部门',
    dataIndex: 'dept',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 200,
  },
  {
    title: '处理',
    width: 250,
    customRender: ({ record }) => createVNode(updateModal, { record, refreshTable }),
  },
];
