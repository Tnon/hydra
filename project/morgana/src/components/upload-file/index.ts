/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-02-25 17:50:23
 */
import uploadFile from './index.vue';
export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: any;
  url?: string;
  preview?: string;
  originFileObj?: any;
  file: string | Blob;
  percent?: number;
}
export interface FileInfo {
  file: FileItem;
  name: string;
  fileList: FileItem[];
}
export default uploadFile;
