/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-01 18:47:26
 */
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { Col, Row, Badge } from 'ant-design-vue';
import { dymicProgress } from '@hydra/components/dymic-progress';
import classes from './index.module.less';
import { getContributeData } from '@/api/overview';
export const contributionStatic = defineComponent({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Badge.name]: Badge,
    dymicProgress,
  },
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
  },
  setup(props) {
    // 自定义初始化一个数据列表
    const dataList = ref([
      {
        module_name: '威胁情报联防检测引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '复合式杀毒引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '智能逆向分析引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '行为分析引擎',
        total: 0,
        percent: 0,
      },
      // {
      //   module_name: '威胁情报关联引擎',
      //   total: 0,
      //   percent: 0,
      // },
      {
        module_name: 'Webshell检测引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '漏洞检测引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '内存攻击检测引擎',
        total: 0,
        percent: 0,
      },
    ]);

    // // 数据转换，将“威胁情报联防检测引擎”提到最前面
    // const dataTransform = (dataArr) => {
    //   let tempIndex = -1;
    //   dataArr.forEach((item, index) => {
    //     if (item.module_type === 4) {
    //       tempIndex = index;
    //     }
    //   });    
    //   dataArr.unshift(...dataArr.splice(tempIndex, 1));
    //   return dataArr;
    // }

    // 请求模块数值统计数据
    watchEffect(async () => {
      const { items } = await getContributeData(props.filters);
      dataList.value = items;
      // dataList.value = dataTransform(items);
    });
    return () => (
      <div class={classes.container}>
        <div class={classes.header}>模块贡献值统计</div>
        <div style={{ flex: '1' }}>
          {dataList.value.map((item, index) => {
            return (
              <div
                class={classes.content}
                style={index === 0
                        ? {borderBottom: '1px solid rgba(255, 255, 255, 0.08)',height: '50px'}
                        : {}
                      }
              >
                <div class={classes.left}>
                  <div class={index === 0 ? classes.heavyLabel : classes.label}>{item.module_name}</div>
                </div>
                <div class={index === 0 ? classes.lineHide : classes.line}></div>
                <dymicProgress
                  class={classes.apros}
                  percent={item.percent < 100 ? item.percent : 100}
                  total={item.total}
                  style={index === 0 ? {height: '20px'} : {}}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
