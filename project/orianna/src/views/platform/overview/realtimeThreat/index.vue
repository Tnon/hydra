<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-15 19:34:55
-->
<template>
  <div class="container">
    <div class="headerb">
      <!-- 左侧折叠图标 start -->
      <fold-icon v-model:fold="fold" />
      <!-- 左侧折叠图标 end -->

      <!-- 周期 start -->
      <date-round v-model:interval="interval" />
      <!-- 周期 end -->
    </div>

    <div class="content">
      <!-- 左侧树 start -->
      <search-tree v-model:tenantId="tenant_id" class="searchTree" v-show="fold" />
      <!-- 左侧树 end -->

      <!-- 右侧内容 start -->
      <div class="ropt">
        <!-- 样本概览 start -->
        <total-statics :filters="filters" />
        <!-- 样本概览 end -->

        <div class="twoColumns">
          <!-- 样本威胁趋势 start -->
          <sample-threat :filters="filters" :fold="fold"  class="trend"/>
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
  import { totalStatics } from './components/totalStatics';
  import { sampleThreat } from './components/sampleThreat';
  import { realAlarm } from './components/realAlarm';
  import { contributionStatic } from './components/contributionStatic';
  import threatAnnunciate from '@/components/threatAnnunciate/index.vue';

  export default defineComponent({
    components: {
      searchTree,
      dateRound,
      totalStatics,
      sampleThreat,
      contributionStatic,
      realAlarm,
      foldIcon,

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
      // 树的折叠,默认显示
      const fold = ref(true);
      return {
        ...toRefs(filters),
        filters,
        fold,
      };
    },
  });
</script>
<style lang="less" scoped>
  .container {
    padding: 16px 20px;
    margin-left: 30px;
    // background: url('@/assets/images/bgc.png') no-repeat center/100% 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow: auto;
    .headerb {
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      padding: 10px 0;
    }
    .content {
      display: flex;
    }
    .searchTree {
      flex: 320px 0 0;
      min-width: 320px;
      max-width: 320px;
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.08);
    }
    .ropt {
      flex: 1;
      height: calc(100vh - 136px);
      overflow: auto;
      // &::-webkit-scrollbar {
      //   width: 5px;
      // }
      // &::-webkit-scrollbar-track-piece {
      //   background-color: rgba(255, 255, 255, 0.08);
      //   border-radius: 10px;
      // }
      // &::-webkit-scrollbar-thumb {
      //   border-radius: 10px;
      //   background-color: rgba(255, 255, 255, 0.08);
      // }

      .twoColumns {
        display: flex;
        width: 100%;

        .trend {
          // flex: 1;
          width: 50%;
        }
        .annunciate {
          // flex: 1;
          width: 50%;
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
