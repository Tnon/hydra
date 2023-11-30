<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-06 10:36:24
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <div class="header">
      <!-- 本地沙箱暂时不做此功能 -->
      <!-- 左侧折叠图标 start -->
      <!-- <fold-icon v-model:fold="fold" /> -->
      <!-- 左侧折叠图标 end -->

      <!-- 周期 start -->
      <date-round v-model:interval="interval" />
      <!-- 周期 end -->
    </div>
    <!-- 头部 start -->

    <div class="content">
      <!-- 本地沙箱暂时不做此功能 -->
      <!-- 左侧树 start -->
      <!-- <search-tree v-model:tenantId="tenant_id" requester="tenant" class="searchTree" v-show="fold" /> -->
      <!-- 左侧树 end -->

      <div class="right">
        <div class="top">
          <a-row class="world" :gutter="10">
            <a-col span="15">
              <!-- 世界地图 start -->
              <!-- :fold="fold" -->
              <world-map :filters="filters"/>
              <!-- 世界地图 end -->
            </a-col>

            <a-col span="9">
              <!-- 样本聚类 start -->
              <sample-cluster
                :filters="filters"
                :getDataFun="getTenantOutreachRiskType"
                title="外联目标类型统计"
              />
              <!-- 样本聚类 end -->
              <!-- 样本聚类 start -->
              <sample-cluster
                :filters="filters"
                :getDataFun="getTenantOutreachCountry"
                title="外联目标国家统计"
              />
              <!-- 样本聚类 end -->
            </a-col>
          </a-row>
        </div>
        <div class="bottom">
          <!-- 外联目标 start -->
          <outreach-target
            class="outreachTarget"
            :filters="filters"
            :getDataFun="getTenantOutreachList"
          />
          <!-- 外联目标 end -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, toRefs, reactive, ref } from 'vue';
  import { RANGDATE, TENANTALL } from '@/enums/statusEnum';
  import { dateRound } from '@hydra/components/dateRound';
  import { sampleCluster } from '@/components/sampleCluster';
  import { outreachTarget } from '@/components/outreachTarget';
  import { worldMap } from './cmts/worldMap';
  import {
    getTenantOutreachRiskType,
    getTenantOutreachCountry,
    getTenantOutreachList,
  } from '@/api/overview';

  // import { foldIcon } from '@/components/foldIcon';
  // import searchTree from '@/components/search-tree';

  export default defineComponent({
    components: {
      dateRound,
      sampleCluster,
      outreachTarget,
      worldMap,

      // foldIcon,
      // searchTree,
    },
    setup() {
      //条件
      const filters = reactive({
        //周期
        interval: RANGDATE.DAY,
        tenant_id: TENANTALL.ALL,
      });
      // 树的折叠,默认显示
      const fold = ref(true);

      return {
        ...toRefs(filters),
        filters,
        fold,
        getTenantOutreachCountry,
        getTenantOutreachRiskType,
        getTenantOutreachList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .container {
    height: calc(100vh - 60px);
    margin-left: 30px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    // background: url('@/assets/images/bgc.png') no-repeat center/100% 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow: auto;

    .header {
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      padding: 10px 0;
    }
    .content {
      display: flex;
    }

    .searchTree {
      flex: 0 0 320px;
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.08);
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      // margin-top: 20px;
      .bottom {
        .outreachTarget {
          :deep(.ant-table-tbody tr):hover > td {
            background: rgba(255, 255, 255, 0.08);
          }
          :deep(.ant-table-cell-row-hover) {
            background: rgba(255, 255, 255, 0.08);
          }
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
