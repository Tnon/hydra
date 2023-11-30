/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 11:33:29
 * @LastEditTime: 2022-05-16 10:22:17
 */
import { defineComponent, ref, unref, watchEffect } from 'vue';
import styles from './index.module.less';
import cunstomIcon from '@hydra/components/custom-icon';
import { Spin } from 'ant-design-vue';
import { getTenantAuthInfo } from '@/api/tenant/config';
export const systemAuth = defineComponent({
  components: {
    cunstomIcon,
  },
  setup() {
    //页面loading
    const pageLoading = ref<boolean>(false);
    //设备码
    const device_code = ref('');
    //是否授权
    const isAuth = ref(false);

    const nodes = ref([
      {
        title: '系统版本',
        value: '',
        key: 'sys_ver',
      },
      {
        title: '特征库版本',
        value: '',
        key: 'behavior_ver',
      },
      {
        title: '威胁情报',
        value: '',
        key: 'threaten_ver',
      },
      {
        title: '自动检测（已用）',
        value: '',
        key: 'auto_used_day',
      },
      {
        title: '自动检测（总数）',
        value: '',
        key: 'auto_total_day',
      },
      {
        title: '专家检测（已用）',
        value: '',
        key: 'expert_used',
      },
      {
        title: '专家检测（总数）',
        value: '',
        key: 'expert_total',
      },
    ]);
    //获取授权信息
    watchEffect(async () => {
      const cloud_connect_info = await getTenantAuthInfo();
      nodes.value.forEach((ele) => {
        ele.value = cloud_connect_info![ele.key];
      });
      device_code.value = cloud_connect_info!['device_code'];
      isAuth.value = cloud_connect_info!.auto_total_day || cloud_connect_info!.expert_total;
    });
    return () => (
      <Spin spinning={pageLoading.value}>
        <div class={styles.header}>系统授权</div>
        <div class={[styles.authBar, isAuth.value ? styles.isAuth : '']}>
          <div class={styles.anthStatus}>
            <cunstomIcon class={styles.icon} type="#axysxshouquanrenzheng" />
            <span class={styles.text}>{isAuth.value ? '已授权' : '未授权'}</span>
          </div>
          {/* <div class={styles.serverId}>
            <span>设备识别码：</span>
            <span>{device_code.value}</span>
          </div> */}
        </div>
        {unref(nodes).map((item, index) => (
          <div class={[styles.node, index === 2 ? styles.brNode : '']}>
            <div class={styles.title}>{item.title}</div>
            <div class={styles.value}>{item.value}</div>
          </div>
        ))}
      </Spin>
    );
  },
});
