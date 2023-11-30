/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-18 13:57:44
 * @LastEditTime: 2022-04-20 20:05:55
 */
import { IsCompress } from '../enums/statusEnum';
import { createVNode, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
export const ViewReport = defineComponent({
  props: {
    is_compress: Number as PropType<IsCompress>,
    sample_id: [String, Number],
    sampleName: String,
  },
  setup(props) {
    const router = useRouter();
    return () =>
      createVNode(
        'span',
        {
          style: {
            cursor: 'pointer',
            color: '#267EE5',
          },
          onClick: () => {
            router.push({
              name: props.is_compress === IsCompress.ZIP ? 'platform-compress' : 'platform-report',
              query: {
                id: props.sample_id,
                name: props.is_compress === IsCompress.ZIP ? undefined : props.sampleName,
              },
            });
          },
        },
        '查看报告',
      );
  },
});
