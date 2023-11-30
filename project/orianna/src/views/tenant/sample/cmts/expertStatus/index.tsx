/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-31 11:59:44
 * @LastEditTime: 2022-04-20 14:19:36
 */
import { tenantExpertAna } from '@/api/tenant/sample';
import { AutoStatus, ExpertStatus, IsCompress } from '@/enums/statusEnum';
import { useModal } from '@/hooks/use-modal';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { createVNode, defineComponent, ref, unref, watchEffect } from 'vue';
export const expertStatus = defineComponent({
  components: {
    ExclamationCircleFilled,
  },
  props: {
    status: Number,
    id: Number,
    is_compress: Number,
    refreshTable: Function,
    auto_status: Number,
    is_destroy: Number,
  },
  setup(props) {
    const name = ref(''),
      color = ref('');
    watchEffect(() => {
      switch (props.status) {
        case ExpertStatus.ExpertStatusOK:
          name.value = '已完成';
          color.value = '#34A753';
          break;
        case ExpertStatus.ExpertStatusChecking:
          name.value = '分析中...';
          color.value = '#34A753';
          break;
        case ExpertStatus.ExpertStatusNone:
          name.value = '转专家分析';
          color.value = '#267EE5';
          break;
        default:
          color.value = '#aaa';
          name.value = '-';
          break;
      }

      //压缩包不能转专家
      if (props.is_compress === IsCompress.ZIP) {
        name.value = '-';
        color.value = '#aaa';
      }
      //自动分析还没有完成，直接不让操作
      if (props.auto_status !== AutoStatus.AutoStatusOK) {
        name.value = '-';
        color.value = '#aaa';
      }

      // 如果样本已经销毁，不能转专家分析
      if (props.is_destroy) {
        name.value = '-';
        color.value = '#aaa';
      }
    });

    return () => {
      return createVNode(
        'span',
        {
          attrs: {
            type: 'primary',
          },
          style: {
            color: unref(color),
            cursor: name.value == '转专家分析' ? 'pointer' : '',
          },
          onClick: () => {
            if (name.value == '转专家分析') {
              useModal(
                {
                  title: '提示',
                  wrapClassName: 'noticeModal',
                  handleOk: async () => {
                    await tenantExpertAna({ id: String(props.id!) });
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
                  '确定转入专家分析？',
                ]),
              );
            } else {
              return;
            }
          },
        },
        name.value,
      );
    };
  },
});
