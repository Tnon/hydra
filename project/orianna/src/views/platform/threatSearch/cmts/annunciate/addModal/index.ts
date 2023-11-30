/*
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-08-16 10:05:53
 * @LastEditTime: 2022-05-31 22:27:22
 */
import { reactive } from "vue";
import addModal from "./index.vue";
import { TableColumn } from "@/types/tableColumn";


//表单数据
const state = reactive<{
  formData: any;
  addTitle: string;
}>({
  formData: {
    items: [{}]
  },
  addTitle: '添加威胁通告发布'
});
const useFormItems = (): TableColumn[] => [
  {
    title: "威胁通告名称",
    dataIndex: "notice",
    formProps: {
      placeholder: "请输入威胁通告名称",
    },
  },
  {
    title: "威胁说明",
    dataIndex: "notice_desc",
    formProps: {
      placeholder: "请输入威胁说明",
    },
  },
  {
    title: "影响面",
    dataIndex: "effect",
    formProps: {
      placeholder: "请输入影响单位",
    },
  },
];
export { addModal, useFormItems, state };
