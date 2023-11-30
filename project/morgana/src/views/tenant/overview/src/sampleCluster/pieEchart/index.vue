<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-10 16:00:32
 * @LastEditTime: 2022-04-20 20:32:47
-->
<template>
  <div ref="chartRef" class="charts"></div>
</template>

<script lang="tsx">
  import { useECharts } from '@hydra/hooks/useECharts';
  import { defineComponent, PropType, Ref, ref, watchEffect } from 'vue';
  import 'echarts/lib/component/legend';

  export default defineComponent({
    props: {
      pieList: {
        type: Array,
        required: true,
      },
      color: {
        type: Array as PropType<string[]>,
        required: true,
      },
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);
      watchEffect(() => {
        setOptions({
          tooltip: {
            show: true,
          },
          legend: {
            show: false,
          },
          series: [
            {
              color: props.color,
              type: 'pie',
              radius: ['50%', '90%'],
              itemStyle: {
                borderWidth: 2,
              },
              label: {
                show: false,
              },
              data: props.pieList as any,
            },
          ],
        });
      });

      return { chartRef, getInstance };
    },
  });
</script>
<style lang="less" scoped>
  .charts {
    height: 160px;
  }
</style>
