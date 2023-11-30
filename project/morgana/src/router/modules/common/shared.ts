/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2021-12-15 16:41:55
 */
import { RouteRecordRaw } from 'vue-router';
/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/shared/login/index.vue'),
  },
];

export default routes;
