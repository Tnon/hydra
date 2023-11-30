/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-04-20 14:12:39
 */
import { TableColumn } from "@/types/tableColumn";
import { validateByteLength, validateEmail, validatePhoneNumber } from "@hydra/utils/reg";

export const useFormItems = (): TableColumn[] => [
  {
    title: "账号",
    dataIndex: "account",
    formProps: {
      type: "input",
      placeholder: "请输入账号",
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
    title: "邮箱",
    dataIndex: "email",
    formProps: {
      type: "input",
      placeholder: "请输入邮箱",
      rules: [{ message: "输入正确的邮箱", validator: validateEmail }],
    },
  },
];
