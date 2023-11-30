import { defineComponent, ref, unref, reactive, watchEffect } from 'vue';
import { Input, Badge, Button, Spin } from 'ant-design-vue';
import classes from './index.module.less';
import { getGetawayConfig, setGatewayInfo } from '@/api/tenant/config';
export const serverConfig = defineComponent({
  setup() {
    //按钮loading
    const btnLoading = ref<boolean>(false);
    //页面loading
    const pageLoading = ref<boolean>(false);
    const state = reactive({
      title: '邮件网关配置',
      device_code: '',
      link_status: 0,
    });
    //获取
    watchEffect(async () => {
      const { link_status, device_code } = await getGetawayConfig();
      state.device_code = device_code;
      state.link_status = link_status;
    });
    // 设置
    const serverText = async () => {
      const { link_status, device_code } = await setGatewayInfo({
        device_code: state.device_code,
      });
      state.device_code = device_code;
      state.link_status = link_status;
    };
    return () => (
      <div class={classes.content}>
        <div class={classes.node}>
          <Spin spinning={unref(pageLoading)}>
            <div class={classes.header}>{state.title}</div>
            <div class={classes.formItem}>
              <div class={classes.label}>设备ID</div>
              <Input class={classes.ipt} v-model={[state.device_code, 'value']} />
            </div>
            <div class={classes.formItem}>
              <div class={classes.label}>连接状态</div>
              <Badge
                color={state.link_status == 1 ? '#34A753' : '#FF3543'}
                text={state.link_status == 1 ? '连接成功' : '连接异常'}
              ></Badge>
            </div>
            <div>
              <Button
                type="primary"
                loading={btnLoading.value}
                class={classes.btn}
                onClick={() => serverText()}
              >
                立即连接
              </Button>
            </div>
          </Spin>
        </div>
      </div>
    );
  },
});
