/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-15 15:01:05
 * @LastEditTime: 2022-04-20 15:25:27
 */
import { ViewReportTenant } from "@hydra/components/ViewReportTenant";
import { FILETYPE } from "@/enums/fileType";
import { AutoStatus, RiskType } from "@/enums/statusEnum";
import { TableColumn } from "@/types/tableColumn";
import { createVNode } from "vue";
import { Router } from "vue-router";
import { expertStatus } from "../cmts/expertStatus";

export const useColumns = (router: Router, refreshTable): TableColumn[] => [
  {
    title: "文件名",
    dataIndex: "file_name",
    width: 250,
  },
  {
    title: "文件类型",
    dataIndex: "file_type",
    width: 100,
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
    width: 100,
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
    width: 120,
    customRender: ({ text, record }) => {
      if (record.auto_status === AutoStatus.AutoStatusOK) {
        return RiskType[text];
      }
      return "-";
    },
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
    dataIndex: "is_compress",
    width: 250,
    customRender: ({ record, text }) =>
      createVNode("span", null, [
        createVNode(expertStatus, {
          style: {
            width: "100px",
            display: "inline-block",
          },
          status: record.expert_status,
          auto_status: record.auto_status,
          id: record.id,
          is_compress: text,
          refreshTable,
        }),
        createVNode(ViewReportTenant, {
          auto_status: record.auto_status,
          is_compress: text,
          sample_id: record.id,
          sample_name: record.file_name,
          expert_status: record.expert_status,
        }),
      ]),
  },
];
