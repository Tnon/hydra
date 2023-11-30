/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-14 14:04:59
 * @LastEditTime: 2022-04-14 14:13:25
 */
import { ShowRole } from '@/enums/statusEnum';
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
    title: '角色',
    dataIndex: 'role',
    width: 200,
    customRender: ({ text }) => ShowRole[text - 1],
  },
  {
    title: '部门',
    dataIndex: 'dept',
    width: 250,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 200,
  },
  {
    title: '处理',
    dataIndex: '',
    width: 250,
    customRender: ({ record }) => createVNode(updateModal, { record, refreshTable }),
  },
];
