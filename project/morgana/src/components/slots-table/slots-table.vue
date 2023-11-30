<template>
  <!-- <div> -->
  <!-- {{ rowSelection }} -->
  <!-- {{ disabledKeys }} -->
  <div class="tableContent">
    <a-table
      v-bind="{ ...$props, ...$attrs }"
      :loading="loading"
      :row-class-name="(_record, index) => (index % 2 === 0 ? 'table-striped' : null)"
      size="middle"
      :data-source="dataSource"
      :pagination="pageOption"
      @change="paginationChange"
      :rowSelection="rowSelection"
      :columns="columnsEllipsis"
    >
      <!--自定义slots start (title,footer....)-->
      <template v-for="(value, key) in $slots" #[key]="slotProps">
        <slot :name="key" v-bind="slotProps"></slot>
      </template>
      <!--自定义slots end (title,footer....)-->

      <!--自定义显示 slots start-->
      <template #bodyCell="{ record, column }">
        <template v-if="column.actions">
          <!--对表格的操作动作start-->
          <template v-for="(action, index) in column.actions" :key="index">
            <!-- switch启用状态 start-->
            <template v-if="action.type == 'switch'">
              <a-switch
                :checked="record[column.dataIndex] === 1"
                v-bind="action.props"
                @click="toogleEnable($event, record, action.func)"
              />
            </template>
            <!--switch启用状态 end-->

            <!--三个点操作符 start-->
            <template v-if="action.type === 'icon'">
              <a-popover
                v-if="!(action.disabled && action.disabled(record))"
                placement="leftTop"
                trigger="click"
                overlayClassName="popNoPad"
                destroyTooltipOnHide
              >
                <template #content>
                  <div v-for="item in action.actionList" :key="item.type">
                    <a-popconfirm
                      v-if="item.type === 'popconfirm'"
                      placement="leftTop"
                      overlayClassName="popHasPad"
                      @confirm="actionEvent(record, item.func)"
                    >
                      <template #title> 确认要删除吗？ </template>
                      <!-- 批量删除时候，不让删除   全局默认策略不让删除 -->
                      <a-button
                        v-if="!isCheck && !(item.disabled && item.disabled(record))"
                        class="noradiuBtn"
                        type="text"
                      >
                        {{ item.text }}
                      </a-button>
                    </a-popconfirm>
                    <a-button
                      v-else
                      class="noradiuBtn"
                      type="text"
                      @click="actionEvent(record, item.func)"
                    >
                      {{ item.text }}
                    </a-button>
                  </div>
                </template>
                <a-button type="text" class="iconBtn">
                  <EllipsisOutlined />
                </a-button>
              </a-popover>
              <a-button type="text" v-else disabled class="iconBtn">
                <EllipsisOutlined />
              </a-button>
            </template>
            <!--三个点操作符 end-->
          </template>
          <!--        对表格的操作动作end-->
        </template>
        <!--      非自定义渲染end-->
      </template>
      <!--    是否有自定义显示slots end-->
    </a-table>
    <!-- 全选 start -->
    <div class="selectAllTools" v-if="rowSelection && allowCheckAll">
      <a-button
        type="text"
        @click="selectAllRows(true)"
        class="checkAll btnBorder"
        :class="{ actived: isSelectAll }"
      >
        全部选择
      </a-button>
      <a-button type="text" @click="selectAllRows(false)" class="uncheckAll btnBorder">
        取消
      </a-button>
    </div>
    <!-- 全选 end -->
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    PropType,
    toRefs,
    computed,
    watch,
    unref,
    ref,
    onUnmounted,
    watchEffect,
  } from 'vue';
  import { Select, Table, Popconfirm, Popover, Button, Switch } from 'ant-design-vue';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { usePages } from '@hydra/hooks/use-pages';
  import { useRowSelection, initRowSelection, useSelectAll } from './hooks';
  import { pageOption, Props, ExtraFunc, DisbKeys, TableRowSelection } from './types';
  import { useSelectAll as useSelectAllStore } from '@/store/modules';
  import { TableColumn } from '@/types/tableColumn';
  export default defineComponent({
    name: 'SlotsTable',
    components: {
      [Table.name]: Table,
      [Select.name]: Select,
      [Popconfirm.name]: Popconfirm,
      [Popover.name]: Popover,
      [Button.name]: Button,
      [Switch.name]: Switch,
      EllipsisOutlined,
    },
    props: {
      columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => [],
      },
      customRow: {
        type: Function as PropType<(...args: any[]) => any>,
      },
      getListFunc: {
        // 获取列表数据函数API
        type: Function as PropType<(agms: tableParams<Arguments>) => any>,
        required: true,
      },
      getCanSelectFunc: {
        // 获取可选数量
        type: Function as PropType<(record: any) => any>,
      },
      isCheck: {
        type: Boolean,
        default: false,
      },
      allowCheckAll: {
        type: Boolean,
        default: false,
      },
      rowKey: {
        // 表格唯一字段
        type: [String, Function] as PropType<string | ((record: any) => string)>,
        required: true,
      },
      pageOption: {
        // 分页参数
        type: Object as PropType<pageOption>,
        default: () => ({}),
      },
      arguments: {
        type: Object as PropType<Arguments>,
        default: () => ({}),
      },
      extraFunc: {
        type: Object as PropType<ExtraFunc>,
        default: () => ({
          sortVsb: false,
          dragRow: false,
          dragCol: false,
        }),
      },
      totalNum: {
        type: Number,
        default: 0,
      },
      disabledKeys: {
        type: Array as PropType<DisbKeys[]>,
        default: () => [],
      },
    },
    setup(props: Props, { emit }) {
      const columnsEllipsis = ref<TableColumn[]>();
      watchEffect(() => {
        props.columns.forEach((ele) => {
          // if (ele.width && isNumber(ele.width)) {
          //   if (!ele.minWidth) {
          //     ele.minWidth = ele.width
          //   }
          //   if (ele.ellipsis) {
          //     ele.resizable = true
          //   }
          // }
          if (!ele.customRender) {
            ele.ellipsis = true;
            // ele.customRender = ({ text }) =>
            //   createVNode('div', { class: 'bigData' }, text)
          }
        });
        columnsEllipsis.value = props.columns;
      });

      //开启分页
      const pageOption = usePages();

      //表格动态选择列，初始化
      let dynaRowSelection = reactive<TableRowSelection>({
        rowSelection: undefined,
      });
      // 主机总数
      const totalCount = ref<number>(0);

      //表格数据源，行事件，分页，加载
      const state = reactive({
        dataSource: [], // 表格数据
        pageOption: Object.assign(pageOption.value, props.pageOption), // 表格分页
        loading: false, // 表格加载,
        field: undefined,
        order: undefined,
      });
      //表格刷新初始化
      const initTableData = () => {
        state.dataSource = [];
        emit('update:totalNum', undefined);
        state.pageOption.total = 0;
        state.pageOption.current = 1;
        state.pageOption.pageSize = 10;
      };

      //动态组件监听api变化，重绘表格
      watch(
        () => props.getListFunc,
        () => {
          initTableData();
          refreshTableData();
        },
      );
      const selectAllStore = useSelectAllStore();

      //获取全局是否全选
      const isSelectAll = computed(() => selectAllStore.isSelectAll);
      //其他刷新和表格一起刷新
      const refreshTablAndCunstom = (keepPage?: boolean) => {
        state.dataSource = [];
        refreshTableData(keepPage);
      };
      // 获取表格数据
      const refreshTableData = async (keepPage?: boolean, aru = {}) => {
        // state.dataSource = []
        if (!keepPage) {
          //初始化页数和当前页数量
          state.pageOption.current = 1;
          state.pageOption.pageSize = 10;
        }
        //表格入参
        const params: tableParams<any> = {
          page: {
            page_index: state.pageOption.current,
            page_size: state.pageOption.pageSize,
          },
          orderby: state.field ? state.order + '' + state.field : undefined,
          filter: {
            ...props.arguments,
            ...aru,
          },
        };
        //有选择框&&全选清空 当前选项
        if (props.isCheck && unref(isSelectAll)) {
          if (dynaRowSelection.rowSelection) {
            dynaRowSelection.rowSelection!.selectedRowKeys = [];
          }
        }
        //表格loading
        state.loading = true;

        //请求表格数据
        const { items, page_index, code, total } = await props.getListFunc(params).finally(() => {
          state.loading = false;
        });
        if (code) {
          return false;
        }
        //在这里做全选操作
        if (unref(isSelectAll)) {
          useSelectAll(items, props.rowKey, props.disabledKeys);
        }
        //更新分页
        Object.assign(state.pageOption, {
          current: ~~page_index,
          // pageSize: ~~page_size,
          total: ~~total,
        });
        //赋值
        state.dataSource = items || [];

        //获取可选择总数
        if (
          props.isCheck &&
          props.allowCheckAll &&
          props.disabledKeys.length &&
          unref(isSelectAll)
        ) {
          const { count } = await props.getCanSelectFunc!(props.arguments);
          totalCount.value = count ?? 0;
        } else {
          totalCount.value = total;
        }
        //有的表格需要条数总量，抛出总量
        if (props.totalNum !== undefined) {
          emit('update:totalNum', total);
        }
      };
      //请求表格数据
      refreshTableData();

      // 操作事件
      const actionEvent = async (record, func) => {
        // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
        await func({ record, props }, refreshTableData);
      };
      // 分页，排序，筛选
      const paginationChange = (pagination, filters, sorter) => {
        let { field, order } = sorter;
        field = order ? field : undefined;
        order = order === 'ascend' ? '+' : order === 'descend' ? '-' : undefined;
        state.pageOption = {
          ...state.pageOption,
          ...pagination,
        };
        state.field = field;
        state.order = order;
        refreshTableData(true, {
          ...filters,
        });
      };

      //监听外部传来的是否开启选择列
      watchEffect(() => {
        selectAllStore.setIsCheck(props.isCheck);
        dynaRowSelection.rowSelection = useRowSelection(
          props.rowKey,
          props.isCheck,
          props.disabledKeys,
        );
      });

      //全选和取消全选
      const selectAllRows = (type) => {
        //更新仓库是否全选
        selectAllStore.setIselectAll(type);
        //取消全选 初始化未选的  和  已选的
        selectAllStore.InitExclude();
        dynaRowSelection.rowSelection!.selectedRowKeys = [];
        //重绘表格，getcheckprops重绘
        refreshTableData(true);
      };
      //选择的最终数量

      //获取取消选择的ids
      const excludeHostIds: any = computed(() => selectAllStore.exclude);
      //最终选择条数（全选）
      const selectAllNumber = computed(() => {
        if (unref(isSelectAll)) {
          return unref(totalCount) - unref(excludeHostIds).length;
        } else {
          if (props.isCheck) {
            if (dynaRowSelection.rowSelection) {
              return dynaRowSelection.rowSelection!.selectedRowKeys.length;
            }
            return 0;
          }
          return 0;
        }
      });

      //处理switch的逻辑
      const toogleEnable = (event, record, func) => {
        func({ record, event }, refreshTableData);
      };

      onUnmounted(() => {
        initRowSelection();
      });
      return {
        ...toRefs(state),
        columnsEllipsis,
        ...toRefs(dynaRowSelection),
        actionEvent,
        refreshTableData,
        paginationChange,
        toogleEnable,
        selectAllRows,
        selectAllNumber,
        isSelectAll,
        excludeHostIds,
        refreshTablAndCunstom,
        totalCount,
      };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-table .ant-table-title) {
    display: flex;

    .ant-btn {
      margin-right: 10px;
    }
  }
  // ::v-deep(.ant-table-footer) {
  //   position: absolute;
  // }
  .actived {
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }
  .btnBorder {
    border: 1px solid #eee;
    margin-right: 15px;
  }
  .tableContent {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    .selectAllTools {
      position: absolute;
      bottom: 10px;
      left: 16px;
    }
  }
  .customPage {
    display: flex;
    padding: 8px;
    justify-content: end;
    background: #fff;
    .nextPage {
      margin: 0 16px;
    }
  }
  .tableContent :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
