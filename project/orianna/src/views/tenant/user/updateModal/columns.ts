/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-04-20 14:26:05
 */
import { TableColumn } from "@/types/tableColumn";
import { validateByteLength, validatePhoneNumber } from "@hydra/utils/reg";

export const useFormItems = (): TableColumn[] => [
  {
    title: "账号",
    dataIndex: "account",
    formProps: {
      type: "input",
    },
  },
  {
    title: '手机号码',
    dataIndex: 'user_phone',
    formProps: {
      type: 'input',
      placeholder: '请输入手机号码',
      rules: [
        {
          message: '请输入正确的手机号码',
          validator: validatePhoneNumber,
        },
      ],
    },
  },
  {
    title: "部门",
    dataIndex: "dept",
    formProps: {
      type: "input",
      placeholder: "请输入您的部门",
      rules: [
        { message: "长度最多32个字符", validator: validateByteLength(32) },
      ],
    },
  },
  {
    title: "备注",
    dataIndex: "remarks",
    formProps: {
      type: "textarea",
      placeholder: "请输入备注",
      rules: [
        { message: "长度最多200个字符", validator: validateByteLength(200) },
      ],
    },
  },
];
