/*
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-02 13:03:43
 * @LastEditTime: 2022-06-03 23:39:58
 */
import { defineComponent, inject } from 'vue';
import classes from './index.module.less';
export const cilckNotice = defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const searchReport = inject('searchReport') as any;
    const clickValue = () => {
      searchReport(props.text);
    };
    return () => (
      <div class={classes.content} onClick={() => clickValue()}>
        {props.text}
      </div>
    );
  },
});
