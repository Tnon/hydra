/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-04-08 18:41:39
 */
import { ColorEnum } from '@/enums/colorEnum';
import { SAMPLETYPE } from '@/enums/statusEnum';
import lineEchart from './index.vue';
export const useSetoptions = (setOptions, echarts, fields, values, sample_type: SAMPLETYPE) => {
  setOptions({
    tooltip: {
      trigger: 'axis',
      padding: 16,
      formatter: ([params]) => {
        return `<div class='timeLabel'> 
                    <div>${params.seriesName}</div>
                    <div class='valueLabel'>
                        <span>${params.name}</span>
                        <span style='color:${params.color};marginLeft:"10px"'>${params.value}</span>
                    </div>
                </div>`;
      },
    },
    grid: {
      left: '0%',
      right: '2%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        inside: true, // 刻度朝内
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.45)',
      },
      axisLine: {
        lineStyle: {
          color: '#eee',
        },
      },
      data: fields,
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisTick: {
        inside: true, // 刻度朝内,
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name:
          sample_type === SAMPLETYPE.Malicious
            ? '恶意样本'
            : sample_type === SAMPLETYPE.Suspicious
            ? '可疑样本'
            : '暂无风险',
        type: 'line',
        itemStyle: {
          color:
            ColorEnum[
              sample_type === SAMPLETYPE.Malicious
                ? 'malicious_num'
                : sample_type === SAMPLETYPE.Suspicious
                ? 'suspicious_num'
                : 'safe_num'
            ], //shaodeng,
        },
        // 区域填充颜色
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color:
                  sample_type === SAMPLETYPE.Malicious
                    ? 'rgba(240, 80, 100, 0.3)'
                    : sample_type === SAMPLETYPE.Suspicious
                    ? 'rgba(248, 165, 86, .3)'
                    : 'rgba(38, 126, 229, .3)',
              },
              {
                offset: 1,
                color:
                  sample_type === SAMPLETYPE.Malicious
                    ? 'rgba(240, 80, 100, 0)'
                    : sample_type === SAMPLETYPE.Suspicious
                    ? 'rgba(248, 165, 86, 0)'
                    : 'rgba(38, 126, 229, 0)',
              },
            ],
            false,
          ),
          shadowColor: 'rgba(240, 80, 100, 0.08)',
          shadowBlur: 200,
        },
        data: values,
        animationDuration: 2000,
      },
    ],
  });
};
export default lineEchart;
