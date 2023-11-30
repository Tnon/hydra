/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-26 20:42:01
 * @LastEditTime: 2022-04-22 16:57:55
 */
import { reactive, unref, computed } from 'vue';
import { useSelectAll as useSelectAllStore } from '@/store/modules';
import { isString } from '@hydra/utils/tools';
import { DisbKeys, TableRowSelection } from '../types';

const selectAllStore = useSelectAllStore();
const isSelectAll = computed(() => selectAllStore.isSelectAll);

//获取取消选择的ids
const excludeHostIds: any = computed(() => selectAllStore.exclude);
const state = reactive<TableRowSelection>({
  rowSelection: undefined,
});
export const useRowSelection = (
  rowkey: string | ((record: any) => string),
  isCheck: boolean,
  disabledKeys: DisbKeys[],
): any => {
  //先初始化 防止自己选完，再全选时候 重复存储
  selectAllStore.InitExclude();
  selectAllStore.setIselectAll(false);
  if (state.rowSelection && !isCheck) {
    state.rowSelection!.selectedRowKeys = [];
  }
  if (isCheck) {
    state.rowSelection = {
      columnWidth: 60,
      preserveSelectedRowKeys: true,
      selectedRowKeys: [],
      onChange: (selectedRowKeys) => {
        state.rowSelection!.selectedRowKeys = selectedRowKeys;
      },
      onSelect: (record, selected) => {
        const key = isString(rowkey) ? record[rowkey] : rowkey(record);
        if (unref(isSelectAll)) {
          if (selected) {
            selectAllStore.DelExclude(key);
          } else {
            selectAllStore.AddExclude([key]);
          }
        }
      },
      onSelectAll: (selected, _, changeRows) => {
        let hostIds: any;
        if (isString(rowkey)) {
          hostIds = changeRows.map((item) => item[rowkey]);
        } else {
          hostIds = changeRows.map((item) => rowkey(item));
        }
        if (unref(isSelectAll)) {
          if (selected) {
            hostIds.forEach((ele) => {
              selectAllStore.DelExclude(ele);
            });
          } else {
            selectAllStore.AddExclude(hostIds);
          }
        }
      },
      getCheckboxProps: (record): any => {
        return { disabled: rowCanSelect(record, disabledKeys) };
      },
    };
  } else {
    state.rowSelection = undefined;
  }

  return state.rowSelection;
};

export const initRowSelection = () => {
  selectAllStore.setIsCheck(false);
  selectAllStore.setIselectAll(false);
  selectAllStore.InitExclude();
  if (state.rowSelection) {
    state.rowSelection!.selectedRowKeys = [];
  }
};

const rowCanSelect = (record, disabledKeys: DisbKeys[]): boolean => {
  let disabled = false;
  disabledKeys.forEach((ele) => {
    if (record[ele.key] !== undefined && record[ele.key] === ele.value) {
      disabled = true;
    }
  });
  return disabled;
};
export const useSelectAll = (
  items: any[],
  rowkey: string | ((record: any) => string),
  disabledKeys: DisbKeys[],
) => {
  items.forEach((record) => {
    const key = isString(rowkey) ? record[rowkey] : rowkey(record);
    if (unref(excludeHostIds).indexOf(key) < 0 && !rowCanSelect(record, disabledKeys)) {
      state.rowSelection!.selectedRowKeys.push(key);
    }
  });
};
