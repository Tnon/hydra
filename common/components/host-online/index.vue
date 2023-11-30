<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-04-20 19:41:37
-->
<template>
  <div>
    <Badge
      :status="online === 1 ? 'processing' : 'default'"
      :color="online === 1 ? '#267EE5' : '#eee'"
    />
    <span class="online" v-if="online === 1">
      已连接
      <slot></slot>
    </span>
    <span class="offline" v-else>
      未连接
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { Badge } from 'ant-design-vue';
  defineProps({
    online: Number,
  });
</script>

<style lang="less" scoped>
  .online {
    color: #267ee5;
  }
  .offline {
    color: rgba(0, 0, 0, 0.45);
  }
</style>
