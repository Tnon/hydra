/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-05-16 18:35:47
 */
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { Col, Row, Badge } from 'ant-design-vue';
import { dymicProgress } from '@hydra/components/dymic-progress';
import classes from './index.module.less';
import { getStaticData } from '@/api/overview';
import { RANGDATE } from '@/enums/statusEnum';
export const dataStatic = defineComponent({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Badge.name]: Badge,
    dymicProgress,
  },
  props: {
    interval: {
      type: Number as PropType<RANGDATE>,
      required: true,
    },
  },
  setup(props) {
    // 自定义初始化一个数据列表
    const dataList = ref([
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
      {
        module_name: '威胁情报关联引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '内存Webshell检测引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '漏洞利用检测引擎',
        total: 0,
        percent: 0,
      },
      {
        module_name: '无文件攻击检测引擎',
        total: 0,
        percent: 0,
      },
    ]);
    // 请求模块数值统计数据
    watchEffect(async () => {
      const { items } = await getStaticData({ interval: props.interval });
      dataList.value = items;
    });
    return () => (
      <div class={classes.container}>
        <div class={classes.header}>贡献值统计</div>
        <div style={{ flex: '1' }}>
          {dataList.value.map((item) => {
            return (
              <div class={classes.content}>
                <div class={classes.left}>
                  <div class={classes.label}>{item.module_name}</div>
                </div>
                <div class={classes.line}></div>
                <dymicProgress class={classes.apros} percent={~~item.percent} total={item.total} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
});
