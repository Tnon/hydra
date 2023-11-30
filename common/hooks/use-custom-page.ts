/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-10-13 18:49:37
 * @LastEditTime: 2021-10-13 18:49:38
 */
import { reactive } from 'vue';
interface CustomPage {
  ctsPage: number;
  ctsPageSize: number;
}

export const useCtsPages = () => {
  const state = reactive<CustomPage>({
    ctsPage: 1,
    ctsPageSize: 10,
  });
  return state;
};
