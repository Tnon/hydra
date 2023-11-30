/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-06 14:35:04
 */
import * as echarts from 'echarts/core';

import { LineChart, PieChart, MapChart, ScatterChart, EffectScatterChart } from 'echarts/charts';

import { TooltipComponent, GridComponent, LegendComponent, VisualMapComponent } from 'echarts/components';

import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  PieChart,
  MapChart,
  SVGRenderer,
  LegendComponent,
  ScatterChart,
  EffectScatterChart,
  VisualMapComponent
]);

export default echarts;
