/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-04-13 11:04:07
 */
import { defineComponent, PropType, ref } from 'vue';
import { Select } from 'ant-design-vue';
import lineEchart from './lineEchart';
import classes from './index.module.less';
import { ColorEnum } from '@/enums/colorEnum';
import { RANGDATE, SAMPLETYPE } from '@/enums/statusEnum';

export const sampleThreat = defineComponent({
  components: {
    lineEchart,
    Select,
  },
  props: {
    interval: {
      type: Number as PropType<RANGDATE>,
      required: true,
    },
  },
  setup(props) {
    // 选择数据
    const optionsData = [
      {
        label: '恶意样本',
        value: SAMPLETYPE.Malicious,
      },
      {
        label: '可疑样本',
        value: SAMPLETYPE.Suspicious,
      },
    ];
    // 默认选中的值
    const sample_type = ref(SAMPLETYPE.Malicious);
    // 样式
    return () => (
      <>
        <div class={classes.header}>
          <div class={classes.title}>样本威胁趋势</div>
          <Select
            v-model={[sample_type.value, 'value']}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            {optionsData.map((item) => (
              <Select.Option value={item.value}>
                <div class={classes.formItem}>
                  <span
                    style={{
                      color:
                        ColorEnum[
                          item.value === SAMPLETYPE.Malicious
                            ? 'malicious_num'
                            : item.value === SAMPLETYPE.Suspicious
                            ? 'suspicious_num'
                            : 'safe_num'
                        ],
                      marginRight: '5px',
                    }}
                  >
                    ——
                  </span>
                  <span>{item.label}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div class={classes.content}>
          <line-echart interval={props.interval} sample_type={sample_type.value} />
        </div>
      </>
    );
  },
});
