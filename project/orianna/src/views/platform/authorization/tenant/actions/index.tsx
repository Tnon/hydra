/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-06-15 20:11:50
 */
import {
  tenantAuth,
  deleteTenant,
  requestEditPhone
} from '@/api/platform/authorization';
import { useModal } from '@/hooks/use-modal';
import { defineComponent, createVNode, computed, unref } from 'vue';
import { useRouter } from 'vue-router';
import empower from './empower';
import styles from './index.module.less';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { useUserToken } from '@/store/modules';
import { RoleEnum } from '@/enums/roleEnum';
import { resetPassword } from './resetPassword';
import { requestResetPwd } from '@/api/platform/user';
import { pCompile } from '@hydra/utils/urlUtils';

import edit from './edit';

interface action {
  name: string;
  type?: string;
  onClick: () => void;
}
export const actions = defineComponent({
  props: {
    tenant_account: String,
    tenant_name: String,
    id: String,
    refreshTable: Function,
    tenant_mark: String,
    login_status: Number,
    user_phone: String,
  },
  components: {
    ExclamationCircleFilled,
  },
  setup(props) {
    const router = useRouter();
    const userTokenStore = useUserToken();
    const roleType = computed(() => userTokenStore.roleType);

    const actions: Array<action> = [
      {
        name: '授权分配',
        onClick: () => {
          useModal(
            {
              title: '授权分配',
              handleOk: async ({ state, validate }) => {
                await validate();
                await tenantAuth(Object.assign({}, state, { id: props.id! }));
                props.refreshTable!(true);
              },
            },
            empower,
          );
        },
      },
      {
        name: '授权记录',
        onClick: () => {
          router.push({
            name: 'tenant-authrecord',
            query: {
              tenant_name: props.tenant_name,
              id: props.id,
            },
          });
        },
      },
      {
        name: '重置密码',
        disabled: unref(roleType) !== RoleEnum.SUPERADMIN, // 不是admin,没有重置租户密码的权限
        onClick: () => {
          useModal(
            {
              title: '重置密码',
              contentProps: {
                account: props.tenant_account,
                id: props.id,
              },
              handleOk: async ({ fields, slotsForm}) => {
                await slotsForm.validate();
                // const { code } = await requestResetPwd({
                //   id: fields.id,
                //   new_password: pCompile(fields.new_password),
                //   old_password: pCompile(fields.old_password),
                // });
                const { code } = await requestResetPwd(
                  Object.assign(
                    {},
                    { id: fields.id },
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
            resetPassword,
          );
        },
      },
      {
        name: '编辑',
        onClick: () => {
          useModal(
            {
              title: '编辑',
              width: 500,
              contentProps: {
                phone_number: props.user_phone,
              },
              handleOk: async ({ state, validate }) => {
                await validate();
                await requestEditPhone(Object.assign({}, state, { id: props.id! }));
                props.refreshTable!(true);
              },
            },
            edit,
          );
        },
      },
      {
        name: '删除',
        disabled: false,
        onClick: () => {
          // if (!props.login_status) {
          //   return false;
          // }
          useModal(
            {
              title: '删除',
              wrapClassName: 'noticeModal',
              handleOk: async () => {
                await deleteTenant({ id: props.id! });
                props.refreshTable!();
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
              '删除后将回收租户剩余授权至平台总授权池，是否确认删除？',
            ]),
          );
        },
      },
    ];
    return () => (
      <>
        {actions.map((item) =>
          !item.disabled ? (
            <span onClick={item.onClick} class={styles.btn}>
              {item.name}
            </span>
          ) : null,
        )}
      </>
    );
  },
});
