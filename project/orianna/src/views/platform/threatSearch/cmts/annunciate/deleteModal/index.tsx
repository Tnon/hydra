/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-06-02 11:37:07
 * @LastEditTime: 2022-06-02 13:03:33
 */
import { createVNode, defineComponent } from 'vue';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { useModal } from '@/hooks/use-modal';
import { getThreatDel } from '@/api/platform/threat';

export const deleteModal = defineComponent({
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
    // 删除用户
    const deleteInfo = () => {
      useModal(
        {
          title: '删除',
          wrapClassName: 'noticeModal',
          handleOk: async () => {
            await getThreatDel({ ids: [props.record.id!] });
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
          '确定删除该条通告吗？',
        ]),
      );
    };

    return () => (
      <div>
        <span onClick={() => deleteInfo()} style={{ cursor: 'pointer', color: '#267ee5' }}>
          删除
        </span>
      </div>
    );
  },
});
