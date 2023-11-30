<!--
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-28 14:04:07
 * @LastEditTime: 2022-06-10 18:01:08
-->
<template>
  <div class="content">
    <hdd-filled :style="{ color: file_color, fontSize: '50px' }" />
    <div :style="{ color: file_color }" class="title">
      <component :is="icon_type" :style="{ fontSize: '12px', paddingRight: '10px' }" />
      <span>{{ file_title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { IconType, SAMPLETYPE } from '../enums/statusEnum';
  import {
    HddFilled,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons-vue';
  export default defineComponent({
    props: {
      count: Number,
    },
    components: {
      HddFilled,
      ExclamationCircleOutlined,
      CheckCircleOutlined,
      QuestionCircleOutlined,
    },
    setup(props) {
      // 样本参数
      const file = reactive({
        file_type: 1, // 样本类型
        file_color: '', // 样本颜色
        file_title: '', // 样本文字
        icon_type: '', // 图标类型
      });
      // 样本图标颜色和文字显式
      const iconType = (type: number) => {
        type >= 0 && type <= 29
          ? (file.file_type = SAMPLETYPE.SAFE)
          : type >= 30 && type <= 59
          ? (file.file_type = SAMPLETYPE.Suspicious)
          : (file.file_type = SAMPLETYPE.Malicious);
        [file.file_color, file.file_title, file.icon_type] =
          IconType[file.file_type - 1].split('/');
      };
      iconType(props.count!);

      return { ...toRefs(file) };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 30px 0 0;
    .title {
      display: flex;
      align-items: center;
      padding-top: 15px;
    }
  }
</style>
