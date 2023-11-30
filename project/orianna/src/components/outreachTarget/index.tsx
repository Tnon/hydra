/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-17 19:01:05
 * @LastEditTime: 2022-05-17 20:16:26
 */
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { Table } from 'ant-design-vue';
import classes from './index.module.less';
import { OUTREACH } from '@/enums/statusEnum';
import { getTenantOutreachList } from '@/api/tenant/overview';
export const outreachTarget = defineComponent({
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
    getDataFun: {
      type: Function as PropType<(record: any) => any>,
      required: true,
    },
  },
  setup(props) {
    const sample_list = ref<any>([]);
    const columns = [
      {
        title: '外联目标',
        dataIndex: 'address',
        width: 200,
      },
      {
        title: '归属地',
        dataIndex: 'country',
        width: 200,
      },
      {
        title: '目标类型',
        dataIndex: 'risk_category',
        width: 200,
      },
      {
        title: '外联样本数',
        dataIndex: 'count',
        width: 200,
      },
      {
        title: '影响单位数',
        dataIndex: 'effect_count',
        width: 100,
      },
      {
        title: '影响单位',
        dataIndex: 'effect_tenant_str',
        width: 200,
        ellipsis: true,
      },
      {
        title: '最后发现时间',
        dataIndex: 'discovery_time',
        width: 200,
      },
    ];

    // 请求外联目标TOP表格数据;
    watchEffect(async () => {
      const { items } = await props.getDataFun({
        ...props.filters,
        top_num: OUTREACH.TOPFIVE,
      });
      sample_list.value = items;
    });
    return () => (
      <div class={classes.container}>
        <div class={classes.header}>外联目标TOP5</div>
        <div class={classes.privatetable}>
          <Table
            row-class-name={(_record: any, index: number) =>
              index % 2 === 0 ? classes.tableStriped : null
            }
            ref="tableRef"
            columns={columns}
            rowKey="host_id"
            class="singleTable"
            dataSource={sample_list.value}
            pagination={false}
          />
        </div>
      </div>
    );
  },
});
