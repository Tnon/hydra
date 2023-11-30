/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-18 16:30:01
 * @LastEditTime: 2022-06-15 16:13:46
 */
import { Router } from 'vue-router';
import { useGlobalModal } from '@/store/modules';
export const modalGuard = (router: Router) => {
  router.beforeEach(() => {
    const globalModalStore = useGlobalModal();
    //移除全局弹框
    globalModalStore.SetGlobalModal(null);
  });
  //滚动到顶部
  router.afterEach(() => {
    if (document.getElementsByClassName('layout-content')[0]) {
      document.getElementsByClassName('layout-content')[0].scrollTop = 0;
    }
  });
};
