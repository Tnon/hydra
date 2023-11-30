/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 15:00:17
 * @LastEditTime: 2022-05-31 09:35:04
 */
import { defineComponent, ref, unref, watchEffect } from 'vue';
import styles from './index.module.less';
import { Spin } from 'ant-design-vue';
export const systemAuth = defineComponent({
  props: {
    cloud_connect_info: Object,
    pageLoading: Boolean,
  },

  setup(props) {
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
      // {
      //   title: '特征库版本',
      //   value: '',
      //   key: 'behavior_ver',
      // },
      // {
      //   title: '威胁情报',
      //   value: '',
      //   key: 'threaten_ver',
      // },
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
    watchEffect(() => {
      nodes.value.forEach((ele) => {
        ele.value = props.cloud_connect_info![ele.key];
      });
      device_code.value = props.cloud_connect_info!['device_code'];
      isAuth.value =
        props.cloud_connect_info!.auto_total_day || props.cloud_connect_info!.expert_total;
    });
    return () => (
      <Spin spinning={props.pageLoading}>
        <div class={styles.header}>系统授权</div>
        <div class={[styles.authBar, isAuth.value ? styles.isAuth : '']}>
          <div class={styles.anthStatus}>
            <customIcon class={styles.icon} type="#axysxshouquanrenzheng" />
            <span class={styles.text}>{isAuth.value ? '已授权' : '未授权'}</span>
          </div>
          <div class={styles.serverId}>
            <span>设备识别码：</span>
            <span>{device_code.value}</span>
          </div>
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
