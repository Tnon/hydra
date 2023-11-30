/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:20
 * @LastEditTime: 2022-05-16 18:07:43
 */
import { CSSProperties, defineComponent, ref, watchEffect } from 'vue';

export const dymicProgress = defineComponent({
  props: {
    // 占比,给的是小数,如果大于100,则传过来100;小于100,不做处理
    // 已在父组件进行处理
    percent: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    strokeColor: {
      type: String,
      default: '#267EE5',
    },
    trailColor: {
      type: String,
      default: 'rgba(38, 126, 229, 0.1)',
    },
    suffix: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const progressStyle: CSSProperties = {
      height: '16px',
      background: props.trailColor,
      position: 'relative',
      width: '100px',
    };
    const percentStyle = ref<CSSProperties>({
      position: 'absolute',
      left: 0,
      height: '100%',
      width: '0%',
      transition: 'width .3s',
      background: props.strokeColor,
    });
    const prefixStyle = ref<CSSProperties>({
      position: 'absolute',
      left: '0%',
      lineHeight: '16px',
      marginLeft: '5px',
    });
    watchEffect(() => {
      percentStyle.value.width = ~~props.percent + '%'; // ~~取整
      prefixStyle.value.left = ~~props.percent + '%';
    });
    return () => (
      <div style={progressStyle}>
        <div style={percentStyle.value}></div>
        <span style={prefixStyle.value}>{props.percent + '%'}</span>
      </div>
    );
  },
});
