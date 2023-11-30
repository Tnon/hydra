<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-25 19:26:15
 * @LastEditTime: 2022-06-01 16:53:11
-->
<template>
  <div ref="chartRef" class="charts">
    <div class="header">外联IP国家分布</div>
  </div>
</template>

<script lang="ts" setup>
  import { useECharts } from '@hydra/hooks/useECharts';
  import { PropType, Ref, ref, watchEffect, watch } from 'vue';
  import worldJson from './map/world.json';
  import worldZhJson from './map/world-zh.json';
  import { getWorldMap } from '@/api/platform/overview';

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts, resizeFn } = useECharts(chartRef as Ref<HTMLDivElement>);
  echarts.registerMap('wd', worldJson as any);

  const props = defineProps({
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
    fold: Boolean, // 左侧树是否折叠
  });

  // 地图数据
  const mapList = ref([]);

  // 监听每当折叠的时候进行resize
  watch(
    () => props.fold,
    () => {
      resizeFn();
    },
  );

  // 获取地图数据
  watchEffect(async () => {
    const { items } = await getWorldMap(props.filters);
    mapList.value = items;
  });

  watchEffect(() => {
    setOptions({
      nameMap: worldZhJson,
      tooltip: {
        formatter: (params) => {
          return params.name && params.name + ':' + params.value;
        },
      },
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      dataRange: {
        //左下角的颜色块。start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 101, label: '> 100', color: '#FF0000' }, // 红色
          { start: 31, end: 100, label: '31 - 100 ', color: '#e57526' }, // 橙色
          { start: 1, end: 30, label: '1 -30', color: '#FFFF00' }, // 黄色
        ],
        textStyle: {
          color: '#fff', // 值域文字颜色
        },
      },
      series: [
        {
          name: '外联分布',
          type: 'map',
          map: 'wd',
          roam: false,
          itemStyle: {
            areaColor: '#323c48',
            borderColor: '#111',
          },
          emphasis: {
            itemStyle: {
              areaColor: '#EEE8AA',
            },
          },
          data: mapList.value,
        },
      ],
    });
  });
</script>
<style lang="less" scoped>

  .charts {
    width: 100%;
    height: 490px;
    backdrop-filter: blur(24px);

    .header {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      // line-height: 24px;
      height: 50px;
      padding: 20px 20px 0 20px;
      background: rgba(255, 255, 255, 0.08)
    }
  }

</style>
