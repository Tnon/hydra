<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:53
 * @LastEditTime: 2022-05-30 19:56:16
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
      <!-- 样本详情 start -->
      <div class="report">
        <div class="formItem" v-for="(item, key) in detailMsg" :key="key">
          <div class="label">{{ moduleLableNames[key] }}</div>
          <div
            class="value"
            :class="[
              key === 'sample_tag' && item !== '-' ? 'sample_tag' : '',
              key === 'sample_tag' && item === '未检测到风险'
                ? 'safe'
                : key !== 'sample_tag'
                ? ''
                : 'danger',
            ]"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!-- 样本详情 end -->

      <!-- 文件样式 start -->
      <icon-show :count="count" />
      <!-- 文件样式 end -->
    </div>
    <!-- 样本基本信息 end -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import { riskCount } from '../../risk-count';
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
        sample_name: '',
        check_time: '',
        sample_ext: '',
        sample_size: '',
        run_env: '',
        MD5: '',
        SHA1: '',
        SHA256: '',
        SSDEEP: '',
        SHELL: '',
        sample_tag: '',
      });
      //折叠信息
      const foldMsg = reactive({
        harm_info: [],
        trans_mode: [],
        impact_estimate: [],
        vulnerability: [],
        handle_suggest: [],
      });
      //犹豫外部为异步，需要按需操作
      watchEffect(() => {
        for (let k in detailMsg) {
          detailMsg[k] = props.moduleData![k] || '-';
        }
        for (let k in foldMsg) {
          foldMsg[k] = props.moduleData![k] ?? [{ title: '-', info: '-' }];
        }
        count.value = ~~props.moduleData!.sample_score;
      });
      // detailMsg.sample_tag = '未检测到风险';
      return {
        detailMsg,
        foldMsg,
        count,
        title,
      };
    },
  });
</script>
<style lang="less" scoped>
  .basicInfo {
    display: flex;
    align-items: flex-start;
    .riskcount {
      margin-right: 40px;
      flex: 120px 0 0;
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
        .sample_tag {
          padding: 0 20px;
          height: 25px;
          border: 1px solid #ff35431a;

          display: flex;
          justify-content: center;
          align-items: center;
        }
        .safe {
          color: #34a753;
          background-color: rgba(52, 167, 83, 0.1);
        }
        .danger {
          color: #ee0707;
          background-color: #ff35431a;
        }
      }
    }
  }
</style>
