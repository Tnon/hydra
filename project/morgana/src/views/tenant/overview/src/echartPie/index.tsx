/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-30 23:43:43
 * @LastEditTime: 2022-02-22 11:08:06
 */
import { defineComponent, ref, unref, watchEffect } from 'vue';
import classes from './index.module.less';
import { Progress, Spin } from 'ant-design-vue';
export const echartPie = defineComponent({
  components: {
    Progress,
  },
  props: {
    expert_analyze_total: Number, // 专家授权总数
    expert_analyze_used: Number, // 已用专家检测数
    expert_analyze_percentage: String, // 专家检测百分比
    auto_used_day: Number, // 已用自动检测天数
    auto_total_day: Number, // 自动检测总天数
    auto_percentage: String, // 自动检测百分比
  },
  setup(props) {
    const state = ref<any>([]);
    //加载中
    const resLoading = ref<boolean>(false);
    watchEffect(async () => {
      state.value = [
        {
          title: '已用专家服务授权/次',
          count: props.expert_analyze_used,
          total: props.expert_analyze_total,
          percent: props.expert_analyze_percentage,
        },
        {
          title: '已用自动服务授权/天',
          count: props.auto_used_day,
          total: props.auto_total_day,
          percent: props.auto_percentage,
        },
      ];
    });
    return () => (
      <>
        {unref(state).map(({ title, count, total, percent }) => (
          <Spin spinning={resLoading.value}>
            <div class={classes.node}>
              <div class={classes.title}>{title}</div>
              <div class={classes.count}>{count}</div>
              <div class={classes.total}>总可用：{total}</div>
              <Progress
                format={(percent) => percent}
                class={classes.progress}
                strokeColor="#267EE5"
                strokeWidth={4}
                type="circle"
                percent={percent}
              />
            </div>
          </Spin>
        ))}
      </>
    );
  },
});
