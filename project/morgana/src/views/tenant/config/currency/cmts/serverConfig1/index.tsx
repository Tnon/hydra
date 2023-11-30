import { defineComponent, ref, unref, watchEffect } from 'vue';
import { Input, Badge, Button, Spin } from 'ant-design-vue';
import classes from './index.module.less';
import { setCloudInfo, setGatewayInfo } from '@/api/config';
export const serverConfig = defineComponent({
  props: {
    gateway_connect: String,
    gateway_connect_status: Number,
    pageLoading: Boolean,
  },
  setup(props, { emit }) {
    const state = ref();
    watchEffect(() => {
      state.value = [
        {
          title: '邮件网关配置',
          server: props.gateway_connect,
          status: props.gateway_connect_status,
          loading: false,
        },
      ];
    });
    const serverText = async (index) => {
      state.value[index].loading = true;
      let res;
      if (!index) {
        res = await setCloudInfo({
          addr: state.value[0].server,
        });
      } else {
        res = await setGatewayInfo({
          addr: state.value[1].server,
        });
      }
      !res.code && (await emit('updateStatus'));

      state.value[index].loading = false;
    };
    return () => (
      <div class={classes.content}>
        {unref(state).map(({ title, status, loading }, index) => (
          <div class={classes.node}>
            <Spin spinning={props.pageLoading}>
              <div class={classes.header}>{title}</div>
              <div class={classes.formItem}>
                <div class={classes.label}>服务器</div>
                <Input class={classes.ipt} v-model={[unref(state)[index].server, 'value']} />
              </div>
              <div class={classes.formItem}>
                <div class={classes.label}>连接状态</div>
                <Badge
                  color={status == 1 ? '#34A753' : '#FF3543'}
                  text={status == 1 ? '连接成功' : '连接异常'}
                ></Badge>
              </div>
              <div>
                <Button
                  type="primary"
                  loading={loading}
                  class={classes.btn}
                  onClick={() => serverText(index)}
                >
                  立即连接
                </Button>
              </div>
            </Spin>
          </div>
        ))}
      </div>
    );
  },
});
