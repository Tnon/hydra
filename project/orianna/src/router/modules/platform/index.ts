/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-05-31 22:03:51
 */

import { markRaw } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { RouterTransition } from '@hydra/components/transition';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'overview',
    name: 'platform-overview',
    redirect: '/overview/realtime',
    component: markRaw(RouterTransition),
    meta: {
      title: '威胁态势分析',
      icon: '#axysxshouye',
    },
    children: [
      {
        path: 'realtime',
        name: `overview-realtime`,
        meta: {
          title: '实时威胁分析',
        },
        component: () =>
          import(
            /* webpackChunkName: "overview-realtime" */ '@/views/platform/overview/realtimeThreat/index.vue'
          ),
      },
      {
        path: 'cluster',
        name: `overview-cluster`,
        meta: {
          title: '样本聚类分析',
        },
        component: () =>
          import(
            /* webpackChunkName: "overview-cluster" */ '@/views/platform/overview/clusterAnalysis/index.vue'
          ),
      },
      {
        path: 'outreach',
        name: `overview-outreach`,
        meta: {
          title: '外联态势分析',
        },
        component: () =>
          import(
            /* webpackChunkName: "overview-outreach" */ '@/views/platform/overview/outreachTrend/index.vue'
          ),
      },
    ],
  },
  {
    path: 'threat',
    name: 'tenant-threat',
    meta: {
      title: '威胁情报查询',
      icon: '#axysxchaxun',
    },
    component: () =>
      import(/* webpackChunkName: "tenant-search" */ '@/views/platform/threatSearch/index.vue'),
  },
  {
    path: 'sample',
    name: 'platform-sample',
    meta: {
      title: '样本详情分析',
      icon: '#axysxyangben',
    },
    component: () =>
      import(/* webpackChunkName: "platform-sample" */ '@/views/platform/sample/index.vue'),
  },
  {
    path: 'report',
    name: 'platform-report',
    meta: {
      hidden: true,
      parent: 'platform-sample',
    },
    component: () =>
      import(/* webpackChunkName: "platform-report" */ '@/views/platform/sample/report/index.vue'),
  },
  {
    path: 'compress',
    name: 'platform-compress',
    meta: {
      hidden: true,
      parent: 'platform-sample',
    },
    component: () =>
      import(
        /* webpackChunkName: "platform-compress" */ '@/views/platform/sample/compress/index.vue'
      ),
  },
  {
    path: 'memory',
    name: 'platform-memory',
    meta: {
      title: '内存马威胁分析',
      icon: '#axysxheike',
    },
    component: () =>
      import(/* webpackChunkName: "platform-memory" */ '@/views/platform/memory/index.vue'),
  },
  {
    path: 'user',
    name: 'platform-user',
    meta: {
      title: '后台用户管理',
      icon: '#axysxyonghu',
    },
    component: () =>
      import(/* webpackChunkName: "platform-user" */ '@/views/platform/user/index.vue'),
  },
  {
    path: 'authorization',
    name: 'platform-authorization',
    redirect: '/authorization/morganna',
    meta: {
      title: '授权管理',
      icon: '#axysxshouquan',
    },
    component: markRaw(RouterTransition),

    children: [
      {
        path: 'morganna',
        name: `authorization-morganna`,
        meta: {
          title: '本地沙箱管理',
        },
        component: () =>
          import(
            /* webpackChunkName: "authorization-morganna" */ '@/views/platform/authorization/morgana/index.vue'
          ),
      },
      {
        path: 'tenant',
        name: `authorization-tenant`,
        meta: {
          title: '租户管理',
        },
        component: () =>
          import(
            /* webpackChunkName: "authorization-tenant" */ '@/views/platform/authorization/tenant/index.vue'
          ),
      },
      {
        path: 'authrecord',
        name: 'morgana-authrecord',
        meta: {
          parent: 'authorization-morganna',
          hidden: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "morgana-authrecord" */ '@/views/platform/authorization/morgana/record/index.vue'
          ),
      },
      {
        path: 'authrecord',
        name: 'tenant-authrecord',
        meta: {
          parent: 'authorization-tenant',
          hidden: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "tenant-authrecord" */ '@/views/platform/authorization/tenant/record/index.vue'
          ),
      },
    ],
  },

  {
    path: 'config',
    name: 'platform-config',
    redirect: '/config/threaten',
    component: markRaw(RouterTransition),
    meta: {
      title: '配置管理',
      icon: '#axysxpeizhi',
    },
    children: [
      {
        path: 'threaten',
        name: `config-threaten`,
        meta: {
          title: '通用配置',
        },
        component: () =>
          import(
            /* webpackChunkName: "config-threaten" */ '@/views/platform/config/threaten/index.vue'
          ),
      },

      // {
      //   path: 'feature',
      //   name: `config-feature`,
      //   meta: {
      //     icon: '#ax-os-Windows',
      //     title: '特征库',
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "config-feature" */ '@/views/platform/config/feature/index.vue'
      //     ),
      // },
    ],
  },
  {
    path: 'setting',
    name: 'platform-setting',
    meta: {
      hidden: true,
    },
    component: () =>
      import(/* webpackChunkName: "platform-setting" */ '@/views/platform/setting/index.vue'),
  },
];
export default routes;
