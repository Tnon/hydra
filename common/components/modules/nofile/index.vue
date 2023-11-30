<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-29 16:54:59
 * @LastEditTime: 2022-05-19 11:18:58
-->
<template>
  <div>
    <div class="formItem" :class="{ detect: !moduleData.length }">
      <template v-if="moduleData.length">
        <warning-filled class="icon" />
        <div class="value">
          <div v-for="ele in moduleData" :key="ele">{{ ele }}</div>
        </div>
      </template>
      <template v-else>
        <check-circle-filled class="icon" />
        <div class="value">暂未检测到内存攻击行为</div>
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
  .formItem {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #ff3543;
    background: rgba(255, 53, 67, 0.1);
    position: relative;
    padding: 20px 30px;
    .value {
      width: 100%;
      word-break: break-all; // 允许在单词内换行(对字母起作用，此处可添可不添)
      word-wrap: break-word; // 在长单词或 URL 地址内部进行换行
    }
    .icon {
      font-size: 20px;
      margin-right: 10px;
      overflow: visible;
    }
  }
  .detect {
    color: #34a753;
    background: rgba(52, 167, 83, 0.1);
  }
</style>
