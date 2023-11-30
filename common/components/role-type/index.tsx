/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 14:14:13
 * @LastEditTime: 2022-06-15 20:39:03
 */
import { defineComponent } from 'vue';

export const roleType = defineComponent({
  props: {
    text: Number,
    is_default: Number,
  },
  setup(props) {
    const style = {
      display: 'inline-block',
      padding: '3px 5px',
      background: 'rgba(38, 126, 229, 0.1)',
      color: '#267EE5',
    };
    return () => (
      <div style={style}>
        {props.is_default === 1 && props.text === 1
          ? '超级管理员'
          : props.text === 1
          ? '系统管理员'
          : props.text === 2
          ? '安全分析员'
          : '租户'}
      </div>
    );
  },
});
