import { updateAuthCode, updateTenantMark } from '@/api/platform/authorization';
import slotsForm from '@hydra/components/slots-form';
import { useModal } from '@/hooks/use-modal';
import { validateTenantName } from '@hydra/utils/reg';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import empower from './empower';
import styles from './index.module.less';
interface action {
  name: string;
  type?: string;
  onClick: () => void;
}
export const actions = defineComponent({
  props: {
    device_code: String,
    id: String,
    refreshTable: Function,
    tenant_mark: String,
  },
  setup(props) {
    const router = useRouter();
    const actions: Array<action> = [
      // 授权分配
      {
        name: '授权分配',
        onClick: () => {
          useModal(
            {
              title: '授权分配',
              handleOk: async ({ state, validate }) => {
                await validate();
                await updateAuthCode(Object.assign({}, state, { id: props.id! }));
                props.refreshTable!(true);
              },
            },
            empower,
          );
        },
      },
      // 编辑
      {
        name: '编辑',
        onClick: () => {
          useModal(
            {
              title: '编辑',
              contentProps: {
                fields: reactive({ tenant_mark: props.tenant_mark }),
                colsMap: [
                  {
                    title: '租户标识',
                    dataIndex: 'tenant_mark',
                    formProps: {
                      type: 'input',
                      rules: [
                        {
                          required: true,
                          message: '输入1-32个字符',
                          validator: validateTenantName,
                        },
                      ],
                    },
                  },
                ],
              },
              handleOk: async ({ fields, validate }) => {
                await validate();
                await updateTenantMark(Object.assign({}, fields, { id: props.id }));
                props.refreshTable!(true);
              },
            },
            slotsForm,
          );
        },
      },
      // 授权记录
      {
        name: '授权记录',
        onClick: () => {
          router.push({
            name: 'morgana-authrecord',
            query: {
              device_code: props.device_code,
              id: props.id,
            },
          });
        },
      },
    ];
    return () => (
      <>
        {actions.map((item) => (
          <span onClick={item.onClick} class={styles.btn}>
            {item.name}
          </span>
        ))}
      </>
    );
  },
});
