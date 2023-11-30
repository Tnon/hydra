<!--
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2022-04-25 14:21:43
-->
<template>
  <template v-if="!menuInfo.meta.hidden">
    <template v-if="menuInfo.children?.length">
      <a-sub-menu :key="menuInfo.name">
        <!-- 自定义图标 start -->
        <template #expandIcon>
          <CaretRightOutlined
            class="cusIcon"
            :class="{ expand: openKeys.includes(menuInfo.name) }"
          />
        </template>
        <!-- 自定义图标 end -->
        <template #icon v-if="menuInfo.meta.icon">
          <customIcon :type="menuInfo.meta.icon" />
        </template>
        <template #title>
          {{ menuInfo.meta.title }}
        </template>
        <template v-for="item in menuInfo.children" :key="item.name">
          <template v-if="!item.meta.hidden">
            <a-menu-item class="menuItem" :key="item.name">
              <span>{{ item.meta.title }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-sub-menu>
    </template>

    <template v-else>
      <a-menu-item :key="menuInfo.name" class="menuItem">
        <template #icon v-if="menuInfo.meta.icon">
          <customIcon :type="menuInfo.meta.icon" />
        </template>
        {{ menuInfo.meta.title }}
      </a-menu-item>
    </template>
  </template>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { CaretRightOutlined } from '@ant-design/icons-vue';
  import { Menu } from 'ant-design-vue';
  export default defineComponent({
    name: 'MenuItem',
    components: {
      'a-sub-menu': Menu.SubMenu,
      'a-menu-item': Menu.Item,
      CaretRightOutlined,
    },
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
      openKeys: {
        type: Array,
        default: () => [],
      },
    },
  });
</script>
<style lang="less" scoped>
  .cusIcon {
    transition: all 0.3s;
  }
  .expand {
    transform: rotate(90deg);
  }
</style>
