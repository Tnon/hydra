/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-04-20 14:18:24
 */
import customIcon from "@hydra/components/custom-icon";
import { Spin } from "ant-design-vue";
import { createVNode, defineComponent, ref, unref, watchEffect } from "vue";
import classes from "./index.module.less";
export const totalView = defineComponent({
  props: {
    testing_num: Number, // 样本分析中
    expert_analysis_num: Number, // 专家分析
    test_complete_num: Number, // 已检测
  },
  setup(props) {
    //加载中
    const resLoading = ref<boolean>(false);
    const items = ref<any>([]);
    watchEffect(async () => {
      items.value = [
        {
          title: "样本检测中",
          value: props.testing_num,
          icon: "#axysxjiance",
        },
        {
          title: "专家分析",
          value: props.expert_analysis_num,
          icon: "#axysxzhuanjia",
        },
        {
          title: "已检测",
          value: props.test_complete_num,
          icon: "#axysxfanghu",
        },
      ];
    });
    return () => (
      <div class={classes.content}>
        {unref(items).map(({ title, value, icon }) => (
          <Spin spinning={resLoading.value}>
            <div class={classes.node}>
              {createVNode(customIcon, {
                type: icon,
                style: { color: "#267ee5" },
                class: classes.cusicon,
              })}
              <div class={classes.rnode}>
                <div class={classes.title}>{title}</div>
                <div class={classes.value}>{value}</div>
              </div>
            </div>
          </Spin>
        ))}
      </div>
    );
  },
});
