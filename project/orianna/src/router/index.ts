/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-04-22 16:53:11
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import shared from './modules/common/shared';
import { errorRoutes } from './modules/common/error';
import { createGuard } from './guard';
import { App } from 'vue';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/overview',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: {
      title: '布局',
    },
    children: [
      //dymicRouters
    ],
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
/**
 * 动态生成菜单
 * @param token
 */
export const dymicRouter = (menus: RouteRecordRaw[]): RouteRecordRaw[] => {
  const layout = routes.find((item) => item.name == 'Layout')!;
  layout.children = [...menus];
  router.addRoute(layout);
  return layout.children;
};

export default router;
