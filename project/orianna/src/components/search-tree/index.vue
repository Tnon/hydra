<template>
  <div class="treeContainer">
    <!-- 头 start -->
    <div class="header">
      <!-- title start -->
      <div class="title">
        <span>被攻击单位统计</span>
      </div>
      <!-- title end -->
      <!-- 搜索框 start -->
      <input-search width="100%" v-model:value="searchValue" placeholder="租户名" class="input" />
      <!-- 搜索框 end -->
    </div>
    <!-- 头 end -->
    <!-- 全部 start -->
    <div class="all" @click="selectAll" :class="{ selected: selectedKeys[0] === TENANTALL.ALL }">
      全部威胁
    </div>
    <!-- 全部 end -->
    <!-- 提示 start -->
    <div class="tips">
      <span>全部租户</span>
      <span>恶意/可疑</span>
    </div>
    <!-- 提示 end -->
    <!-- 树 start -->
    <Tree
      class="tree"
      :selectedKeys="selectedKeys"
      blockNode
      @select="selectTree"
      :tree-data="treeData"
      :field-names="fieldNames"
    >
      <template #title="{ tenant_name, malicious_sample, suspicious_sample }">
        <div class="node">
          <template v-if="tenant_name.indexOf(searchValue) > -1">
            <component :is="searchResult(tenant_name)" />
            <span>{{ `${malicious_sample}/${suspicious_sample}` }}</span>
          </template>
        </div>
      </template>
    </Tree>
    <!-- 树 end -->
  </div>
</template>
<script lang="tsx">
  import { computed, defineComponent, ref } from 'vue';
  import { Tree } from 'ant-design-vue';
  import type { TreeProps } from 'ant-design-vue';
  import { InputSearch } from '@hydra/components/input-search';
  import { getSearchTreeData } from '@/api/platform/overview';
  import { getTenantSearchTree } from '@/api/tenant/overview/index';
  import { TENANTALL } from '@/enums/statusEnum';
  export default defineComponent({
    components: {
      Tree,
      InputSearch,
    },
    props: {
      tenantId: String,
      requester: {
        type: String,
        default: 'admin'
      },
    },
    setup(props, { emit }) {
      //搜索
      const searchValue = ref<string>('');
      // 自定义树字段
      const fieldNames: TreeProps['fieldNames'] = {
        key: 'tenant_id',
      };
      //选中的key
      // const selectedKeys = ref<Array<string | number>>([]);
      const selectedKeys = computed({
        get: () => props.tenantId!.split(','),
        set: (v) => emit('update:tenantId', v.join(',')),
      });
      //选中树
      const selectTree = (nodeIds: Array<string>, { selectedNodes }): void => {
        const { length } = selectedNodes;
        if (!length) {
          return;
        } else {
          selectedKeys.value = nodeIds;
        }
      };
      //选择全部
      const selectAll = () => {
        selectedKeys.value = ['0'];
      };
      //树数据
      const treeData = ref<TreeProps['treeData']>([]);

      // 请求树数据;管理员接口和租户接口要区分
      const getSearchTree = async () => {
        if (props.requester === 'admin') {
          const { items } = await getSearchTreeData();
          treeData.value = items;
        } else {
          const { items } = await getTenantSearchTree();
          treeData.value = items;
        }
        // treeData.value = items;
      };
      getSearchTree();

      // 搜索结果
      const searchResult = (tenant_name) => (
        <span>
          {tenant_name.substr(0, tenant_name.indexOf(searchValue.value))}
          <span style={{ color: '#267EE5' }}> {searchValue.value}</span>
          {tenant_name.substr(tenant_name.indexOf(searchValue.value) + searchValue.value.length)}
        </span>
      );
      return {
        searchValue,
        selectedKeys,
        selectTree,
        treeData,
        selectAll,
        searchResult,
        fieldNames,
        TENANTALL,
      };
    },
  });
</script>
<style lang="less" scoped>
  .treeContainer {
    flex: 1;
    :deep(.ant-tree-switcher) {
      display: none;
    }
    :deep(.tree) {
      height: calc(100vh - 370px);
      overflow: auto;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: rgba(255, 255, 255, 0.08);
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.08);
      }
    }
    .header {
      padding: 20px;
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 20px;
      }
      .input {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.4);
        &:hover {
          border-color: rgba(38, 126, 229, 0.3);
        }
        :deep(.ant-input) {
          background: transparent;
          color: #fff;
          &::placeholder {
            color: #464748;
          }
        }
      }
    }
    .all {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 400;
      color: #eee;
      cursor: pointer;
      &:hover {
        background: rgba(38, 126, 229, 0.3);
        color: #eee;
      }
      transition: all 0.3s;
    }
    .selected {
      background: @primary-color;
      color: #fff;
      &:hover {
        background: @primary-color;
      }
    }
    .tips {
      display: flex;
      padding: 0 20px;
      margin: 30px 0 8px 0;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.55);
    }
    .node {
      line-height: 44px;
      padding: 0px 16px;
      display: flex;
      justify-content: space-between;
    }
    :deep(.ant-tree) {
      background: transparent;
      color: #eee;
    }
    :deep(.ant-tree .ant-tree-node-content-wrapper) {
      min-height: unset;
      &:hover {
        background: rgba(38, 126, 229, 0.2) !important;
      }
    }
    :deep(.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected) {
      background: @primary-color !important;
    }
    :deep(.ant-tree-treenode) {
      padding: 0;
    }
  }
</style>
