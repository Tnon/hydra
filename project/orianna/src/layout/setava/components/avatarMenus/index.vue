<template>
  <div class="box">
    <!-- 头像 start -->
    <div class="avatar">
      <a-avatar class="avatarCOn">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <div>
        <div class="name">{{ userInfo.account }}</div>
        <div class="email">
          {{ userInfo.email }}
        </div>
        <div class="role">
          {{
            roleType === RoleEnum.SUPERADMIN
              ? '超级管理员'
              : roleType === RoleEnum.PLATFORM
              ? '系统管理员'
              : roleType === RoleEnum.ANALYSTS
              ? '安全分析员'
              : '租户'
          }}
        </div>
      </div>
    </div>
    <!-- 头像 end -->

    <!-- bar start -->
    <a-menu v-model:selectedKeys="selectedKeys" mode="vertical" class="avaMenus" />
    <!-- bar end -->

    <!-- 630删除 -->
    <!-- 离线时间 start -->
    <!-- <div class="offTime">创建时间{{ userInfo.create_time }}</div> -->
    <!-- 离线时间 end -->
    <!-- 退出登录 start -->
    <div class="logout" @click="logout">退出登录</div>
    <!-- 退出登录 end -->
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue';

  import { Menu, Avatar } from 'ant-design-vue';
  import { UserOutlined } from '@ant-design/icons-vue';
  import { useUserToken } from '@/store/modules';
  import { Router, useRouter } from 'vue-router';
  import { RoleEnum } from '@/enums/roleEnum';
  export default defineComponent({
    components: {
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      UserOutlined,
      [Avatar.name]: Avatar,
    },
    props: {
      avatarUrl: String,
    },
    setup(_, { emit }) {
      //接收刷新tabview的reload，国际化
      const route: Router = useRouter();
      //关闭弹框
      const closePop = () => {
        emit('closePop');
      };
      const userTokenStore = useUserToken();
      const userInfo = computed(() => userTokenStore.user_info),
        roleType = computed(() => userTokenStore.roleType);
      const state = reactive({
        selectedKeys: [],
      });
      const logout = async () => {
        userTokenStore.logout(route);
      };
      return {
        ...toRefs(state),
        userInfo,
        logout,
        closePop,
        RoleEnum,
        roleType,
      };
    },
  });
</script>
<style lang="less" scoped>
  .box {
    width: 280px;
    background: #fff;
    .avaMenus {
      padding: 8px 0;
      border-bottom: 1px solid #eee !important;
    }
    .avatar {
      padding: 24px;
      display: flex;
      align-self: start;
      border-bottom: 1px solid #eee;
      .avatarCOn {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
      .name {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
        margin-bottom: 4px;
      }
      .email {
        font-size: 12px;
        font-weight: 400;
        color: #000;
        line-height: 18px;
        margin-bottom: 8px;
      }
      .role {
        display: inline-block;
        padding: 2px 8px;
        background: rgba(38, 126, 229, 0.1);
        color: #267ee5;
        font-size: 12px;
        font-weight: 600;
        line-height: 20px;
      }
    }
    .accSet {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      margin-top: 8px;
      cursor: pointer;
    }
    .offTime {
      margin-top: 8px;
      height: 34px;
      line-height: 34px;
      padding: 0 16px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
    }
    .logout {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #267ee5;
      }
    }
  }
  .actived {
    background: #eee;
  }
</style>
