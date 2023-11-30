<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-10 16:00:32
 * @LastEditTime: 2022-04-01 14:19:40
-->
<template>
  <div class="topFilter">
    <span>风险类型：</span>
    <span
      v-for="(title, id) in RiskType"
      :key="id"
      class="topFilterType"
      @click="checkStatus(id)"
      :class="{ pick: id === risk_type }"
    >
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { RiskType } from '@/enums/statusEnum';
  export default defineComponent({
    props: {
      risk_type: Number,
    },
    setup(props, { emit }) {
      const checkStatus = (id) => {
        emit('update:risk_type', id);
        id !== props.risk_type && emit('search');
      };
      return {
        RiskType,
        checkStatus,
      };
    },
  });
</script>

<style lang="less" scoped>
  .topFilter {
    height: 35px;
    padding: 20px 20px 40px 20px;
    margin: 0 20px;
    background: #fff;
    .topFilterType {
      width: 48px;
      height: 16px;
      line-height: 16px;
      font-weight: 400;
      margin: 0 5px;
      padding: 4px 10px;
      cursor: pointer;
    }
    .pick {
      background: #267ee5;
      color: #fff;
    }
  }
</style>
