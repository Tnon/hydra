/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:45:45
 * @LastEditTime: 2022-05-19 15:31:14
 */
import { defineComponent } from 'vue';
import { labelNames } from '@hydra/components/reportTitle';
import styles from './index.module.less';
export const moduleHeader = defineComponent({
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    return () => (
      <div id={props.id} class={styles.header}>
        {labelNames[props.id]['labelName']}
      </div>
    );
  },
});
