/*
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-14 16:09:43
 * @LastEditTime: 2022-04-20 15:31:14
 */
import { reactive } from "vue";
import addModal from "./index.vue";
import { TableColumn } from "@/types/tableColumn";
import { validateDeptInfo } from "@hydra/utils/reg";
//表单数据
const state = reactive<{
  formData: any;
}>({
  formData: {
    role: 1,
  },
});
const useFormItems = (): TableColumn[] => [
  {
    title: "部门",
    dataIndex: "dept",
    formProps: {
      type: "input",
      placeholder: "请输入单位下真实部门",
      rules: [
        {
          required: true,
          message: "请输入1-32个字符",
          validator: validateDeptInfo,
        },
      ],
    },
  },
  {
    title: "负责人",
    dataIndex: "principal",
    formProps: {
      type: "input",
      placeholder: "请输入负责人",
      rules: [
        {
          required: true,
          message: "请输入1-32个字符",
          validator: validateDeptInfo,
        },
      ],
    },
  },
];
export { addModal, useFormItems, state };
