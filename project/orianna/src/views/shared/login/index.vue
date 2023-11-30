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
      <ImageVerifyCode :verifyCode="verifyCode" @updateVerifyCode="updateVerifyCode" />
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
  import ImageVerifyCode from '@hydra/components/imageVerifyCode/index.vue'; // 图片验证码
  import { requestVerifyCode } from '@/api/public'; // 获取图片验证码接口
  import { useModal } from '@/hooks/use-modal'; // 对话框组件
  import { messageVerify } from './messageVerify';
  import { login } from '@/api/platform/user';

  export default defineComponent({
    components: {
      UserOutlined,
      LockOutlined,
      VerifiedOutlined,
      ImageVerifyCode,
      messageVerify,
    },
    setup() {
      //登录结构体
      const state = reactive({
        loading: false,
        verifyCode: '', // 验证码
        uuid: '', // 验证码标识
        formInline: {
          username: '',
          password: '',
          userVerify: '', // 用户输入的图片数字验证码
        },
      });

      const userTokenStore = useUserToken();
      const router = useRouter();
      // 账号、密码、图片数字验证码登录

      // 判断密码、验证码是否正确
      /**账户、密码、验证码正确：
       * 判断响应中某个字段或某个字段标志——区别是否开启手机验证
       * 一、手机验证开启：打开手机验证对话框，进入即调接口发送一次验证码
       *    a、用户输入短信验证码，提交到接口进行校验
       *       情况1、验证码正确，执行二
       *       情况2、验证码错误，提醒用户重新输入
       *             手机验证码可设置十分钟或其他时间段内有效，有效期内可输入，也可选择重新发送
       *             直至短信验证码校验成功
       *    b、用户点击重新获取验证码，则调接口获取验证码
       *
       * 二、手机验证未开启：直接执行store中的函数（写入缓存并获取用户信息）
       */

      /**账户、密码、验证码有错误，则刷新图片验证码，并通知用户重新输入
       *
       */
      const handleSubmit = async () => {
        const { username, password, userVerify } = state.formInline;
        if (username.trim() == '' || password.trim() == '') {
          return message.warning('账号和密码不能为空');
        }

        if (userVerify.trim() === '') {
          return message.warning('请输入验证码');
        }
        if (userVerify.toLowerCase() !== state.verifyCode.toLowerCase()) {
          updateVerifyCode();
          return message.warning('验证码输入错误');
        }

        state.loading = true; // 按钮loading
        const response = await isSecretVerifyRight({
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
        if (!response) return; // 用户名、密码、验证码校验失败，则直接返回

        // sms_status字段判断是否需要手机号校验
        // 0：无需短信校验；1：需要短信校验
        if (response.sms_status) {
          useModal(
            {
              footer: false,
              width: 420,
              maskClosable: false,
              showRightColse: true,

              contentProps: {
                username: state.formInline.username,
              },
            },
            messageVerify,
          );
        } else {
          message.success('登录成功');
          await userTokenStore.loginNew(response);
          router.replace('/');
        }
      };

      // 接口验证账号、密码和验证码是否正确
      const isSecretVerifyRight = async (userInfo) => {
        const response = await login(userInfo);
        // 如果响应有code字段，则表示验证失败
        if (response.code) {
          return Promise.reject(response);
        }
        return Promise.resolve(response);
      };
      // const isSecretVerifyRight = async (userInfo) => {
      //   try {
      //     const response = await login(userInfo);
      //     return Promise.resolve(response);
      //   } catch (e) {
      //     return Promise.reject(e);
      //   }
      // };

      // 获取图片数字验证码
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
    // background: url('@/assets/images/login-bg.jpg') no-repeat;
    // background-position: 10% 40%;
    background-color: #f0f2f5;
    ::v-deep(.ant-form) {
      width: 400px;
      // position: absolute;
      // top: 30%;
      // right: 15%;
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
