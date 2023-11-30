/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-27 12:03:39
 * @LastEditTime: 2022-02-25 10:44:00
 */
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
export const useColumns = (): TableColumn[] => [
  {
    title: '序号',
    dataIndex: 'req',
    width: 100,
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
    width: 200,
  },
  {
    title: '自动检测授权/月',
    dataIndex: 'auto_num',
    width: 100,
    customRender: ({ text }) =>
      createVNode('span', { style: { color: ~~text > 0 ? '#267EE5' : '#FF3543' } }, text),
  },
  {
    title: '专家检测授权/次',
    dataIndex: 'expert_num',
    width: 100,
    customRender: ({ text }) =>
      createVNode('span', { style: { color: ~~text > 0 ? '#267EE5' : '#FF3543' } }, text),
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
  },
];
