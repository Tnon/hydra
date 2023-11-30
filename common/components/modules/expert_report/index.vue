<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:53
 * @LastEditTime: 2022-05-30 20:15:34
-->
<template>
  <div>
    <!-- 样本基本信息 start -->
    <div class="basicInfo">
      <div class="riskcount">
        <!-- 分数和风险值说明 start -->
        <risk-count :count="count" :title="title" />
        <!-- 分数和风险值说明 end -->
      </div>

      <div class="expertModule">
        <!-- 专家分析 start -->
        <div class="report">
          <div class="formItem" v-for="(item, key) in detailMsg" :key="key">
            <div class="label">{{ moduleLableNames[key] }}</div>
            <div class="value">{{ item }}</div>
          </div>
        </div>
        <!-- 专家分析 end -->
        <a-button
          class="downLoadBtn"
          v-if="moduleData?.detail_path"
          type="primary"
          @click="downloadFile"
        >
          下载专家分析附件
        </a-button>
        <icon-show :count="count" />
      </div>
    </div>
    <!-- 样本基本信息 end -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import { riskCount } from '../../risk-count';
  import { exportExpertFileNoToken } from '../../../utils/tools';
  import iconShow from '../../icon-show';
  export default defineComponent({
    components: {
      riskCount,
      iconShow,
    },
    props: {
      moduleData: Object,
      moduleLableNames: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const count = ref(0);
      const title = ref('风险值');
      //基本信息
      const detailMsg = reactive({
        analyze_summary: '',
        handle_suggestion: '',
      });
      //犹豫外部为异步，需要按需操作
      watchEffect(() => {
        for (let k in detailMsg) {
          detailMsg[k] = props.moduleData![k] || '-';
        }

        count.value = ~~props.moduleData!.expert_value;
      });
      //下载专家附件
      const downloadFile = () => {
        exportExpertFileNoToken(props.moduleData!.detail_path);
      };
      return {
        detailMsg,
        count,
        title,
        downloadFile,
      };
    },
  });
</script>
<style lang="less" scoped>
  .basicInfo {
    display: flex;
    align-items: flex-start;
    position: relative;
    .riskcount {
      margin-right: 40px;
      flex: 120px 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .report {
      flex: 1;
      .formItem {
        margin-bottom: 10px;
        display: flex;
        align-items: flex-start;
        font-size: 14px;
        font-weight: 400;
        color: rgba(41, 48, 56, 0.85);
        .label {
          flex: 96px 0 0;
        }
        .value {
          word-break: break-all;
        }
      }
    }
    .expertModule {
      display: flex;
      flex: 1;
      .downLoadBtn {
        margin-top: -45px;
      }
    }
  }
</style>
