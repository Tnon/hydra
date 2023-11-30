import hostOnline from "@hydra/components/host-online";
import { TableColumn } from "@/types/tableColumn";
import {
  validateByteLength,
  validateDeviceCode,
  validateTenantName,
} from "@hydra/utils/reg";
import { createVNode } from "vue";
import { actions } from "./actions";
export const useColumns = (refreshTable): TableColumn[] => [
  {
    title: "序号",
    dataIndex: "seq",
    width: 100,
  },
  {
    title: "设备识别码",
    dataIndex: "device_code",
    width: 250,
  },
  {
    title: "状态",
    dataIndex: "link_status",
    width: 150,
    customRender: ({ text: online }) => createVNode(hostOnline, { online }),
  },
  {
    title: "租户标识",
    dataIndex: "tenant_mark",
    width: 200,
  },
  {
    title: "自动检测授权/月",
    children: [
      {
        title: "已使用",
        dataIndex: "auto_used",
        width: 200,
      },
      {
        title: "总计",
        dataIndex: "auto_total",
        width: 200,
      },
    ],
  },
  {
    title: "专家检测授权/次",
    children: [
      {
        title: "已使用",
        dataIndex: "expert_used",
        width: 200,
      },
      {
        title: "总计",
        dataIndex: "expert_total",
        width: 200,
      },
    ],
  },
  {
    title: "到期时间",
    dataIndex: "expire_time",
    width: 200,
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    width: 200,
  },
  {
    title: "处理",
    width: 300,
    customRender: ({ record }) =>
      createVNode(actions, {
        device_code: record.device_code,
        id: record.id,
        refreshTable,
        tenant_mark: record.tenant_mark,
      }),
  },
];
export const useFormItems = (): TableColumn[] => [
  {
    title: "设备识别码",
    dataIndex: "device_code",
    formProps: {
      type: "input",
      rules: [
        {
          required: true,
          message: "请输入12个字母或数字",
          validator: validateDeviceCode,
        },
      ],
    },
  },
  {
    title: "租户标识",
    dataIndex: "tenant_mark",
    formProps: {
      type: "input",
      rules: [
        {
          required: true,
          message: "请输入1-32个字符",
          validator: validateTenantName,
        },
      ],
    },
  },
  {
    title: "自动检测授权",
    dataIndex: "auto_num",
    formProps: {
      type: "inputNumber",
      rules: [
        {
          required: true,
          message: "请设置大于等于1的数值",
          min: 1,
          type: "number",
        },
      ],
    },
  },
  {
    title: "专家检测授权",
    dataIndex: "expert_num",
    formProps: {
      type: "inputNumber",
      rules: [
        {
          required: true,
          message: "请设置大于等于0的数值",
          min: 0,
          type: "number",
        },
      ],
    },
  },
  {
    title: "备注",
    dataIndex: "remark",
    formProps: {
      type: "textarea",
      rules: [
        {
          message: "备注不能超过200个字符",
          validator: validateByteLength(200),
        },
      ],
    },
  },
];
