/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-11 14:08:50
 * @LastEditTime: 2022-06-10 18:00:14
 */
import { defineComponent } from 'vue';
import { Popover } from 'ant-design-vue';
import classes from './index.module.less';
export const riskCount = defineComponent({
  props: {
    count: Number,
    title: String,
  },
  setup(props) {
    return () => (
      <div class={classes.content}>
        <div
          class={[
            classes.main,
            props.count! > 59
              ? classes.danger
              : props.count! > 29 && props.count! <= 59
              ? classes.suspiciouses
              : classes.nomal,
          ]}
        >
          <div>{props.title}</div>
          <div>{props.count}</div>
        </div>
        {
          props.title!=="置信度"
          ? <div class={classes.description}>
              <Popover
                title="风险值说明"
                trigger="click"
                placement="bottom"
                overlayClassName="popover"
                destroyTooltipOnHide
                getPopupContainer={(triggerNode): any => triggerNode.parentNode}
              >
                {{
                  default: () => <span class={classes.title}>风险值说明</span>,
                  content: () => (
                    <div>
                      <p class={classes.safe}>
                        正常样本<span>0-29</span>
                      </p>
                      <p class={classes.suspicious}>
                        可疑样本<span>30-59</span>
                      </p>
                      <p class={classes.malignity}>
                        恶意样本<span>60-100</span>
                      </p>
                    </div>
                  ),
                }}
              </Popover>
            </div>
          : ''
        }
      </div>
    );
  },
});
