/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-05-31 09:35:19
 */
import { defineComponent, PropType, reactive, ref, unref, watchEffect } from 'vue';
import classes from './index.module.less';
import { Spin } from 'ant-design-vue';
import { ColorEnum } from '@/enums/colorEnum';
import { getTopCardData } from '@/api/overview';
import { RANGDATE } from '@/enums/statusEnum';
export const statics = defineComponent({
  props: {
    interval: {
      type: Number as PropType<RANGDATE>,
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
      //未发现
      safe_num: 0,
    });
    //种类
    const renderTypes = ref([
      {
        key: 'malicious_num',
        title: '恶意样本总数',
        icon: '#axysxtishi',
      },
      {
        key: 'suspicious_num',
        title: '可疑样本总数',
        icon: '#axysxjingshi',
      },
      {
        key: 'safe_num',
        title: '暂无风险样本总数',
        icon: '#axysxchenggong',
      },
    ]);

    // 请求卡片数据
    watchEffect(async () => {
      resLoading.value = true;
      const res = await getTopCardData({ interval: props.interval });
      resLoading.value = false;
      Object.assign(state, res);
    });
    return () => (
      <Spin spinning={resLoading.value}>
        <div class={classes.row}>
          {unref(renderTypes).map(({ title, icon, key }) => (
            <div class={classes.node}>
              <div class={classes.content}>
                <div class={classes.title}>{title}</div>
                <div class={classes.body} style={{ color: ColorEnum[key] }}>
                  <customIcon class={classes.icon} type={icon} />
                  <div class={classes.value}>{state[key]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Spin>
    );
  },
});
