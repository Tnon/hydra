/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-19 15:59:30
 * @LastEditTime: 2022-06-05 22:33:45
 */
import topFilter from './index.vue';
import { RiskType, SubRiskType } from '../enums/statusEnum';
export const filterData = [
  {
    title: '样本场景',
    key: 'sample_scene',
    items: SubRiskType,
  },
  {
    title: '风险类型',
    key: 'risk_type',
    items: RiskType,
  },
];
export default topFilter;
