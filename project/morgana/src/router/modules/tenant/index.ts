/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-05-16 18:20:18
 */

import { markRaw } from "vue";
import { RouteRecordRaw } from "vue-router";
import { RouterTransition } from "@hydra/components/transition";
const routes: Array<RouteRecordRaw> = [
  {
    path: "upload",
    name: "tenant-upload",
    meta: {
      title: "威胁样本上传",
      icon: "#axysxshangchuan",
    },
    component: () =>
      import(
        /* webpackChunkName: "tenant-upload" */ "@/views/tenant/upload/index.vue"
      ),
  },
  {
    path: "overview",
    name: "tenant-overview",
    redirect: '/overview/realtime',
    component: markRaw(RouterTransition),
    // component: () =>
    //   import(
    //     /* webpackChunkName: "tenant-overview" */ "@/views/tenant/overview/index.vue"
    //   ),
    meta: {
      title: "威胁态势分析",
      icon: "#axysxshouye",
    },
    children: [
      {
        path: "realtime",
        name: `overview-realtime`,
        meta: {
          title: "实时威胁分析",
        },
        component: () =>
          import(
            /* webpackChunkName: "overview-realtime" */ "@/views/tenant/overview/realtimeThreat/index.vue"
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
            /* webpackChunkName: "overview-cluster" */ "@/views/tenant/overview/clusterAnalysis/index.vue"
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
            /* webpackChunkName: "overview-outreach" */ '@/views/tenant/overview/outreachTrend/index.vue'
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
      import(/* webpackChunkName: "tenant-search" */ '@/views/tenant/threatSearch/index.vue'),
  },
  {
    path: "sample",
    name: "tenant-sample",
    meta: {
      title: "样本详情分析",
      icon: "#axysxyangben",
    },
    component: () =>
      import(
        /* webpackChunkName: "tenant-sample" */ "@/views/tenant/sample/index.vue"
      ),
  },
  {
    path: "report",
    name: "tenant-report",
    meta: {
      hidden: true,
      parent: "tenant-sample",
    },
    component: () =>
      import(
        /* webpackChunkName: "tenant-report" */ "@/views/tenant/sample/report/index.vue"
      ),
  },
  {
    path: "compress",
    name: "tenant-compress",
    meta: {
      hidden: true,
      parent: "tenant-sample",
    },
    component: () =>
      import(
        /* webpackChunkName: "tenant-compress" */ "@/views/tenant/sample/compress/index.vue"
      ),
  },
  {
    path: 'memory',
    name: 'memory',
    meta: {
      title: '内存马威胁分析',
      icon: '#axysxheike',
    },
    component: () =>
      import(/* webpackChunkName: "memory" */ '@/views/tenant/memory/index.vue'),
  },
  {
    path: "user",
    name: "tenant-user",
    meta: {
      title: "用户管理",
      icon: "#axysxyonghu",
    },
    component: () =>
      import(
        /* webpackChunkName: "tenant-user" */ "@/views/tenant/user/index.vue"
      ),
  },

  {
    path: "config",
    name: "tenant-config",
    redirect: "/config/currency",
    component: markRaw(RouterTransition),
    meta: {
      title: "配置管理",
      icon: "#axysxpeizhi",
    },
    children: [
      {
        path: "currency",
        name: `config-currency`,
        meta: {
          title: "通用配置",
        },
        component: () =>
          import(
            /* webpackChunkName: "config-currency" */ "@/views/tenant/config/currency/index.vue"
          ),
      },

      {
        path: "security",
        name: `config-security`,
        meta: {
          icon: "#ax-os-Windows",
          title: "安全配置",
        },
        component: () =>
          import(
            /* webpackChunkName: "config-security" */ "@/views/tenant/config/security/index.vue"
          ),
      },
    ],
  },
  {
    path: "setting",
    name: "tenant-setting",
    meta: {
      hidden: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "tenant-setting" */ "@/views/tenant/setting/index.vue"
      ),
  },
];
export default routes;
