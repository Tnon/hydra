<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-04 00:19:51
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <div class="header">
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

      <!-- 右侧数据展示区域 start -->
      <div class="rightArea">

        <div class="twoColumn">
          <!-- 威胁情报总数：自有情报+第三方情报 start -->
          <threat-total :thirdpartySon="thirdparty" backgroundColor="black"/>
          <!-- 威胁情报总数：自有情报+第三方情报 end -->

          <!-- 威胁统计 start -->
          <threat-info :filters="filters" class="fixedWidth"/>
          <!-- 威胁统计 end -->
        </div>

        <div class="twoColumn">
          <!-- 静态类情报 start -->
          <static-or-dynamic type="static" v-model:thirdparty="thirdparty" backgroundColor="black"/>
          <!-- 静态类情报 end -->

          <!-- 动态类情报 start -->
          <static-or-dynamic type="dynimic" backgroundColor="black" class="fixedWidth"/>
          <!-- 动态类情报 end -->
        </div>


        <!-- 样本场景分类 start -->
        <sample-classify :filters="filters" />
        <!-- 样本场景分类 end -->

        <!-- 样本聚类 start -->
        <sample-cluster :filters="filters" />
        <!-- 样本聚类 end -->

        <!-- 关键字提取聚类 start -->
        <keywords-cluster :filters="filters" :requsteFunc="requestTenantKeywordsList"/>
        <!-- 关键字提取聚类 end -->

      </div>
      <!-- 右侧数据展示区域 start -->

    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, toRefs, reactive, ref } from 'vue';
  import { RANGDATE, TENANTALL } from '@/enums/statusEnum';
  import { dateRound } from '@hydra/components/dateRound';
  import { sampleCluster } from './components/sampleCluster';
  import { sampleClassify } from './components/sampleClassify';
  import { threatInfo } from './components/threatInfo';

  import { foldIcon } from '@/components/foldIcon';
  import searchTree from '@/components/search-tree';
  import threatTotal from '@/components/threatTotal/index.vue';
  import staticOrDynamic from '@/components/staticOrDynamic/index.vue';
  import keywordsCluster from '@/components/keywordsCluster/index.vue';
  import { requestTenantKeywordsList } from '@/api/tenant/overview';

  export default defineComponent({
    components: {
      dateRound,
      sampleCluster,
      sampleClassify,
      threatInfo,

      foldIcon,
      searchTree,
      threatTotal,
      staticOrDynamic,
      keywordsCluster,
    },
    setup() {
      //条件
      const filters = reactive({
        //周期
        interval: RANGDATE.DAY,
        tenant_id: TENANTALL.ALL,
      });
      // 第三方情报，接收子组件传来的值
      const thirdparty = ref(0);

      // 树的折叠,默认显示
      const fold = ref(true);
      return {
        ...toRefs(filters),
        filters,
        thirdparty,
        fold,
        requestTenantKeywordsList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .container {
    // height: calc(100vh - 60px);
    margin-left: 30px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    // background: url('@/assets/images/bgc.png') no-repeat center/100% 100%;
    background: rgba(0, 0, 0, 0.9);
    background-color: black;
    // overflow: auto;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }
    .content {
      display: flex;
    }

    .searchTree {
      flex: 0 0 320px;
      height: calc(100vh - 136px);
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.08);
    }

    .rightArea {
      flex: 1;
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
      .twoColumn {
        display: flex;

        .fixedWidth {
          flex: 0 0 35%;
          min-width: 400px;
          margin-left: 10px;
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
