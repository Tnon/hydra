/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-27 18:30:51
 * @LastEditTime: 2022-05-30 11:58:53
 */
import { useModal } from '@/hooks/use-modal';
import { TableColumn } from '@/types/tableColumn';
import { createVNode } from 'vue';
import { Router } from 'vue-router';
import { uploadReport } from './upload';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
export const useColumns = (router: Router, refreshTable): TableColumn[] => [
  {
    title: '租户',
    dataIndex: 'tenant',
    width: 150,
  },
  {
    title: '样本',
    dataIndex: 'sample_name',
    width: 200,
  },
  {
    title: 'SHA256',
    dataIndex: 'check_sum',
    width: 550,
  },
  {
    title: '上传时间',
    dataIndex: 'upload_time',
    width: 200,
  },
  {
    title: '风险值',
    dataIndex: 'risk_value',
    width: 150,
  },
  {
    title: '分析',
    dataIndex: 'status',
    width: 150,
    customRender: ({ text, record }) =>
      createVNode(uploadReport, { text, id: record.id, refreshTable }),
  },
  {
    title: '处理',
    dataIndex: '',
    width: 250,
    customRender: ({ record }) => {
      return createVNode('span', null, [
        createVNode(
          'span',
          {
            style: {
              cursor: 'pointer',
              color: '#267EE5',
            },
            onClick: () => {
              router.push({
                name: 'analysts-report',
                query: {
                  id: record.id,
                  name: record.sample_name,
                },
              });
            },
          },
          '查看报告',
        ),
        createVNode(
          'span',
          {
            style: {
              cursor: 'pointer',
              color: '#267EE5',
              marginLeft: '40px',
            },
            onClick: () => {
              useModal(
                {
                  title: '提示',
                  wrapClassName: 'noticeModal',
                  handleOk: () => {
                    const link = document.createElement('a');
                    link.href = record.sample_path;
                    link.click();
                  },
                },
                createVNode('span', null, [
                  createVNode(ExclamationCircleFilled, {
                    style: {
                      color: '#faad14',
                      fontSize: '18px',
                      marginRight: '10px',
                    },
                  }),
                  '样本可能具有风险，请谨慎下载，解压密码：QueRenFengXian@',
                ]),
              );
            },
          },
          '下载样本',
        ),
      ]);
    },
  },
];
