<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-12-15 14:36:19
 * @LastEditTime: 2022-05-19 14:12:01
-->
<template>
  <div class="content">
    <!-- 左侧 start -->
    <div class="lopt">
      <!-- 头部 start -->
      <date-round v-model:interval="interval" />
      <!-- 头部 end -->
      <!-- 样本概览 start -->
      <statics :interval="interval" />
      <!-- 样本概览 end -->

      <!-- 样本威胁趋势 start -->
      <sample-threat :interval="interval" />
      <!-- 样本威胁趋势 end -->

      <!-- 样本聚类 start -->
      <sample-cluster :interval="interval" />
      <!-- 样本聚类 end -->

      <!-- 模块数值统计 start -->
      <data-static :interval="interval" />
      <!-- 模块数值统计 end -->

      <!-- 最近上传 start -->
      <upload-top />
      <!-- 最近上传 end -->
    </div>

    <!-- 左侧 end -->
    <!-- 右侧 start -->
    <div class="ropt">
      <!-- 统计 start -->
      <total-view
        :testing_num="testing_num"
        :expert_analysis_num="expert_analysis_num"
        :test_complete_num="test_complete_num"
      />
      <!-- 统计 end -->
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
    <!-- 右侧 end -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
  import { statics } from './src/statics';
  import { uploadTop } from './src/uploadTop';
  import { totalView } from './src/totalView';
  import { echartPie } from './src/echartPie';
  import { sampleThreat } from './src/sampleThreat';
  import { sampleCluster } from './src/sampleCluster';
  import { dataStatic } from './src/dataStatic';
  import { dateRound } from '@hydra/components/dateRound';
  import { RANGDATE } from '@/enums/statusEnum';
  import { getLocalTotalViewData } from '@/api/overview';
  export default defineComponent({
    components: {
      statics,
      uploadTop,
      totalView,
      echartPie,
      sampleThreat,
      sampleCluster,
      dataStatic,
      dateRound,
    },
    setup() {
      //条件
      const filters = reactive({
        //周期
        interval: RANGDATE.DAY,
      });
      //右侧数据结构体
      const staticState = reactive({
        testing_num: 0, // 样本分析中
        expert_analysis_num: 0, // 专家分析
        test_complete_num: 0, // 已检测
        expert_analyze_total: 0, // 专家授权总数
        expert_analyze_used: 0, // 已用专家检测数
        expert_analyze_percentage: '0%', // 专家检测百分比
        auto_used_day: 0, // 已用自动检测天数
        auto_total_day: 0, // 自动检测总天数
        auto_percentage: '0%', // 自动检测百分比
      });
      watchEffect(async () => {
        const res = await getLocalTotalViewData();
        Object.assign(staticState, res);
      });
      return {
        ...toRefs(filters),
        ...toRefs(staticState),
        filters,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    margin: 20px;
    display: flex;
    .lopt {
      flex: 1;
    }
    .ropt {
      flex: 200px 0 0;
      margin-left: 20px;
    }
  }
  .pikerBoder {
    border: 1px solid #d9d9d9;
    transition: all 0.4s;
    padding-left: 20px;
    &:hover {
      border-color: #40a9ff;
    }
    :deep(.ant-picker-suffix) {
      position: absolute;
      left: -10px;
    }
  }
</style>
