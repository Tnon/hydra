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
    // 获取配置和连接信息
    watchEffect(async () => {
      const { link_status, device_code } = await getGetawayConfig();
      state.device_code = device_code;
      state.link_status = link_status;
    });
    // 重置
    const resetKeys = async () => {
      const { link_status, device_code } = await setGatewayInfo();
      state.device_code = device_code;
      state.link_status = link_status;
    };
    return () => (
      <div class={classes.content}>
        <div class={classes.node}>
          <Spin spinning={unref(pageLoading)}>
            <div class={classes.header}>{state.title}</div>
            <div class={classes.formItem}>
              <div class={classes.label}>连接状态</div>
              <Badge
                color={state.link_status == 1 ? '#34A753' : '#FF3543'}
                text={state.link_status == 1 ? '连接成功' : '连接异常'}
              ></Badge>
            </div>
            <div class={classes.formItem}>
              <div class={classes.label}>传输密钥</div>
              <span class={classes.ipt}>{ state.device_code }</span>
            </div>
            
            <div>
              <a-popconfirm
                title="重置将立即生效，确认重置?"
                ok-text="确定"
                cancel-text="取消"
                placement="rightBottom"
                onConfirm={() => resetKeys()}
              >
                <Button class={classes.btn} type="primary">重置密钥</Button>
              </a-popconfirm>
            </div>
          </Spin>
        </div>
      </div>
    );
  },
});
