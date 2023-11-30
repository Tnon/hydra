<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-05 22:14:56
-->
<template>
  <div class="container">
    <div class="header">
      <!-- 左侧折叠图标 start -->
      <fold-icon v-model:fold="fold" />
      <!-- 左侧折叠图标 end -->

      <!-- 头部 start -->
      <date-round v-model:interval="interval" />
      <!-- 头部 end -->
    </div>

    <div class="content">
      <!-- 左侧树 start -->
      <search-tree v-model:tenantId="tenant_id" class="searchTree" v-show="fold" />
      <!-- 左侧树 end -->

      <!-- 右侧内容 start -->
      <div class="ropt">
        <a-row class="world" :gutter="10">
          <a-col span="15">
            <!-- 世界地图 start -->
            <world-map :filters="filters" :fold="fold"/>
            <!-- 世界地图 end -->
          </a-col>

          <a-col span="9">
            <!--外联目标类型统计 start -->
            <sample-cluster
              :filters="filters"
              :getDataFun="getOutreachRiskType"
              title="外联目标类型统计"
            />
            <!-- 外联目标类型统计 end -->

            <!-- 外联目标国家统计 start -->
            <sample-cluster
              :filters="filters"
              :getDataFun="getOutreachCountry"
              title="外联目标国家统计"
            />
            <!-- 外联目标国家统计 end -->
          </a-col>
        </a-row>
        <!-- 外联目标 start -->
        <outreach-target class="outreachTarget" :filters="filters" :getDataFun="getOutreachList" />
        <!-- 外联目标 end -->
      </div>

      <!-- 右侧内容 end -->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, toRefs, reactive, ref } from 'vue';
  import { RANGDATE, TENANTALL } from '@/enums/statusEnum';
  import { dateRound } from '@hydra/components/dateRound';
  import searchTree from '@/components/search-tree';
  import { foldIcon } from '@/components/foldIcon';
  import { sampleCluster } from '@/components/sampleCluster';
  import { outreachTarget } from '@/components/outreachTarget';
  import { worldMap } from './cmts/worldMap';
  import {
    getOutreachRiskType,
    getOutreachCountry,
    getOutreachList,
  } from '@/api/platform/overview';

  export default defineComponent({
    components: {
      searchTree,
      dateRound,
      sampleCluster,
      outreachTarget,
      worldMap,
      foldIcon,
    },
    setup() {
      //条件
      const filters = reactive({
        //周期
        interval: RANGDATE.DAY,
        //租户id
        tenant_id: TENANTALL.ALL,
      });
      // 树的折叠,默认显示
      const fold = ref(true);
      return {
        ...toRefs(filters),
        filters,
        fold,
        getOutreachRiskType,
        getOutreachCountry,
        getOutreachList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .container {
    height: calc(100vh - 60px);
    padding: 16px 20px;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    // background: url('@/assets/images/bgc.png') repeat center/100% 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow: auto;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .content {
      display: flex;
    }
    .searchTree {
      flex: 320px 0 0;
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.08);
    }
    .ropt {
      flex: 1;
      .outreachTarget {
        :deep(.ant-table-tbody tr):hover > td {
          background: rgba(255, 255, 255, 0.08);
        }
        :deep(.ant-table-cell-row-hover) {
          background: rgba(255, 255, 255, 0.08);
        }
      }
    }
    :deep(.ant-select-selection-item) {
      line-height: 24px;
    }
    :deep(.ant-select-selector) {
      height: 24px;
      width: 120px;
    }
  }
</style>
