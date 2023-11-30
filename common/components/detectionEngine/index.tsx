/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-30 11:48:04
 * @LastEditTime: 2022-05-30 11:50:38
 */
import { defineComponent, ref, watchEffect } from 'vue';
import { ShowDetectionEngine } from '../enums/statusEnum';
export const detectionEngine = defineComponent({
  props: {
    status: {
      type: Number,
    },
  },
  setup(props) {
    // 文字
    const name = ref(''),
      // 字体颜色
      color = ref('');
    watchEffect(() => {
      [name.value, color.value] = ShowDetectionEngine[~~props.status! - 1].split('/');
    });
    return () => <div style={{ color: color.value }}>{name.value}</div>;
  },
});
