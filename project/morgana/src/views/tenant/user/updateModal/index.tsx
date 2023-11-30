/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-09 11:09:39
 * @LastEditTime: 2022-04-20 20:33:55
 */
import { editUsers, resetPWD, deleteUsers } from '@/api/user';
import slotsForm from '@hydra/components/slots-form';
import { updatePwd as updatePwdModal } from '@hydra/components/updatePwd';
import { useModal } from '@/hooks/use-modal';
import { pCompile } from '@hydra/utils/urlUtils';
import { createVNode, defineComponent, reactive } from 'vue';
import { useFormItems } from './columns';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
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
    // 编辑信息
    const updateInfo = () => {
      useModal(
        {
          title: '编辑',
          contentProps: {
            disKeys: { account: true },
            colsMap: useFormItems(),
            fields: reactive(Object.assign({}, props.record)),
          },
          handleOk: async ({ fields, validate }) => {
            await validate();
            await editUsers({
              id: fields.id,
              email: fields.email,
              dept: fields.dept,
            });
            props.refreshTable!(true);
          },
        },
        slotsForm,
      );
    };
    //修改密码
    const updatePwd = () => {
      useModal(
        {
          title: '重置密码',
          contentProps: {
            account: props.record.account,
            id: props.record.id,
          },
          handleOk: async ({ fields, slotsForm }) => {
            await slotsForm.validate();
            const { code } = await resetPWD(
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
    };
    // 删除用户
    const deleteInfo = () => {
      useModal(
        {
          title: '删除',
          wrapClassName: 'noticeModal',
          handleOk: async () => {
            await deleteUsers({ id: props.record.id! });
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
    };
    return () => (
      <div>
        <span class={[styles.ftColor, styles.mr40]} onClick={() => updateInfo()}>
          编辑
        </span>
        <span class={[styles.ftColor, styles.mr40]} onClick={() => updatePwd()}>
          重置密码
        </span>
        <span class={styles.ftColor} onClick={() => deleteInfo()}>
          删除
        </span>
      </div>
    );
  },
});
