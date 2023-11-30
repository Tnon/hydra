<template>
  <div class="login-box">
    <a-form :model="formInline" @submit="handleSubmit">
      <div class="header">
        <img src="../../../assets/images/M01.png" alt="" class="image" />
        <div class="title">网哨M01</div>
      </div>
      <a-form-item>
        <a-input v-model:value.trim="formInline.username" size="large" placeholder="请输入用户名">
          <template #prefix> <UserOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value.trim="formInline.password"
          size="large"
          placeholder="请输入密码"
          type="password"
          autocomplete="new-password"
        >
          <template #prefix> <LockOutlined /></template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-model:value.trim="formInline.userVerify"
          size="large"
          placeholder="请输入下方验证码"
        >
          <template #prefix> <VerifiedOutlined /></template>
        </a-input>
      </a-form-item>
      <ImageVerifyCode :verifyCode="verifyCode" @updateVerifyCode="updateVerifyCode"/>

      <a-form-item class="mt30">
        <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons-vue';
  import { pCompile } from '@hydra/utils/urlUtils';
  import { useRouter } from 'vue-router';
  import { useUserToken } from '@/store/modules';
  import ImageVerifyCode from '@hydra/components/imageVerifyCode/index.vue';
  import { requestVerifyCode } from '@/api/user'; // 获取验证码

  export default defineComponent({
    components: {
      UserOutlined,
      LockOutlined,
      VerifiedOutlined,
      ImageVerifyCode,
    },
    setup() {
      //登录结构体
      const state = reactive({
        loading: false,
        verifyCode: '', // 接口返回的验证码
        uuid: '', // 接口返回的验证码标识

        formInline: {
          username: '',
          password: '',
          userVerify: '',
        },
      });

      const userTokenStore = useUserToken();
      const router = useRouter();
      const handleSubmit = async () => {
        const { username, password, userVerify } = state.formInline;
        if (username.trim() == '' || password.trim() == '') {
          return message.warning('账号或密码不能为空');
        }

        if (userVerify.trim() === '') {
          return message.warning('请输入验证码');
        }
        if (userVerify.toLowerCase() !== state.verifyCode.toLowerCase()) {
          updateVerifyCode();
          return message.warning('验证码输入错误');
        }

        state.loading = true;
        const response = await userTokenStore
          .login({
            username,
            password: pCompile(password),
            captcha_code: userVerify,
            uuid: state.uuid,
          })
          .catch(() => {
            state.formInline.userVerify = '';
            updateVerifyCode();
          })
          .finally(() => {
            state.loading = false;
          });
        if (response) {
          router.replace('/');
        }
      };

      // 获取/更新验证码
      const updateVerifyCode = async () => {
        const { captcha_code, uuid } = await requestVerifyCode();
        state.verifyCode = captcha_code;
        state.uuid = uuid;
      };

      onMounted(() => {
        updateVerifyCode();
      });

      return {
        ...toRefs(state),
        handleSubmit,
        updateVerifyCode,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .login-box {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
    ::v-deep(.ant-form) {
      width: 400px;
      background: #fff;
      padding: 50px 30px;
      .ant-col {
        width: 100%;
      }
      .mt30 {
        margin-top: 30px;
      }
      .ant-form-item-label {
        padding-right: 6px;
      }
      .ant-input {
        font-size: 14px;
      }
      .title {
        font-weight: 800;
        font-size: 24px;
        color: #135fb2;
      }
    }
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }
    .image {
      width: 40px;
      height: 45px;
      margin-right: 10px;
    }
  }
</style>
