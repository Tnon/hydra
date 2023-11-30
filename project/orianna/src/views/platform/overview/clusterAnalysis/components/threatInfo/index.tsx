/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-25 19:26:06
 * @LastEditTime: 2022-05-31 09:37:25
 */
import { defineComponent, PropType, reactive, ref, unref, watchEffect } from 'vue';
import { Badge, Spin } from 'ant-design-vue';
import classes from './index.module.less';
import { getThreatInfoConnect } from '@/api/platform/overview';
export const threatInfo = defineComponent({
  components: {
    Badge,
  },
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
    queriedSum: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    // 加载中
    const resLoading = ref<boolean>(false);
    // 数据
    const state = reactive({
      threat_malicious_sample_num: 0,
      yisuo_connect: false,
    });

    // 威胁情报已识别恶意样本
    watchEffect(async () => {
      resLoading.value = true;
      const res = await getThreatInfoConnect(props.filters);
      resLoading.value = false;
      Object.assign(state, res);
    });
    return () => (
      <div>
        <Spin spinning={resLoading.value}>
          <div class={classes.container} style={props.queriedSum > -1 ? {height: '100px'} : {height: '130px'}}>
            <customIcon style={{ color: '#fff' }} type="#axysxkeshihua" size="40" />
            <div class={classes.title}>
              <div>威胁情报</div>
              <div> 已识别恶意样本</div>
            </div>
            <div class={classes.value}>{state.threat_malicious_sample_num}</div>
            <div class={classes.connect}>
              {state.yisuo_connect ? (
                <div class={classes.status}>
                  <Badge color="#00FF00"></Badge>
                  <span>已连接</span>
                </div>
              ) : (
                <div class={classes.status}>
                  <Badge color="#F75554"></Badge>
                  <span>未连接</span>
                </div>
              )}
            </div>
          </div>
        </Spin>
      </div>
    );
  },
});
