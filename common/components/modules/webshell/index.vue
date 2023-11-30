<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-29 16:54:59
 * @LastEditTime: 2022-06-12 14:48:11
-->
<template>
  <div>
    <!-- <div class="title" v-if="moduleData.length"></div> -->
    <div class="formItem" :class="{ detect: !moduleData.length }">
      <template v-if="moduleData.length">
        <div>
          <warning-filled class="icon" />
          检测到webshell风险：
        </div>
        <div class="value">
          <div v-for="(ele, index) in moduleData" class="its" :key="ele">
            {{ index + 1 + '.' }}
            <span>{{ ele }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="safeWb">
          <check-circle-filled class="icon" />
          <div class="value">暂未检测到webshell行为</div>
        </div>
      </template>
    </div>
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
    font-size: 14px;
    padding: 10px 0;
  }
  .formItem {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
    color: #ff3543;
    background: rgba(255, 53, 67, 0.1);
    position: relative;
    padding: 20px 30px;
    .value {
      word-break: break-all;
      margin: 0;
      .its {
        margin: 20px 0;
        padding-left: 32px;
      }
    }
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    .safeWb {
      display: flex;
    }
  }
  .detect {
    color: #34a753;
    background: rgba(52, 167, 83, 0.1);
  }
</style>
