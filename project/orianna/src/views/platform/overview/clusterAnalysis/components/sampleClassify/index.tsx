/*
 * @Author: caocongyouren
 * @LastEditors: Caocong.dw
 * @Date: 2022-05-17 18:47:21
 * @LastEditTime: 2022-05-31 09:36:37
 */

import { defineComponent, PropType, reactive, ref, unref, watchEffect } from 'vue';
import classes from './index.module.less';
import { getSampleSceneClassifyData } from '@/api/platform/overview';
export const sampleClassify = defineComponent({
  props: {
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
  },
  setup(props) {
    //加载中
    const resLoading = ref<boolean>(false);
    //条件结构,字段名称暂定
    const state = reactive({
      //黑灰产恶意程序检测
      sample_scene_malware_detection: 0,
      //黑客攻击载荷检测
      sample_scene_payload_detection: 0,
      //邮件附件检测
      sample_scene_mail_file_detection: 0,
      //漏洞利用行为识别
      sample_scene_vulnerability_behavior: 0,
      //无文件攻击行为检测
      sample_scene_no_file_attack: 0,
    });
    //种类
    const renderTypes = ref([
      {
        key: 'sample_scene_malware_detection',
        title: '黑灰产恶意程序检测',
        icon: '#axysxbingdu',
      },
      {
        key: 'sample_scene_payload_detection',
        title: '黑客攻击载荷检测',
        icon: '#axysxheike',
      },
      {
        key: 'sample_scene_mail_file_detection',
        title: '邮件附件检测',
        icon: '#axysxyoujian',
      },
      {
        key: 'sample_scene_vulnerability_behavior',
        title: '漏洞利用行为识别',
        icon: '#axysxloudong',
      },
      {
        key: 'sample_scene_no_file_attack',
        title: '无文件攻击行为检测',
        icon: '#axysxnofile',
      },
    ]);

    // 请求样本场景数据
    watchEffect(async () => {
      resLoading.value = true;
      const res = await getSampleSceneClassifyData(props.filters);
      resLoading.value = false;
      Object.assign(state, res);
    });

    return () => (
      <div class={classes.container}>
        <div class={classes.header}>样本场景分类</div>
        <div class={classes.content}>
          {unref(renderTypes).map(({ title, icon, key }) => (
            <div class={classes.node}>
              <div class={classes.body}>
                <customIcon
                  style={{ color: '#F75554' }}
                  class={classes.icon}
                  type={icon}
                  size="22"
                />
                <span class={classes.title}>{title}</span>
              </div>
              <div class={classes.value}>{state[key]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
