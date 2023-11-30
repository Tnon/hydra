/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-25 20:33:19
 * @LastEditTime: 2022-05-30 11:51:32
 */
import { ViewReport } from "@hydra/components/ViewReport";
import { FILETYPE } from "@/enums/fileType";
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
import { RiskType } from "@/enums/statusEnum";
import { detectionEngine } from '@hydra/components/detectionEngine'
export const useColumns = (): TableColumn[] => [
  {
    title: "租户",
    dataIndex: "tenant",
    width: 150,
  },
  {
    title: "文件名",
    dataIndex: "file_name",
    width: 250,
  },
  {
    title: "检测引擎",
    dataIndex: "detection_engine",
    width: 150,
    customRender: ({ text }) => text ? createVNode(detectionEngine, { status: text }) : '-'
  },
  {
    title: 'MD5',
    dataIndex: "md5",
    width: 250,
    customRender: ({ text }) => text || '-'
  },
  {
    title: "文件类型",
    dataIndex: "file_type",
    width: 150,
    customRender: ({ text }) => FILETYPE["file-" + text],
  },
  {
    title: "文件数",
    dataIndex: "file_num",
    width: 100,
  },
  {
    title: "系统环境",
    dataIndex: "os_version",
    width: 150,
    customRender: () => "win7 32位",
  },
  {
    title: "上传时间",
    dataIndex: "upload_time",
    width: 200,
  },
  {
    title: "风险类型",
    dataIndex: "risk_type",
    width: 150,
    customRender: ({ text }) => RiskType[text],
  },
  {
    title: "风险值",
    dataIndex: "risk_value",
    width: 100,
  },
  {
    title: "处理",
    width: 100,
    dataIndex: "is_compress",
    customRender: ({ text, record }) =>
      createVNode(ViewReport, {
        sample_id: record.id,
        is_compress: text,
        sampleName: record.file_name,
      }),
  },
];
