/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-26 19:53:20
 * @LastEditTime: 2022-06-15 14:46:43
 */
import { editUsers, resetPWD, deleteUsers } from '@/api/platform/user';
import slotsForm from '@hydra/components/slots-form';
import { updatePwd as updatePwdModal } from '@hydra/components/updatePwd';
import { useModal } from '@/hooks/use-modal';
import { pCompile } from '@hydra/utils/urlUtils';
import { createVNode, defineComponent, reactive, computed, ref, unref } from 'vue';
import { useFormItems } from './columns';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import styles from './index.module.less';
import { userToken } from '@/store/modules/user';
import { RoleEnum } from '@/enums/roleEnum';
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
    const userStore = userToken();
    const roleType = computed(() => userStore.roleType);
    //是否有删除
    const showDelete = ref(false);
    //超级管理员
    if (unref(roleType) === RoleEnum.SUPERADMIN) {
      //超级不能删自己
      if (props.record.is_default === 1) {
        showDelete.value = false;
      } else {
        // 可以删除其他
        showDelete.value = true;
      }
      //系统管理员
    } else {
      //不能删除超级
      if (props.record.is_default === 1) {
        showDelete.value = false;
      } else {
        //不能删除同类
        if (props.record.role === RoleEnum.PLATFORM) {
          showDelete.value = false;
        } else {
          //能删除租户安全分析
          showDelete.value = true;
        }
      }
    }

    // 是否有编辑按钮
    // 规则：1、admin可编辑所有（包括自己）
    //      2、系统管理员可编辑安全分析员但是不可编辑自己,
    //      3、安全分析员无编辑权限
    // role: 1 系统管理员；  role: 2 安全分析员  
    const showEdit = ref(false);
    if (unref(roleType) === RoleEnum.SUPERADMIN) {
      showEdit.value = true;
    } else if (unref(roleType) === RoleEnum.PLATFORM && props.record.role !== RoleEnum.PLATFORM && props.record.is_default !== 1) {
      showEdit.value = true;
    } else {
      showEdit.value = false;
    }

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
              user_phone: fields.user_phone, // 新增手机号修改
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
          '确定删除该用户？',
        ]),
      );
    };
    return () => (
      <div>
        {
          showEdit.value
          ? (<span class={[styles.ftColor, styles.mr40]} onClick={() => updateInfo()}>
              编辑
            </span>)
          : null
        }
        {/* <span class={[styles.ftColor, styles.mr40]} onClick={() => updateInfo()}>
          编辑
        </span> */}
        <span class={[styles.ftColor, styles.mr40]} onClick={() => updatePwd()}>
          重置密码
        </span>
        {showDelete.value ? (
          <span class={styles.ftColor} onClick={() => deleteInfo()}>
            删除
          </span>
        ) : null}
      </div>
    );
  },
});
