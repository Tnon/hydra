/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-06 10:53:29
 */
import { defineComponent, PropType, ref } from 'vue';
import lineEchart from './lineEchart';
import classes from './index.module.less';
import { ColorEnum } from '@/enums/colorEnum';
import { SAMPLETYPE, THREATINFO } from '@/enums/statusEnum';

export const sampleThreat = defineComponent({
  components: {
    lineEchart,
  },
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
    fold: Boolean,
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
    // 选择威胁情报类别
    const optionType = [
      {
        label: '威胁情报识别',
        value: THREATINFO.INFO,
      },
    ];
    // 默认选中的值(恶意)
    const sample_type = ref(SAMPLETYPE.Malicious);
    // 默认选中的值(威胁情报识别)
    const threat_type = ref(THREATINFO.INFO);
    // 样式
    return () => (
      <div>
        <div class={classes.header}>
          <div class={classes.title}>样本威胁趋势</div>
          <div class={classes.select}>
            <a-select
              v-model={[threat_type.value, 'value']}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              style={{ marginRight: '10px' }}
              class={classes.selectOption}
            >
              {optionType.map((item) => (
                <a-select-option value={item.value}>
                  <div class={classes.formItem}>
                    <span
                      style={{
                        color: ColorEnum[item.value === THREATINFO.INFO ? 'threat_num' : ''],
                        marginRight: '5px',
                      }}
                    >
                      ——
                    </span>
                    <span>{item.label}</span>
                  </div>
                </a-select-option>
              ))}
            </a-select>

            <a-select
              v-model={[sample_type.value, 'value']}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              {optionsData.map((item) => (
                <a-select-option value={item.value}>
                  <div class={classes.formItem}>
                    <span
                      style={{
                        color:
                          ColorEnum[
                            item.value === SAMPLETYPE.Malicious ? 'malicious_num' : 'suspicious_num'
                          ],
                        marginRight: '5px',
                      }}
                    >
                      ——
                    </span>
                    <span>{item.label}</span>
                  </div>
                </a-select-option>
              ))}
            </a-select>
          </div>
        </div>
        <div class={classes.content}>
          <line-echart
            filters={props.filters}
            sample_type={sample_type.value}
            threat_type={threat_type.value}
            fold={props.fold}
          />
        </div>
      </div>
    );
  },
});
