/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-12-15 16:59:25
 */
import { ref } from 'vue';
import { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination';
export interface PageOption extends Partial<PaginationProps> {
  current?: number;
  pageSize?: number;
  total?: number;
  pageSizeOptions?: string[]; // 指定每页可以显示多少条
  showSizeChanger?: boolean; // 显示可改变每页数量
  showQuickJumper?: boolean; // 是否显示跳转
  showTotal?: (total: number) => number; // 显示总数
  onChange?: (current, pageSize) => any; // 页码改变
  onShowSizeChange?: (current, pageSize) => any; // pageSize变化
  pageChange?: (current, pageSize) => any; // 页码或pageSize变化触发
  [key: string]: any;
}

export function usePages(pageOptions?: PageOption) {
  // 分页配置参数
  const pageOption = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showQuickJumper: true,
    showSizeChanger: true, // 显示可改变每页数量
    showTotal: (total) => '共' + total + '条', // 显示总数
    onChange: (current, pageSize) => pageOptions?.pageChange?.(current, pageSize),
    onShowSizeChange: (current, pageSize) => pageOptions?.pageChange?.(current, pageSize),
    ...pageOptions,
  });
  return pageOption;
}
