<!--
 * @Author: Delavin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2021-06-16 11:13:12
 * @LastEditTime: 2022-05-31 09:36:28
-->
<template>
  <div class="avaCon">
    <!-- 设置图标 start -->
    <!-- 630仅管理员显示 -->
    <custom-icon
      type="#axysxshezhi"
      v-if="userType === RoleEnum.PLATFORM"
      class="setIcon"
      :class="activedS ? 'actived' : ''"
      @click="
        userType === RoleEnum.PLATFORM
          ? linkTo('platform-setting')
          : userType === RoleEnum.TENANT || RoleEnum.SUBTENANT
          ? linkTo('tenant-setting')
          : linkTo()
      "
    />
    <!-- 设置图标 end -->

    <!-- 用户头像 start -->
    <a-popover
      trigger="click"
      placement="rightBottom"
      destroyTooltipOnHide
      overlayClassName="popNoPad"
      :visible="popVisible"
      @visibleChange="visibleChange"
    >
      <template #content>
        <avatarMenus :avatarUrl="undefined" @closePop="popVisible = false" />
      </template>
      <a-avatar @click="popVisible = true" class="avatar" :src="undefined">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-popover>
    <!-- 用户头像 end -->
  </div>
</template>
<script lang="ts">
  import { UserOutlined } from '@ant-design/icons-vue';
  import { Avatar, Popover } from 'ant-design-vue';
  import { defineComponent, watch, ref, reactive, toRefs } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserToken } from '@/store/modules';
  import avatarMenus from './components/avatarMenus';
  import { RoleEnum } from '@/enums/roleEnum';

  export default defineComponent({
    name: 'SettingAvatar',
    components: {
      UserOutlined,
      avatarMenus,
      [Avatar.name]: Avatar,
      [Popover.name]: Popover,
    },
    setup() {
      const userType = ref<RoleEnum>(RoleEnum.PLATFORM);
      const useUserTokenStore = useUserToken();
      // 用户身份
      const role = useUserTokenStore.userInfo.role as RoleEnum;
      // const role = 3;
      userType.value = role; // 设置按钮的显示

      //手动控制pop
      const popVisible = ref<boolean>(false);
      //路由跳转
      const router = useRouter();
      const currentRoute = useRoute();
      //设置 还是 头像
      const actived = reactive({
        activedS:
          (currentRoute.name as string).indexOf('platform-setting') > -1 ||
          (currentRoute.name as string).indexOf('tenant-setting') > -1,
      });
      //关闭pop 跳转路由
      const linkTo = (name?: string) => {
        popVisible.value = false;
        router.push({ name });
      };
      // 跟随页面路由变化，切换菜单选中状态
      watch(
        () => currentRoute.fullPath,
        () => {
          actived.activedS = false;
          if (
            (currentRoute.name as string).indexOf('platform-setting') > -1 ||
            (currentRoute.name as string).indexOf('tenant-setting') > -1
          ) {
            actived.activedS = true;
          }
        },
      );
      //头像
      const visibleChange = (v) => {
        popVisible.value = v;
      };
      return {
        linkTo,
        popVisible,
        visibleChange,
        ...toRefs(actived),
        userType,
        RoleEnum,
      };
    },
  });
</script>
<style lang="less" scoped>
  .avaCon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setIcon {
      font-size: 18px !important;
      cursor: pointer;
      color: #fff;
      margin-right: 20px;
    }
    .actived {
      color: #267ee5;
    }
    .avatar {
      cursor: pointer;
    }
  }
</style>
