<template>
  <a-form :label-col="labelCol" labelAlign="left">
    <a-form-item label="样本场景">
      <a-select v-model:value="sample_scene">
        <a-select-option v-for="(item, index) in SubRiskType" :key="item" :value="index">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="风险类型">
      <a-select v-model:value="risk_type">
        <a-select-option v-for="(item, index) in RiskType" :key="item" :value="index">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item name="time_range" label="时间选择">
      <a-range-picker
        v-model:value="time_range"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        :allowClear="false"
      >
      </a-range-picker>
    </a-form-item>
    <a-form-item label="当前条件下样本数">
      <a-tag :color="exportTotal < 30000 ? '#34A753' : '#f50'" class="tag">{{ exportTotal }}</a-tag>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
  import { message } from 'ant-design-vue';
  import { RiskType, SubRiskType } from '@hydra/components/enums/statusEnum';
  import { isExceedLimit, exportSampleRequest } from '@/api/sample';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    components: {
      [Tag.name]: Tag,
    },
    props: {
      outRiskType: {
        type: Number,
      },
      outSampleScene: {
        type: Number,
      },
    },
    setup(props) {
      const formState = reactive({
        risk_type: 0,
        sample_scene: 0,
        time_range: ['', ''],
      });
      const exportTotal = ref(0); // 导出样本总条数

      // 也可在上面直接赋值
      formState.risk_type = props.outRiskType!; // 第一次加载对话框时，内部的风险类型默认和外部一样
      formState.sample_scene = props.outSampleScene!; // 内部的样本场景默认和外部一样

      // isExceed是否超过三万条数据
      let isExceed = ref(false);

      // 控制是否置灰（全部和其他选项互斥）
      // 多选时
      // function isDisabled(index: Number, selectedArr) {
      //   if (selectedArr.length !== 0 && !selectedArr.includes(0) && index === 0) {
      //     return true;
      //   } else if (selectedArr.includes(0) && index !== 0) {
      //     return true;
      //   }
      // }

      // 调查询接口，判断是否超过三万条数据
      const judgeIsExceed = async () => {
        // 传参
        const datas = {
          filter: {
            start_time: formState.time_range[0],
            end_time: formState.time_range[1],
            risk_type: formState.risk_type,
            sample_scene: formState.sample_scene,
          },
        };
        // 解构获取总条数
        const { total } = await isExceedLimit(datas);
        exportTotal.value = total;
        if (total > 30000) {
          // 如果大于3万条，将isExceed置为true
          isExceed.value = true;
          message.error('样本数量大于3万条无法导出，请缩小筛选范围！');
          return;
        }
        // 如果小于三万条数据，将标志置为false
        isExceed.value = false;
      }

      // 确认按钮，确认导出
      const requestExport = async () => {
        // 判断是否超过三万条，超过三万条直接抛出异常
        await judgeIsExceed();
        if (isExceed.value) {
          throw new Error();
        }
        // 导出接口传参
        const datas = {
          filter: {
            // start_time: Number(new Date(formState.time_range[0])),
            start_time: formState.time_range[0],
            end_time: formState.time_range[1],
            risk_type: formState.risk_type,
            sample_scene: formState.sample_scene,
          },
        };
        // 调用导出接口
        await exportSampleRequest(datas);
        message.success('样本导出成功，请点击导出详情进行查看和下载！');
      }

      // 监听formState中三个条件，若其中一个发生改变，调接口查询
      // 对话框打开立刻执行一次
      watch(formState, () => {
        judgeIsExceed();
      },{
        immediate: true,
      });

      return {
        ...toRefs(formState),
        exportTotal, // 样本条数
        labelCol: { style: { width: '110px' } },
        SubRiskType,
        RiskType,
        requestExport, // 请求导出函数,点击确定调用
      };
    },
  });
</script>

<style lang="scss" scoped>
  :deep(.ant-picker) {
    width: 100%;
  }
  .tag {
    min-width: 50px;
    text-align: center;
  }
</style>
