<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-19 14:22:34
 * @LastEditTime: 2022-06-05 22:30:33
-->
<template>
  <div class="topFilter">
    <template v-for="filter in filterData">
      <div>
        <span>{{ filter.title }}：</span>
        <span
          v-for="(label, index) in filter.items"
          :key="label"
          class="topFilterType"
          @click="checkSampleStatus(index, filter.key)"
          :class="{ pick: index === $props[filter.key] }"
        >
          {{ label }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { filterData } from '.';
  export default defineComponent({
    props: {
      risk_type: Number,
      sample_scene: Number,
    },
    setup(props, { emit }) {
      // 筛选
      const checkSampleStatus = (value, key) => {
        emit('update:' + key, value);
        value !== props[key] && emit('search');
      };
      return {
        checkSampleStatus,
        filterData,
      };
    },
  });
</script>

<style lang="less" scoped>
  .topFilter {
    height: 35px;
    padding: 20px 20px 80px 20px;
    margin: 0 20px;
    background: #fff;
    > div:first-child {
      padding-bottom: 20px;
    }
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
