/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-04-22 11:58:01
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import shared from './modules/common/shared';
import { errorRoutes } from './modules/common/error';
import { createGuard } from './guard';
import { App } from 'vue';
import tenant from './modules/tenant/';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/overview',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: {
      title: '布局',
    },
    children: [...tenant],
  },
  ...shared,
  errorRoutes,
];

const router = createRouter({
  history: createWebHashHistory(''),
  routes,
});
export function setupRouter(app: App) {
  app.use(router);
  createGuard(router);
  return router;
}
export default router;
