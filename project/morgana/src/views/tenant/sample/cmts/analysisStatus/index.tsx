/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-08 17:49:16
 * @LastEditTime: 2022-04-02 15:59:07
 */
import { ShowAnalysisStatus } from '@/enums/statusEnum';
import { createVNode, defineComponent, ref, unref, watchEffect } from 'vue';
export const analysisStatus = defineComponent({
  props: {
    status: {
      type: Number,
    },
  },
  setup(props) {
    const name = ref(''),
      color = ref(''),
      background = ref('');
    watchEffect(() => {
      [name.value, color.value, background.value] =
        ShowAnalysisStatus[~~props.status! - 1].split('/');
    });
    return () => {
      return createVNode(
        'span',
        {
          style: {
            color: unref(color),
            background: unref(background),
            padding: '2px 8px',
          },
        },
        name.value,
      );
    };
  },
});
