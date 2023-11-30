/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-02 18:19:06
 */
import { defineComponent, PropType, ref, unref, watchEffect } from 'vue';
import pieEchart from './pieEchart';
import classes from './index.module.less';
import { Badge, Col, Row, Spin } from 'ant-design-vue';
import { getPieData } from '@/api/platform/overview';
export const sampleCluster = defineComponent({
  components: {
    pieEchart,
    Spin,
  },
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
  },
  setup(props) {
    // 颜色集合
    const color = ref([
      'rgba(88, 132, 222, 1)',
      'rgba(88, 132, 222, 0.9)',
      'rgba(88, 132, 222, 0.8)',
      'rgba(88, 132, 222, 0.7)',
      'rgba(88, 132, 222, 0.6)',
      'rgba(88, 132, 222, 0.5)',
      'rgba(88, 132, 222, 0.4)',
      'rgba(88, 132, 222, 0.3)',
      'rgba(88, 132, 222, 0.2)',
      'rgba(88, 132, 222, 0.1)',
      'rgba(88, 132, 222, 0.1)',
      'rgba(88, 132, 222, 0.1)',
      'rgba(88, 132, 222, 0.1)',
      'rgba(88, 132, 222, 0.1)',
    ]);
    //loading
    const resLoading = ref<boolean>(false);
    // 右侧数据
    const pieList = ref([]);
    //chart元素
    const peChart = ref<any>();
    //legend自定义事件
    const legendClick = (name, index) => {
      const instance = unref(peChart).getInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name,
      });

      color.value[index] =
        color.value[index] === '#eee' ? (pieList.value[index] as any).color : '#eee';
    };
    // 样本聚类请求数据
    watchEffect(async () => {
      resLoading.value = true;
      const { items } = await getPieData(props.filters);
      items.forEach((ele, index) => {
        ele.color = `rgba(88, 132, 222, ${1 - index / 10})`;
      });
      pieList.value = items;
      resLoading.value = false;
    });
    return () => (
      <div class={classes.container}>
        <div class={classes.header}>
          <div class={classes.title}>样本聚类</div>
        </div>
        <div class={classes.content}>
          <Row>
            <Col span={6}>
              <pie-echart ref={peChart} pieList={pieList.value} color={color.value} />
            </Col>
            <Col span={18}>
              <Spin spinning={resLoading.value}>
                <Row class={classes.contentRight}>
                  {unref(pieList).map(({ name, value, percent, add }, index) => {
                    return (
                      <Col span={6} class={classes.legendNode}>
                        <div onClick={() => legendClick(name, index)}>
                          <Badge color={color.value[index]}></Badge>
                          <span class={classes.value}>{`${name}（${value},${percent ?? 0},${
                            add ?? 0
                          }）`}</span>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    );
  },
});
