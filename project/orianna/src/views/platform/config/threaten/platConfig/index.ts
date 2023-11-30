/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-04-20 14:00:32
 */
import { TableColumn } from "@/types/tableColumn";
import { validateAccount, ValidateAddress } from "@hydra/utils/reg";
import platConfig from "./index.vue";
export const useFormItems = (): TableColumn[] => [
  {
    title: "服务器",
    dataIndex: "serv_addr",
    formProps: {
      type: "input",
      rules: [
        {
          required: true,
          validator: ValidateAddress,
          message: "请输入正确的服务器地址",
        },
      ],
    },
  },
  {
    title: "API账号",
    dataIndex: "account",
    formProps: {
      type: "input",
      rules: [
        {
          validator: validateAccount,
          message: "长度为1-20个字母或数字",
        },
        {
          required: true,
          message: "API账号不能为空",
        },
      ],
    },
  },
  {
    title: "密码",
    dataIndex: "password",
    formProps: {
      type: "password",
      rules: [
        {
          required: true,
          message: "密码不能为空",
        },
      ],
    },
  },
];
export { platConfig };
