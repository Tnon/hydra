<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2021-10-09 16:07:37
-->
<template>
  <div class="asidemenu">
    <a-menu
      v-model:selected-keys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      theme="dark"
      @openChange="openChange"
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.name">
        <menu-item :menu-info="item" :openKeys="openKeys" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watch, toRefs } from 'vue';
  import MenuItem from './menu-item.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { routes } from '@/router';
  export default defineComponent({
    name: 'Menu',
    components: {
      MenuItem,
    },
    setup() {
      // 当前路由
      const currentRoute = useRoute();
      const router = useRouter();
      const state = reactive({
        selectedKeys: [currentRoute.name as string],
        openKeys: [],
      });
      //显示的路由菜单
      const menus = computed(() => routes.find((item) => item.name == 'Layout')!.children);
      // 跟随页面路由变化，切换菜单选中状态
      watch(
        () => currentRoute.fullPath,
        () => {
          if (currentRoute.name == 'login') return;
          state.selectedKeys = [currentRoute.meta.parent ?? currentRoute.name] as Array<string>;
        },
      );
      // 点击菜单
      const clickMenuItem = ({ key }) => {
        router.push({ name: key });
      };
      //展开
      const openChange = (openKeys) => {
        state.openKeys = openKeys;
      };
      return {
        ...toRefs(state),
        menus,
        clickMenuItem,
        openChange,
      };
    },
  });
</script>
