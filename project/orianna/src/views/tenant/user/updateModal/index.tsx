/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-09 11:09:39
 * @LastEditTime: 2022-04-20 14:26:23
 */
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { getEditUsers, getDeleteUsers, getResetPassword } from '@/api/tenant/user';
import slotsForm from '@hydra/components/slots-form';
import { useModal } from '@/hooks/use-modal';
import { createVNode, defineComponent, reactive } from 'vue';
import { useFormItems } from './columns';
import { updatePwd as updatePwdModal } from '@hydra/components/updatePwd';
import { pCompile } from '@hydra/utils/urlUtils';
import styles from './index.module.less';
export const updateModal = defineComponent({
  components: {
    ExclamationCircleFilled,
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
    refreshTable: {
      type: Function,
    },
  },
  setup(props) {
    const handle = [
      // 编辑
      {
        title: '编辑',
        clickFun: () => {
          useModal(
            {
              title: '编辑',
              contentProps: {
                // 租户不能编辑自己的手机号，但是可以编辑子租户的手机号
                disKeys: { account: true, user_phone: props.record.role === 3 },
                colsMap: useFormItems(),
                fields: reactive(Object.assign({}, props.record)),
              },
              handleOk: async ({ fields, validate }) => {
                await validate();
                await getEditUsers({
                  id: fields.id,
                  user_phone: fields.user_phone, // 新增手机号修改
                  dept: fields.dept,
                  remarks: fields.remarks,
                });
                props.refreshTable!(true);
              },
            },
            slotsForm,
          );
        },
      },
      // 重置密码
      {
        title: '重置密码',
        clickFun: () => {
          useModal(
            {
              title: '重置密码',
              contentProps: {
                account: props.record.account,
                id: props.record.id,
              },
              handleOk: async ({ fields, slotsForm }) => {
                await slotsForm.validate();
                const { code } = await getResetPassword(
                  Object.assign(
                    {},
                    fields,
                    { old_password: pCompile(fields.old_password) },
                    { new_password: pCompile(fields.new_password) },
                    { repeat_password: pCompile(fields.repeat_password) },
                  ),
                );
                if (code) {
                  return Promise.reject();
                }
                props.refreshTable!(true);
              },
            },
            updatePwdModal,
          );
        },
      },
      // 删除
      {
        title: '删除',
        clickFun: () => {
          useModal(
            {
              title: '删除',
              wrapClassName: 'noticeModal',
              handleOk: async () => {
                await getDeleteUsers({ id: props.record.id! });
                props.refreshTable!(true);
              },
            },
            createVNode('span', null, [
              <ExclamationCircleFilled
                style={{
                  color: '#faad14',
                  fontSize: '18px',
                  marginRight: '10px',
                }}
              />,
              '确定删除该用户？',
            ]),
          );
        },
      },
    ];
    return () =>
      handle.map((item) => (
        <span class={[styles.ftColor, styles.mr40]} onClick={item.clickFun}>
          {item['title']}
        </span>
      ));
  },
});
