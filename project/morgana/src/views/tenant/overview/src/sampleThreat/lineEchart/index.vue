<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-04-20 20:33:03
-->
<template>
  <div ref="chartRef" class="charts"></div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, Ref, watchEffect } from 'vue';
  import { useECharts } from '@hydra/hooks/useEcharts';
  import { useSetoptions } from '.';
  import { RANGDATE, SAMPLETYPE } from '@/enums/statusEnum';
  import { getLineData } from '@/api/overview';
  export default defineComponent({
    props: {
      interval: {
        type: Number as PropType<RANGDATE>,
        required: true,
      },
      sample_type: {
        type: Number as PropType<SAMPLETYPE>,
        required: true,
      },
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
      // 样本威胁请求数据
      const getLineChartsData = async () => {
        const { fields, values } = await getLineData({
          interval: props.interval,
          sample_type: props.sample_type,
        });
        useSetoptions(setOptions, echarts, fields, values, props.sample_type);
      };
      watchEffect(() => {
        getLineChartsData();
      });
      return { chartRef };
    },
  });
</script>

<style lang="less" scoped>
  .charts {
    height: 350px;
  }
</style>
