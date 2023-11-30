<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-29 16:54:59
 * @LastEditTime: 2022-05-19 11:18:58
-->
<template>
  <div>
    <template v-if="moduleData && moduleData.length">
      <div class="header title">
        <warning-filled class="icon" />
        <div v-for="item in moduleData" class="notice">
          发现{{ item.risk_category }}外联地址{{ item.address }} ，归属地为{{ item.country }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="title">
        <check-circle-filled class="icon" />
        <span class="detect">暂未发现联防检测引擎</span>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { WarningFilled, CheckCircleFilled } from '@ant-design/icons-vue';
  export default defineComponent({
    components: { WarningFilled, CheckCircleFilled },
    props: {
      moduleData: {
        type: Object,
        required: true,
      },
      moduleLableNames: {
        type: Object,
        required: true,
      },
    },
  });
</script>
<style lang="less" scoped>
  .title {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #34a753;
    background: rgba(52, 167, 83, 0.1);
    position: relative;
    padding: 20px 30px;
  }
  .icon {
    font-size: 20px;
    margin-right: 10px;
  }
  .header {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #ff3543;
    background: rgba(255, 53, 67, 0.1);
    position: relative;
    .notice {
      padding-bottom: 5px;
    }
  }
</style>
