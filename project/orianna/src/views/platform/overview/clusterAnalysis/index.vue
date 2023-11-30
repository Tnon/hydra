<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-05 22:14:47
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

        <!-- 两栏布局 start -->
        <div class="twoColumn">
          <!-- 威胁情报总数：自有情报+第三方情报 start -->
          <threat-total :thirdpartySon="thirdparty" backgroundColor="black"/>
          <!-- 威胁情报总数：自有情报+第三方情报 end -->

          <!-- 威胁统计 start -->
          <threat-info :filters="filters" class="fixedWidth"/>
          <!-- 威胁统计 end -->
        </div>
        <!-- 两栏布局 end -->

        <!-- 两栏布局 start -->
        <div class="twoColumn">
          <!-- 静态类情报 start -->
          <static-or-dynamic type="static" v-model:thirdparty="thirdparty" backgroundColor="black"/>
          <!-- 静态类情报 end -->

          <!-- 动态类情报 start -->
          <static-or-dynamic type="dynimic" backgroundColor="black" class="fixedWidth"/>
          <!-- 动态类情报 end -->
        </div>
        <!-- 两栏布局 end -->


        <!-- 样本场景分类 start -->
        <sample-classify :filters="filters" />
        <!-- 样本场景分类 end -->

        <!-- 样本聚类 start -->
        <sample-cluster :filters="filters" />
        <!-- 样本聚类 end -->
        
        <!-- 关键字提取聚类 start -->
        <keywords-cluster :filters="filters" :requsteFunc="requestAdminKeywordsList" />
        <!-- 关键字提取聚类 end -->
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
  import { sampleCluster } from './components/sampleCluster';
  import { sampleClassify } from './components/sampleClassify';
  import { threatInfo } from './components/threatInfo';

  import threatTotal from '@/components/threatTotal/index.vue';
  import staticOrDynamic from '@/components/staticOrDynamic/index.vue';
  import keywordsCluster from '@/components/keywordsCluster/index.vue';
  import { requestAdminKeywordsList } from '@/api/platform/overview';


  export default defineComponent({
    components: {
      searchTree,
      dateRound,
      sampleCluster,
      sampleClassify,
      threatInfo,
      foldIcon,

      threatTotal,
      staticOrDynamic,
      keywordsCluster,
    },
    setup() {
      //条件
      const filters = reactive({
        //周期
        interval: RANGDATE.DAY,
        //租户id
        tenant_id: TENANTALL.ALL,
      });
      // 第三方情报，接收子组件传来的值
      const thirdparty = ref(0);

      // 树的折叠,默认显示
      const fold = ref(true);
      return {
        ...toRefs(filters),
        filters,
        fold,
        thirdparty,
        requestAdminKeywordsList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .container {
    // height: calc(100vh - 60px);
    padding: 16px 20px;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    // background: url('@/assets/images/bgc.png') no-repeat center/100% 100%;
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
      height: calc(100vh - 136px);
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.08);
      // height: 100vh;
      // overflow-y: scroll;
    }
    .ropt {
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
  // .searchTree::-webkit-scrollbar {
  //   z-index: 50;
  //   width: 5px;
  //   height: 3px;
  //   background-color: rgba(0, 0, 0);
  // }
  // .searchTree::-webkit-scrollbar-thumb {
  //   /*滚动条里面小方块*/
  //   -webkit-border-radius: 5px;
  //   -moz-border-radius: 5px;
  //   border-radius: 5px;
  //   background-color: rgba(0, 0, 0);
  //   transition: all 0.2s;
  //   height: 20px !important;
  // }
  // .searchTree::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/

  //   background-color: rgba(0, 0, 0);
  // }
</style>
