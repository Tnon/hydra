import hostOnline from '@hydra/components/host-online';
import { TableColumn } from '@/types/tableColumn';
import {
  validateByteLength,
  validateAccount,
  validateTenantName,
  validateTenantAccount,
  validatePhoneNumber,
} from '@hydra/utils/reg';
import { checkStrong } from '@hydra/utils/tools';
import { createVNode, reactive } from 'vue';
import { actions } from './actions';
export const useColumns = (refreshTable): TableColumn[] => [
  {
    title: '序号',
    dataIndex: 'seq',
    width: 100,
  },
  {
    title: '租户名',
    dataIndex: 'tenant_name',
    width: 200,
  },
  {
    title: '账号',
    dataIndex: 'tenant_account',
    width: 200,
  },
  {
    title: '邮件网关',
    dataIndex: 'link_status',
    width: 150,
    customRender: ({ text: online, record }) =>
      createVNode(
        hostOnline,
        { online },
        {
          default: () => `(${record.device_code})`,
        },
      ),
  },
  {
    title: '自动检测授权/月',
    children: [
      {
        title: '已使用',
        dataIndex: 'auto_used',
        width: 100,
      },
      {
        title: '总计',
        dataIndex: 'auto_total',
        width: 120,
      },
    ],
  },
  {
    title: '专家检测授权/次',
    children: [
      {
        title: '已使用',
        dataIndex: 'expert_used',
        width: 100,
      },
      {
        title: '总计',
        dataIndex: 'expert_total',
        width: 120,
      },
    ],
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
    ellipsis: true,
    customRender: ({ text, record }) => text ? text : '-',
  },
  {
    title: '到期时间',
    dataIndex: 'expire_time',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 200,
  },
  {
    title: '处理',
    width: 300,
    customRender: ({ record }) =>
      createVNode(actions, {
        tenant_account: record.tenant_account,
        tenant_name: record.tenant_name,
        id: record.id,
        refreshTable,
        tenant_mark: record.tenant_mark,
        login_status: record.login_status,
        user_phone: record.user_phone,
      }),
  },
];
//表单数据
export const state = reactive<{
  formData: any;
}>({
  formData: {},
});

// export const initPwdValidate = () => {
//   pwdLevelMode.low = false;
//   pwdLevelMode.middle = false;
//   pwdLevelMode.high = false;
//   pwdLevelMode.level = 0;
// };
const validatePWD = (pwdLevelMode) => {
  return (_, value) => {
    const results = checkStrong(value ?? '', state.formData.tenant_account || '');
    Object.assign(pwdLevelMode, results);
    if (pwdLevelMode.level === 3) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };
};
export const useFormItems = (): TableColumn[] => {
  const pwdLevelMode = reactive({
    low: false,
    middle: false,
    high: false,
    level: 0,
  });

  return [
    {
      title: '租户名',
      dataIndex: 'tenant_name',
      formProps: {
        type: 'input',
        placeholder: '请输入租户名',
        rules: [
          {
            required: true,
            message: '请输入1-100个字符',
            validator: validateTenantName,
          },
        ],
      },
    },
    {
      title: '账号',
      dataIndex: 'tenant_account',
      formProps: {
        type: 'input',
        placeholder: '请输入账号',
        rules: [
          {
            required: true,
            message: '长度为1-102个数字或字母',
            validator: validateTenantAccount,
          },
        ],
      },
    },
    {
      title: '登录密码',
      dataIndex: 'password',
      formProps: {
        type: 'password',
        placeholder: '请输入登录密码',
        mode: pwdLevelMode,
        rules: [
          {
            required: true,
            message: '请输入正确密码',
            validator: validatePWD(pwdLevelMode),
          },
        ],
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
            required: true,
            message: '请输入正确的手机号码',
            validator: validatePhoneNumber,
          },
        ],
      },
    },
    {
      title: '自动检测授权/月',
      dataIndex: 'auto_num',
      formProps: {
        type: 'inputNumber',
        placeholder: '请输入自动授权，单位月，输入数字x代表代表授权单位可使用x个月',
        rules: [
          {
            required: true,
            message: '请设置大于等于1的数值',
            min: 1,
            type: 'number',
          },
        ],
      },
    },
    {
      title: '专家检测授权/次',
      dataIndex: 'expert_num',
      formProps: {
        type: 'inputNumber',
        placeholder: '请输入专家检测授权，单位次，输入数字x代表代表授权单位可对样本进行x次专家分析',
        rules: [
          {
            required: true,
            message: '请设置大于等于0的数值',
            min: 0,
            type: 'number',
          },
        ],
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      formProps: {
        type: 'textarea',
        placeholder: '请输入备注',
        rules: [
          {
            message: '备注不能超过200个字符',
            validator: validateByteLength(200),
          },
        ],
      },
    },
  ];
};
