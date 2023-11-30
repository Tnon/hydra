<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2022-06-15 17:50:36
-->
<template>
  <a-layout>
    <a-layout-header>
      <!-- 网站logo start-->
      <layout-header />
      <!--网站logo end-->
      <!-- 首页的三张头部图片 start -->
      <dynamicHeader :value="currentRoute.name" class="image" />
      <!-- 首页的三张头部图片 start -->
    </a-layout-header>

    <a-layout class="layout" v-if="toogleFlag">
      <!--侧边菜单栏start-->
      <div class="layout-left" :class="{ homeSider: isInHome }">
        <a-layout-sider class="layout-sider" :trigger="null">
          <aside-menu />
        </a-layout-sider>
        <div class="homeBar" v-show="isInHome">
          <div class="trapezoid">
            <span class="content">
              <right-circle-outlined class="icon" />
              移入展开导航
            </span>
          </div>
        </div>
      </div>
      <!--侧边菜单栏end-->

      <!--内容区域start-->
      <a-layout-content class="layout-content">
        <div class="tabsview" :class="{ isInHome }">
          <router-view v-slot="{ Component }">
            <transition name="zoom-fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
      <!--内容区域end-->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    provide,
    nextTick,
    watchEffect,
    computed,
    unref,
    createVNode,
  } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';
  import Logo from './logo/index.vue';
  import AsideMenu from './menu/menu.vue';
  import { layoutHeader } from './header';
  import { RightCircleOutlined } from '@ant-design/icons-vue';
  // import dynamicHeader from '@/components/dynamicHeader'; // 图片梯形
  import dynamicHeader from './header/dynamicHeader'; // 纯CSS实现梯形

  import { userToken } from '@/store/modules/user';
  import { useModal } from '@/hooks/use-modal';
  export default defineComponent({
    name: 'Layout',
    components: {
      AsideMenu,
      Logo,
      layoutHeader,
      [Layout.name]: Layout,
      [Layout.Content.name]: Layout.Content,
      [Layout.Sider.name]: Layout.Sider,
      [Layout.Header.name]: Layout.Header,
      dynamicHeader,
      RightCircleOutlined,
    },
    setup() {
      const currentRoute = useRoute() as any;
      const router = useRouter();

      // 页面显式
      const toogleFlag = ref<boolean>(true);

      // 判断是否在首页,默认在首页
      const isInHome = ref(true);
      // 监听当前路由的变换
      watchEffect(() => {
        // 如果在首页则折叠导航栏,否侧不折叠
        (currentRoute.name as string).indexOf('overview') > -1
          ? (isInHome.value = true)
          : (isInHome.value = false);
      });

      const reload = async () => {
        toogleFlag.value = false;
        await nextTick();
        toogleFlag.value = true;
      };
      provide('reload', reload);

      //租户首次登录修改密码
      const userStore = userToken();
      const isTenantFirstLogin = computed(() => userStore.isTenantFirstLogin);

      if (unref(isTenantFirstLogin)) {
        useModal(
          {
            title: '修改密码',
            wrapClassName: 'noticeModal',
            handleOk: () => {
              router.push({
                name: 'tenant-setting',
              });
            },
          },
          createVNode('span', {}, '为了保障系统安全，请您先修改密码。'),
        );
      }

      return {
        toogleFlag,
        isInHome,
        currentRoute,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .image {
    width: 800px;
    height: 40px;
    z-index: 999;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
  .layout {
    display: flex;
    height: calc(100vh - 60px);
    .ant-layout {
      min-width: 1080px;
      background: #f5f8f9;
    }
    .layout-sider {
      padding-top: 10px;
      flex: 0 0 220px !important;
      max-width: 220px !important;
      min-width: 220px !important;
      width: 220px !important;
      height: 100%;
    }
    .layout-left {
      display: flex;
    }
    .homeSider {
      position: absolute;
      height: calc(100vh - 60px);
      left: -220px;
      z-index: 11;
      transition: all 0.2s;
      &:hover {
        left: 0;
        .homeBar {
          opacity: 0;
        }
      }

      .homeBar {
        display: flex;
        align-items: center;
        background: #293038;
        width: 30px;
        transition: all 0.2s;
        .trapezoid {
          height: 350px;
          // 做一个梯形
          border-top: 25px solid transparent;
          border-bottom: 25px solid transparent;
          border-left: 30px solid #293038;
          position: absolute;
          margin-left: 10px;
          .content {
            position: absolute;
            color: #fff;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .menu {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .layout-content {
      flex: auto;
      overflow: auto;
      background: #f5f8f9;
      .tabsview {
        min-width: 1500px;
        overflow: hidden;
      }
      .isInHome {
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
</style>
