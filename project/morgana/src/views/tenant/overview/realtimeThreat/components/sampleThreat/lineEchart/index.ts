/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-15 15:52:10
 */
import { ColorEnum } from '@/enums/colorEnum';
import { SAMPLETYPE, THREATINFO } from '@/enums/statusEnum';
import lineEchart from './index.vue';
export const useSetoptions = (
  setOptions,
  echarts,
  fields,
  values,
  threatValues,
  sample_type: SAMPLETYPE,
  threat_type: THREATINFO,
) => {
  setOptions({
    tooltip: {
      trigger: 'axis',
      padding: 16,
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
        color: 'rgba(255, 255, 255, 0.4)',
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255,0.5)',
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
          color: 'rgba(255, 255, 255, 0.4)',
        },
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.4)',
      },
    },
    series: [
      {
        name: sample_type === SAMPLETYPE.Malicious ? '恶意样本' : '可疑样本',
        type: 'line',
        itemStyle: {
          color:
            ColorEnum[
              sample_type === SAMPLETYPE.Malicious
                ? 'malicious_num'
                : sample_type === SAMPLETYPE.Suspicious
                ? 'suspicious_num'
                : 'safe_num'
            ],
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
                    ? 'rgba(240, 80, 100, .1)'
                    : sample_type === SAMPLETYPE.Suspicious
                    ? 'rgba(248, 165, 86, .1)'
                    : 'rgba(38, 126, 229, .1)',
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
      // {在来一组数据}
      {
        name: threat_type === THREATINFO.INFO ? '威胁情报识别' : '',
        type: 'line',
        itemStyle: {
          color: ColorEnum[threat_type === THREATINFO.INFO ? 'threat_num' : ''],
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
                color: 'rgba(0,191,255,.3)',
              },
              {
                offset: 1,
                color: 'rgba(0,191,255,.1)',
              },
            ],
            false,
          ),
          shadowColor: 'rgba(240, 80, 100, 0.08)',
          shadowBlur: 200,
        },
        data: threatValues,
        animationDuration: 2000,
      },
    ],
  });
};
export default lineEchart;
