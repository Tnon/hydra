<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-15 19:35:50
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <!-- <date-round class="headerb" v-model:interval="interval" /> -->
    <div class="headerb">

      <!-- 左侧折叠图标 start -->
      <fold-icon v-model:fold="fold" />
      <!-- 左侧折叠图标 end -->

      <!-- 周期 start -->
      <date-round v-model:interval="interval" />
      <!-- 周期 end -->
    </div>
    <!-- 头部 start -->

    <div class="content">

      <!-- 左侧树 start -->
      <search-tree v-model:tenantId="tenant_id" requester="tenant" class="searchTree" v-show="fold" />
      <!-- 左侧树 end -->

      <!-- 左侧内容 start -->
      <div class="lopt">
        <!-- 统计 start -->
        <total-view
          :testing_num="testing_num"
          :expert_analysis_num="expert_analysis_num"
          :test_complete_num="test_complete_num"
        />
        <!-- 统计 end -->

        <!-- 样本概览 start -->
        <total-statics :filters="filters" />
        <!-- 样本概览 end -->

        <div class="twoColumns">
          <!-- 样本威胁趋势 start -->
          <sample-threat :filters="filters" :fold="fold" class="trend"/>
          <!-- 样本威胁趋势 end -->

          <!-- 最新威胁全网通告 start -->
          <threat-annunciate class="annunciate"/>
          <!-- 最新威胁全网通告 end -->
        </div>

        <!-- 实时威胁告警 start -->
        <real-alarm :tenant_id="filters.tenant_id" class="realAlarm" />
        <!-- 实时威胁告警 end -->

        <!-- 贡献值统计 start -->
        <contribution-static :filters="filters" />
        <!-- 贡献值统计 end -->
      </div>
      <!-- 左侧内容 end -->

      <!-- 右侧内容 start -->
      <div class="ropt">
        <!-- 比例 start -->
        <echart-pie
          :expert_analyze_total="expert_analyze_total"
          :expert_analyze_used="expert_analyze_used"
          :expert_analyze_percentage="expert_analyze_percentage"
          :auto_used_day="auto_used_day"
          :auto_total_day="auto_total_day"
          :auto_percentage="auto_percentage"
        />
        <!-- 比例 end -->
      </div>
      <!-- 右侧内容 end -->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, toRefs, reactive, ref, watchEffect } from 'vue';
  import { RANGDATE, TENANTALL } from '@/enums/statusEnum';
  import { getTenantTotalViewData } from '@/api/tenant/overview';
  import { dateRound } from '@hydra/components/dateRound';
  import { totalView } from './components/totalView';
  import { totalStatics } from './components/totalStatics';
  import { sampleThreat } from './components/sampleThreat';
  import { realAlarm } from './components/realAlarm';
  import { contributionStatic } from './components/contributionStatic';
  import { echartPie } from './components/echartPie';
  import { Layout } from 'ant-design-vue';
  import { foldIcon } from '@/components/foldIcon';
  import searchTree from '@/components/search-tree';
  import threatAnnunciate from '@/components/threatAnnunciate/index.vue';

  export default defineComponent({
    components: {
      dateRound,
      totalView,
      totalStatics,
      sampleThreat,
      contributionStatic,
      realAlarm,
      echartPie,
      [Layout.Sider.name]: Layout.Sider,
      foldIcon,
      searchTree,
      threatAnnunciate,
    },
    setup() {
      //条件
      const filters = reactive({
        //周期
        interval: RANGDATE.DAY,

        //租户id
        tenant_id: TENANTALL.ALL,
      });
      // 定义统计和比例
      const staticState = reactive({
        testing_num: 0, // 样本分析中
        expert_analysis_num: 0, // 专家分析
        test_complete_num: 0, // 已检测

        expert_analyze_total: 0, // 专家授权总数
        expert_analyze_used: 0, // 已用专家检测数
        expert_analyze_percentage: 0, // 专家检测百分比
        auto_used_day: 0, // 已用自动检测天数
        auto_total_day: 0, // 自动检测总天数
        auto_percentage: 0, // 自动检测百分比
      });

      const fold = ref(true);

      watchEffect(async () => {
        const res = await getTenantTotalViewData();
        Object.assign(staticState, res);
      });
      return {
        ...toRefs(filters),
        ...toRefs(staticState),
        filters,
        fold,
      };
    },
  });
</script>
<style lang="less" scoped>
  .container {
    margin-left: 30px;
    padding: 16px 20px;
    // display: flex;
    // flex-direction: column;
    background: rgba(0, 0, 0, 0.9);
    overflow: auto;
    .headerb {
      padding: 10px 0;
    }
    .content {
      display: flex;
      height: calc(100vh - 136px);
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

      .searchTree {
        flex: 0 0 320px;
        margin-right: 20px;
        background-color: rgba(255, 255, 255, 0.08);
      }
      .lopt {
        flex: 1;
        height: calc(100vh - 136px);
        overflow: auto;

        // 改变滚动栏的样式
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

        .twoColumns {
          display: flex;
          width: 100%;

          .trend {
            flex: 1;
          }
          .annunciate {
            flex: 1;
            margin-left: 10px;
            :deep(.ant-table-tbody tr):hover > td {
              background: rgba(255, 255, 255, 0.08);
            }
            :deep(.ant-table-cell-row-hover) {
              background: rgba(255, 255, 255, 0.08);
            }
          }
        }
        .realAlarm {
          width: 100%;
          overflow: auto;
          :deep(.ant-table-tbody tr):hover > td {
            background: rgba(255, 255, 255, 0.08);
          }
          :deep(.ant-table-cell-row-hover) {
            background: rgba(255, 255, 255, 0.08);
          }
        }
      }

      .ropt {
        flex: 200px 0 0;
        margin-left: 20px;
      }
    }
    :deep(.ant-select-selection-item) {
      line-height: 24px;
    }
    :deep(.ant-select-selector) {
      height: 24px;
      width: 120px;
    }
    // 改变滚动栏的样式
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track-piece {
      background-color: rgba(255, 255, 255, 0.08);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
</style>
