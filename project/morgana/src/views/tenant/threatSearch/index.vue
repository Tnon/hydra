<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-28 19:56:43
 * @LastEditTime: 2022-06-03 23:45:10
-->
<template>
  <div class="container">
    <div class="left">

      <!-- 威胁统计 start -->
      <!-- :filters="{interval: 1}"中interval代表搜索时间 -->
      <threat-info :filters="{interval: 1}"/>
      <!-- 威胁统计 end -->

      <!-- 威胁情报总数：自有情报+第三方情报 start -->
      <threat-total :thirdpartySon="thirdparty" backgroundColor="white" class="threatTotal"/>
      <!-- 威胁情报总数：自有情报+第三方情报 end -->

      <!-- 静态类情报 start -->
      <static-or-dynamic type="static" v-model:thirdparty="thirdparty" backgroundColor="white"/>
      <!-- 静态类情报 end -->

      <!-- 动态类情报 start -->
      <static-or-dynamic type="dynimic" backgroundColor="white"/>
      <!-- 动态类情报 end -->

      <!-- 威胁情报查询 start -->
      <information-query class="threatQuery" ref="queryRef" v-model:inputValue="inputValue" />
      <!-- 威胁情报查询 end -->

    </div>

    <!-- 最新威胁全网通告 start -->
    <!-- <information-annunciate class="right"/> -->
    <!-- 最新威胁全网通告 end -->

    <div class="right">
      <!-- 最新威胁全网通告 start -->
      <information-annunciate class="annunciate"/>
      <!-- 最新威胁全网通告 end -->

      <!-- 威胁热搜 start -->
      <threat-hot-search class="hotSearch"/>
      <!-- 威胁热搜 end -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { informationQuery } from './cmts/informationQuery';
  import { informationAnnunciate } from './cmts/annunciate';
  import { provide, ref, unref, reactive } from 'vue';

  import { threatInfo } from '../overview/clusterAnalysis/components/threatInfo';
  import threatTotal from '@/components/threatTotal/index.vue';
  import staticOrDynamic from '@/components/staticOrDynamic/index.vue';
  import threatHotSearch from './cmts/threatHotSearch/index.vue';

  const inputValue = ref('');
  const queryRef = ref<any>();

  // 第三方情报，接收子组件传来的值
  const thirdparty = ref(0);

  const searchReport = (searchdata) => {
    inputValue.value = searchdata;
    unref(queryRef).searchReport(searchdata);
  };
  provide('searchReport', searchReport);
</script>
<style lang="less" scoped>
  .container {
    display: flex;
    padding: 20px;
    width: 100%;
    height: calc(100vh - 80px);

    .left {
      width: 55%;
      display: flex;
      flex-direction: column;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track-piece {
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }
      .threatQuery {
        // flex: 1 0 500px;
        width: 100%;
        height: auto; // 此处需显式的设置auto，不然超出部分的背景色会不生效
        padding: 20px 0 0 0; // 此处必须显式的将padding设为0，不然会受其祖先影响
        background: #fff;
      }
    }

    .right {
      // flex: 1;
      // height: calc(100vh - 80px);
      width: 45%;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track-piece {
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }

      .annunciate {
        margin-bottom: 10px;
        background: #fff;
      }

      .hotSearch {
        background: #fff;
      }
    }
    // .right {
    //   flex: 1;
    //   background: #fff;
    //   padding: 20px;
    //   margin-left: 10px;
    // }
  }
</style>
