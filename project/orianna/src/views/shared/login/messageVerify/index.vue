<template>
  <div>
    <div class="title">短信认证</div>
    <Spin :spinning="loading">
      <div v-if="successSend" class="successDescription"
        >短信验证码已发送至手机尾号为：{{ phoneNumber }}的手机用户, 验证码于({{
          `${countdown}s`
        }})后可重新发送,请尽快完成登录</div
      >
      <div v-else class="errorDescription">短信验证码发送失败,请点击重新发送</div>
      <div calss="main">
        <div class="itemTitle">验证码</div>
        <a-input
          :maxLength="6"
          :bordered="false"
          v-model:value="userMessageCode"
          placeholder="请输入短信验证码"
          class="input"
        ></a-input>
        <a-button
          type="link"
          class="regainButton"
          :disabled="countdown !== 0"
          @click="regainMessage"
        >
          重新获取<span v-if="countdown !== 0">({{ countdown }})</span>
        </a-button>
      </div>
      <a-button type="primary" class="loginButton" @click="submitMessageCode">登录</a-button>
    </Spin>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserToken } from '@/store/modules';
  import { requestMessageCode, messageLogin } from '@/api/public';
  import { message, Spin } from 'ant-design-vue';

  export default defineComponent({
    components: {
      Spin,
    },
    props: {
      username: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      // const userTokenStore = useUserToken();
      const router = useRouter();
      const countdown = ref(60); // 重新获取短信验证码倒计时
      const userMessageCode = ref(''); // 用户输入的短信验证码
      const successSend = ref(true); // 发送验证码是否成功

      const phoneNumber = ref(''); // 登录用户手机尾号
      const smsId = ref(''); // 短信验证码标识，登录时需和用户输入短信验证码一同传入
      const loading = ref(true); // 获取验证码接口是否响应结束

      // 重新获取短信验证码接口
      const regainMessage = async () => {
        loading.value = true;
        const { code, user_phone, sms_id } = await requestMessageCode({ username: props.username });
        // 短信验证码是否发送成功
        // 发送失败
        if (code) {
          successSend.value = false;
          loading.value = false;
          countdown.value = 0; // 倒计时为0，可立即点击重新发送
          return;
        }

        // 发送成功，接口返回手机尾号和标识
        phoneNumber.value = user_phone;
        smsId.value = sms_id;

        // 发送成功，进入倒计时
        successSend.value = true;
        loading.value = false;
        countdown.value = 60;
        count();
      };

      // 倒计时函数
      const count = () => {
        if (countdown.value !== 0) {
          setTimeout(() => {
            countdown.value--;
            count();
          }, 1000);
        }
      };

      // 提交短信验证码登录
      const submitMessageCode = async () => {
        if (userMessageCode.value === '' || userMessageCode.value.length !== 6) {
          message.error('请输入正确的六位数字验证码');
          return;
        }
        // 验证码输入正确
        const response = await messageLogin({
          username: props.username,
          sms_code: userMessageCode.value,
          sms_id: smsId.value,
        });

        // 响应正常则将用户信息压入缓存并跳转页面
        // 跳转页面时路由钩子中设置将弹窗销毁
        if (!response.code) {
          message.success('登录成功');
          await useUserToken().loginNew(response);
          router.replace('/');
        }
      };
      onMounted(() => {
        regainMessage();
      });
      return {
        phoneNumber,
        countdown,
        successSend,
        userMessageCode,
        loading,
        regainMessage,
        submitMessageCode,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .title {
    font-weight: 800;
    font-size: 20px;
    color: #135fb2;
    margin: 30px 0 10px 0;
  }

  .successDescription {
    font-size: 15px;
    color: gray;
  }
  .errorDescription {
    font-size: 15px;
    color: #d9001b;
  }
  .main {
    position: relative;
  }
  .itemTitle {
    font-size: 18px;
    margin: 60px 0 10px 8px;
    color: gray;
  }
  .regainButton {
    position: absolute;
    right: 40px;
    font-size: 16px;
  }

  .input {
    font-size: 18px;
    border-bottom: 1px solid rgb(223, 221, 221);
    &:focus {
      border-bottom: 1px solid #267ee5;
    }
  }

  .loginButton {
    margin-top: 40px;
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
</style>
