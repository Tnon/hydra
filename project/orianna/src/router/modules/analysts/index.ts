/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-05-16 18:10:38
 */

import { RouteRecordRaw } from 'vue-router';
// import settings from "@/router/modules/setting";
const routes: Array<RouteRecordRaw> = [
  {
    path: 'overview',
    name: 'analysts-sample',
    meta: {
      title: '样本详情分析',
      icon: '#axysxyangben',
    },
    component: () =>
      import(/* webpackChunkName: "analysts-sample" */ '@/views/analysts/sample/index.vue'),
  },
  {
    path: 'report',
    name: 'analysts-report',
    meta: {
      hidden: true,
      parent: 'analysts-sample',
    },
    component: () =>
      import(/* webpackChunkName: "analysts-report" */ '@/views/analysts/sample/report/index.vue'),
  },
  {
    path: 'user',
    name: 'analysts-user',
    meta: {
      title: '用户管理',
      icon: '#axysxyonghu',
    },
    component: () =>
      import(/* webpackChunkName: "analysts-user" */ '@/views/analysts/user/index.vue'),
  },
  // ...settings
];
export default routes;
