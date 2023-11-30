
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
import { Button } from 'ant-design-vue';
import { exportReportExcel } from '@hydra/utils/tools';

export const useColumns = (): TableColumn[] => [
  {
    title: '报表文件名',
    dataIndex: 'filename',
    key: 'filename',
    ellipsis: true,
  },
  {
    title: '导出时间',
    dataIndex: 'create_at',
    key: 'create_at',
  },
  {
    title: '生成状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    customRender: ({ text, record }) => 
      createVNode(
        'span', 
        {
          style: {
            color: record.status === 1 ? 'orange' : record.status === 2 ? '#34A753' : '#f50'
          }
        }, 
        record.status === 1 ? '生成中' : record.status === 2 ? '已生成' : '生成失败',
      ),
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    width: 100,
    customRender: ({ text, record }) =>
      createVNode(
        Button,
        {
          type: 'link',
          disabled: record.status !== 2,
          onClick: () => {
            exportReportExcel(record.url, record.filename);
          }
        }, 
        () => '下载',
        // 'span',
        // {},
        // [
        //   createVNode(
        //     Button,
        //     {
        //       type: 'link',
        //       disabled: record.status !== 2,
        //       onClick: () => {
        //         // if (event.target !== event.currentTarget) return;
        //         // event.stopPropagation();
        //         exportReportExcel(record.url, record.filename);
        //       }
        //     }, 
        //     '下载',
        //   )
        // ],
      ),
  },
];
