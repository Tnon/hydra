import { defineComponent, ref, unref, watchEffect } from 'vue';
import { Row, Col, Spin } from 'ant-design-vue';
import styles from './index.module.less';
import { getTenantStaticDetail } from '@/api/platform/authorization';
export const recordTotal = defineComponent({
  props: {
    state: Object,
    id: String,
  },
  setup(props) {
    const loading = ref(false);
    const items = ref([
      {
        title: '自动检测授权总计',
        count: 0,
      },
      {
        title: '专家检测授权总计',
        count: 0,
      },
    ]);
    const getStaticSum = async (id, date_range) => {
      loading.value = true;
      const { auto_total, expert_total } = await getTenantStaticDetail({
        filter: {
          id,
          date_range,
        },
      });
      loading.value = false;
      unref(items)[0].count = auto_total;
      unref(items)[1].count = expert_total;
    };
    watchEffect(() => {
      getStaticSum(props.id, props.state!.date_range);
    });
    return () => (
      <>
        <Row gutter={20}>
          {items.value.map((item) => (
            <Col span={12}>
              <Spin spinning={loading.value}>
                <div class={styles.node}>
                  <div class={styles.title}>{item.title}</div>
                  <div class={styles.number}>{item.count}</div>
                </div>
              </Spin>
            </Col>
          ))}
        </Row>
      </>
    );
  },
});
