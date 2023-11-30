<template>
  <div v-if="pageName" class="main">
    <div class="left"></div>
    <div class="center">{{ pageName }}</div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">

  import { defineComponent, ref, watchEffect } from 'vue';
  export default defineComponent({
    props: {
      value: String,
    },
    setup(props) {
      // const imgPath = ref('');
      const pageName = ref('');
      const routerMap = {
        //威胁态势分析
        'overview-realtime': '实时威胁分析',
        //外联态势分析
        'overview-outreach': '外联态势分析',
        //样本聚类分析
        'overview-cluster': '样本聚类分析',
      };
      watchEffect(() => {
        pageName.value = routerMap[props.value!];
      });
      return {
        pageName,
      };
    },
  });
</script>
<style lang="less" scoped>
  .main {
    display: flex;
  }
  .left {
    width:0px;
    height:0px;

    border-top:40px solid #0052b3;
    border-right:40px solid  transparent;
    border-bottom:40px solid transparent;
    border-left:140px solid  transparent; // 左盒子左边框延伸

    transform: translate(40px, 0);
  }
  .right {
    width:0px;
    height:0px;

    border-top:40px solid #0052b3;
    border-right:140px solid  transparent; // 右盒子右边框延伸
    border-bottom:40px solid transparent;
    border-left:40px solid  transparent;

    transform: translate(-40px, 0);
  }
  
  .center {
    z-index: 1;
    width:560px; 
    height:40px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    background-color: #0052b3;
  }
</style>
