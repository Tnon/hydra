<template>
  <div>
    <!-- 平台配置 start -->
    <!-- <platConfig /> -->
    <!-- 平台配置 end -->

    <!-- 平台授权 start -->
    <platAuth />
    <!-- 平台授权 end -->

    <!-- 系统授权 start -->
    <systemConfig v-if="roleType === RoleEnum.SUPERADMIN" />
    <!-- 系统授权 end -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useUserToken } from '@/store/modules';
  import { RoleEnum } from '@/enums/roleEnum';
  // import { platConfig } from './platConfig';
  import { platAuth } from './platAuth';
  import { systemConfig } from './systemConfig';

  export default defineComponent({
    components: {
      // platConfig, // 630去掉平台配置
      platAuth,
      systemConfig,
    },

    setup() {
      const userTokenStore = useUserToken();
      const roleType = computed(() => userTokenStore.roleType);

      return {
        roleType,
        RoleEnum,
      };
    },
  });
</script>

<style lang="less" scoped></style>
