/*
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-31 18:21:09
 * @LastEditTime: 2022-06-05 22:51:12
 */
/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-30 22:56:24
 * @LastEditTime: 2022-05-31 17:48:48
 */
import { createVNode, defineComponent, PropType, ref, watchEffect } from 'vue';
import { Table } from 'ant-design-vue';
import classes from './index.module.less';
import { detectionEngine } from '../detectionEngine';
import { RiskType } from '../enums/statusEnum';
export const realtimeTable = defineComponent({
  props: {
    // getTenantRealTime: {
    //   type: Function,
    //   required: true,
    // },
    sample_list: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const sample_list = ref<any>([]);
    // 表头
    const columns = [
      {
        title: '发现时间',
        dataIndex: 'update_time',
        width: 200,
      },
      {
        title: '被攻击单位',
        dataIndex: 'tenant_name',
        width: 150,
      },
      {
        title: '检测引擎',
        dataIndex: 'detection_engine',
        width: 150,
        customRender: ({ text }) => (text ? createVNode(detectionEngine, { status: text }) : '-'),
      },
      {
        title: '样本名称',
        dataIndex: 'file_name',
        width: 250,
      },
      {
        title: '样本MD5',
        dataIndex: 'file_md5',
        width: 250,
      },
      {
        title: '样本大小',
        dataIndex: 'file_size',
        width: 100,
      },
      {
        title: '风险值',
        dataIndex: 'final_value',
        width: 100,
      },
      {
        title: '风险值类型',
        dataIndex: 'risk_type',
        width: 150,
        customRender: ({ text }) => RiskType[text],
      },
      {
        title: '影响单位数',
        dataIndex: 'effect_count',
        width: 100,
      },
      {
        title: '影响单位',
        dataIndex: 'effect_tenant_str',
        width: 100,
        ellipsis: true,
      },
    ];
    // 请求实时威胁告警表格数据
    // watchEffect(async () => {
    //   const { items } = await props.getTenantRealTime({tenant_id: props.tenant_id});
    //   sample_list.value = items;
    // });
    watchEffect(() => {
      sample_list.value = props.sample_list;
    });
    return () => (
      <div class={classes.container}>
        <div class={classes.header}>实时威胁告警</div>
        <div class={classes.alarmtable}>
          <Table
            class="singleTable"
            row-class-name={(_record: any, index: number) =>
              index % 2 === 0 ? classes.tableStriped : null
            }
            columns={columns}
            rowKey="host_id"
            dataSource={sample_list.value}
            pagination={false}
          />
        </div>
      </div>
    );
  },
});
