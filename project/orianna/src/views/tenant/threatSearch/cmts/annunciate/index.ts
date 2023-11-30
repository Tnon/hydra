/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-28 22:33:00
 * @LastEditTime: 2022-06-06 11:18:33
 */
import { createVNode } from 'vue';
import informationAnnunciate from './index.vue'
import { TableColumn } from "@/types/tableColumn";
import { cilckNotice } from '@hydra/components/clickNotice'

const useColumns = (): TableColumn[] => [
  {
    title: "威胁通告",
    dataIndex: "notice",
    width: 150,
    customRender: ({ text }) =>
      createVNode(cilckNotice, { text }),
  },
  {
    title: "威胁说明",
    dataIndex: "notice_desc",
    width: 150,
  },
  {
    title: "影响面",
    dataIndex: "effect",
    width: 150,
  },
  {
    title: "通告时间",
    dataIndex: "create_time",
    width: 200,
  },
]
export { informationAnnunciate, useColumns }