<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-06-01 17:56:55
 * @LastEditTime: 2022-06-03 22:04:25
-->
<template>
  <img v-if="imgPath" :src="imgPath" />
</template>

<script lang="ts">
  import realtimePng from '@/assets/images/realtime630.png';
  import outreachPng from '@/assets/images/outreach630.png';
  import sampleClusterPng from '@/assets/images/cluster630.png';
  import { defineComponent, ref, watchEffect } from 'vue';
  export default defineComponent({
    props: {
      value: String,
    },
    setup(props) {
      const imgPath = ref('');
      const routerImgMap = {
        //威胁态势分析
        'overview-realtime': realtimePng,
        //外联态势分析
        'overview-outreach': outreachPng,
        //样本聚类分析
        'overview-cluster': sampleClusterPng,
      };
      watchEffect(() => {
        imgPath.value = routerImgMap[props.value!];
      });
      return {
        imgPath,
      };
    },
  });
</script>
<style lang="less" scoped></style>
