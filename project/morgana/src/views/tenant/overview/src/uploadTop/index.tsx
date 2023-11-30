/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-30 22:56:24
 * @LastEditTime: 2022-04-20 15:23:40
 */
import { createVNode, defineComponent, ref, watchEffect } from "vue";
import classes from "./index.module.less";
import { Table, Col } from "ant-design-vue";
import { ViewReportTenant } from "@hydra/components/ViewReportTenant";
import { AutoStatus } from "@/enums/statusEnum";
import { getUploadData } from "@/api/overview";
export const uploadTop = defineComponent({
  components: {
    [Col.name]: Col,
  },
  setup() {
    const resLoading = ref(false);
    const sample_list = ref([]);
    const columns = [
      {
        title: "上传时间",
        dataIndex: "upload_time",
        width: 200,
      },
      {
        title: "样本",
        dataIndex: "file_name",
        width: 250,
      },
      {
        title: "大小",
        dataIndex: "file_size",
        width: 150,
      },
      {
        title: "风险值",
        dataIndex: "risk_value",
        width: 100,
        customRender: ({ text, record }) => {
          if (record.auto_status === AutoStatus.AutoStatusOK) {
            return text;
          }
          return "-";
        },
      },
      {
        title: "处理",
        width: 100,
        dataIndex: "is_compress",
        customRender: ({ record, text }) =>
          createVNode(ViewReportTenant, {
            auto_status: record.auto_status,
            is_compress: text,
            sample_id: record.id,
            sample_name: record.file_name,
            expert_status: record.expert_status,
          }),
      },
    ];

    // 请求授权表格数据
    watchEffect(async () => {
      const { items } = await getUploadData();
      sample_list.value = items;
    });
    return () => (
      <>
        <div class={classes.header}>恶意样本TOP5</div>
        <Table
          row-class-name={(_record: any, index: number) =>
            index % 2 === 0 ? classes.tableStriped : null
          }
          loading={resLoading.value}
          ref="tableRef"
          columns={columns}
          rowKey="host_id"
          class="singleTable"
          dataSource={sample_list.value}
          pagination={false}
        />
      </>
    );
  },
});
