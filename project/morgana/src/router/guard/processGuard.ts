/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-18 16:46:46
 * @LastEditTime: 2022-04-22 17:18:24
 */
import NProgress from 'nprogress'; // progress bar
import { Router } from 'vue-router';
import 'nprogress/nprogress.css'; // 进度条样式
NProgress.configure({ showSpinner: false }); // NProgress Configuration

export const processGuard = (router: Router) => {
  router.beforeEach(() => {
    NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done(); // finish progress bar
  });

  router.onError(() => {
    NProgress.done(); // finish progress bar
  });
};
