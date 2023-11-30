/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-06 10:59:57
 */
import { defineComponent, PropType, reactive, ref, unref, watchEffect } from 'vue';
import classes from './index.module.less';
import { Spin } from 'ant-design-vue';
import { ColorEnum } from '@/enums/colorEnum';
import { getSampleThreatData } from '@/api/overview';
export const totalStatics = defineComponent({
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
  },
  setup(props) {
    //加载中
    const resLoading = ref<boolean>(false);
    //条件结构
    const state = reactive({
      //恶意
      malicious_num: 0,
      //可疑
      suspicious_num: 0,
      // 暂未发现
      safe_num: 0,
    });
    //种类
    const renderTypes = ref([
      {
        key: 'malicious_num',
        title: '恶意样本总数',
        icon: '#axysxbingdu',
        size: '25',
      },
      {
        key: 'suspicious_num',
        title: '可疑样本总数',
        icon: '#axysxjingshi',
        size: '25',
      },
      {
        key: 'safe_num',
        title: '暂未发现风险样本总数',
        icon: '#axysxchenggong',
        size: '25',
      },
    ]);

    // 请求卡片数据
    watchEffect(async () => {
      resLoading.value = true;
      const res = await getSampleThreatData(props.filters);
      resLoading.value = false;
      Object.assign(state, res);
    });
    return () => (
      <Spin spinning={resLoading.value}>
        <div class={classes.row}>
          {unref(renderTypes).map(({ title, icon, key, size }) => (
            <div class={classes.node}>
              <div class={classes.content}>
                <div class={classes.body} style={{ color: ColorEnum[key] }}>
                  <customIcon class={classes.icon} type={icon} size={size} />
                  <div>
                    <div class={classes.title}>{title}</div>
                    <div class={classes.value}>{state[key]}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Spin>
    );
  },
});
