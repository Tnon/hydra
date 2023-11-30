<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-03-14 18:47:21
 * @LastEditTime: 2022-06-02 15:10:54
-->
<template>
  <div class="header">
    <Select
      v-model:value="dataRangeCmp"
      @change="handleChange"
      :options="optionsData"
      :getPopupContainer="(triggerNode) => triggerNode.parentNode"
    >
    </Select>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { Select } from 'ant-design-vue';
  import { RANGDATE } from '../enums/statusEnum';

  export default defineComponent({
    components: {
      Select,
    },
    props: {
      interval: Number as PropType<RANGDATE>,
    },
    setup(props, { emit }) {
      // 选择数据
      const optionsData = [
        {
          label: '近24小时',
          value: RANGDATE.DAY,
        },
        {
          label: '近7天',
          value: RANGDATE.WEEK,
        },
        {
          label: '近30天',
          value: RANGDATE.MONTH,
        },
      ];
      //计算属性
      const dataRangeCmp = computed({
        get: () => props.interval,
        set: (v) => emit('update:interval', v),
      });
      //改变方法
      const handleChange = (v) => {
        dataRangeCmp.value = v;
      };
      return {
        optionsData,
        handleChange,
        dataRangeCmp,
      };
    },
  });
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: right;
    :deep(.ant-select-selector) {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(222, 222, 222, 0.16);
      color: rgba(255, 255, 255, 0.85);
      display: flex;
      align-items: center;
    }
    :deep(.ant-select-arrow) {
      color: rgba(255, 255, 255, 0.85);
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }
  }
</style>
