<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-05-31 16:33:34
-->
<template>
  <div ref="chartRef" class="charts"></div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, Ref, watch, watchEffect } from 'vue';
  import { useECharts } from '@hydra/hooks/useECharts';
  import { useSetoptions } from '.';
  import { getTenantDetection, getTenantLineChartsData } from '@/api/tenant/overview';
  import { SAMPLETYPE, THREATINFO } from '@/enums/statusEnum';
  export default defineComponent({
    props: {
      filters: {
        type: Object as PropType<API.HomeFilter>,
        required: true,
      },
      fold: Boolean,
      sample_type: {
        type: Number as PropType<SAMPLETYPE>,
        required: true,
      },
      threat_type: {
        type: Number as PropType<THREATINFO>,
        required: true,
      },
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts, resizeFn } = useECharts(chartRef as Ref<HTMLDivElement>);

      // 监听每当折叠的时候进行resize
      watch(
        () => props.fold,
        () => {
          resizeFn();
        },
      );

      const getSampleThreatData = async () => {
        // 样本请求数据
        const { fields, values } = await getTenantLineChartsData({
          ...props.filters,
          sample_type: props.sample_type,
        });

        // 威胁情报请求
        const { values: threatValues } = await getTenantDetection({
          ...props.filters,
        });

        useSetoptions(
          setOptions,
          echarts,
          fields,
          values,
          threatValues,
          props.sample_type,
          props.threat_type,
        );
      };
      watchEffect(() => {
        getSampleThreatData();
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
