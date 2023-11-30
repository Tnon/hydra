<template>
  <div>
    <!-- 样本基本信息 start -->
    <div class="basicInfo">
      <div class="content">
        <div class="riskcount">
          <!-- 分数、置信度和风险值说明 start -->
          <risk-count
            :count="count"
            :title="riskTitle"
            :style="{
              marginBottom: '60px',
            }"
          />
          <risk-count :count="confidence" :title="confidenceTitle" />
          <!-- 分数和风险值说明 end -->
        </div>

        <!-- 样本详情 start -->
        <div class="report">
          <div class="formItem" v-for="(item, key) in omit(moduleLableNames, 'labelName')">
            <span class="label">{{ item }}</span>
            <template v-if="isArray(yisuoValue[key])">
              <span class="value" v-for="ele in yisuoValue[key]">{{ ele }}</span>
            </template>
            <span class="value" v-else>
              {{ yisuoValue[key] ? yisuoValue[key] : '-' }}
            </span>
          </div>
        </div>
        <!-- 样本详情 end -->
      </div>
      <template v-if="yisuoData.netuse_report && yisuoData.netuse_report.length">
        <div class="header">
          <warning-filled class="icon" />
          <div v-for="item in yisuoData.netuse_report" class="notice">
            发现{{ item.risk_category }}外联地址{{ item.address }} ，归属地为{{ item.country }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { isArray, omit } from 'lodash';
  import { reactive, ref, watchEffect, PropType } from 'vue';
  import { riskCount } from '../risk-count';
  import { dateFormat } from '.';
  import { WarningFilled } from '@ant-design/icons-vue';
  const props = defineProps({
    yisuoData: Object as PropType<any>,
    moduleLableNames: Object,
  });
  // 威胁等级
  const count = ref(0),
    riskTitle = ref('威胁等级'),
    // 置信度
    confidence = ref(0),
    confidenceTitle = ref('置信度');

  // 情报内容(展示内容、字段待定)
  const yisuoValue = reactive({
    ioc: '',
    iocType: '',
    port: [],
    platform: '',
    category: '',
    type: '',
    description: '',
    confidence: 0,
    riskLevel: 0,
    source: '',
    insertTime: '',
    activeTime: '',
    expireTime: '',
    activeStatus: '',
    status: '',
    family: '',
    associatedSample: [],
    country: '',
    province: '',
    city: '',
    institutions: '',
  });
  watchEffect(() => {
    for (let k in yisuoValue) {
      // status=1 显式有效，status=-1 显式无效
      if (k === 'status') {
        if (props.yisuoData!['status'] === 1) {
          yisuoValue['status'] = '有效';
        } else if (props.yisuoData!['status'] === -1) {
          yisuoValue['status'] = '无效';
        } else {
          yisuoValue['status'] = '-';
        }
      } else if (['insertTime', 'activeTime', 'expireTime'].includes(k) && props.yisuoData[k]) {
        yisuoValue[k] = dateFormat(props.yisuoData[k]);
      } else {
        yisuoValue[k] = isArray(props.yisuoData![k])
          ? props.yisuoData![k].length
            ? props.yisuoData![k]
            : '-'
          : props.yisuoData![k];
      }
    }
    // 置信度和威胁等级的值
    confidence.value = yisuoValue.confidence;
    count.value = yisuoValue.riskLevel;
  });
  // 查询请求报告数据
</script>
<style lang="less" scoped>
  .basicInfo {
    margin-top: 30px;
    .name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .content {
      display: flex;
    }
    .header {
      display: flex;
      align-items: flex-start;
      margin-top: 30px;
      padding: 20px 30px;
      font-size: 14px;
      font-weight: 400;
      color: #ff3543;
      background: rgba(255, 53, 67, 0.1);
      position: relative;
      .notice {
        padding-bottom: 5px;
      }
    }
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
    .report {
      margin: 0 0 0 40px;
      .formItem {
        padding-bottom: 5px;
        display: flex;
        align-items: flex-start;
        font-size: 14px;
        font-weight: 400;
        color: rgba(41, 48, 56, 0.85);
        .label {
          flex: 140px 0 0;
        }
        .value {
          word-break: break-all;
        }
      }
    }
  }
</style>
