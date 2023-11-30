<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:53
 * @LastEditTime: 2022-05-19 11:19:45
-->
<template>
  <div>
    <!-- 样本基本信息 start -->
    <div class="basicInfo">
      <!-- 样本详情 start -->
      <div class="report">
        <div v-if="Object.keys(moduleData).length > 1">
          <div class="formItem" v-for="(item, key) in detailMsg">
            <span class="label">{{ moduleLableNames[key] }}</span>
            <template v-if="isArray(item)">
              <span class="value" v-for="ele in item">{{ ele }}</span>
            </template>
            <span class="value" v-else>
              {{ item ? item : '-' }}
            </span>
          </div>
        </div>
        <template v-else>
          <template v-if="moduleData.netuse_report && moduleData.netuse_report.length">
            <div class="header title">
              <warning-filled class="icon" />
              <div>
                <div v-for="item in moduleData.netuse_report" class="notice">
                  发现{{ item.risk_category }}外联地址{{ item.address }} ，归属地为{{ item.country }}
                </div>
              </div>
            </div>
          </template>
          <div class="title" v-else>
            <check-circle-filled class="icon" />
            <span class="detect">暂未发现联防检测引擎</span>
          </div>
        </template>
      </div>
      <!-- 样本详情 end -->
    </div>
    <!-- 样本基本信息 end -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import { WarningFilled, CheckCircleFilled } from '@ant-design/icons-vue';
  import { dateFormat } from '.';
  import { isArray } from 'lodash';
  export default defineComponent({
    props: {
      moduleData: {
        type: Object,
        required: true,
      },
      moduleLableNames: {
        type: Object,
        required: true,
      },
    },
    components: {
      WarningFilled,
      CheckCircleFilled,
    },
    setup(props) {
      const count = ref(0);
      //基本信息
      const detailMsg = reactive({
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
      //由于外部为异步，需要按需操作
      watchEffect(() => {
        for (let k in detailMsg) {
          // status=1 显式有效，status=-1 显式无效
          if (k === 'status') {
            if (props.moduleData!['status'] === 1) {
              detailMsg['status'] = '有效';
            } else if (props.moduleData!['status'] === -1) {
              detailMsg['status'] = '无效';
            } else {
              detailMsg['status'] = '-';
            }
          } else if (
            ['insertTime', 'activeTime', 'expireTime'].includes(k) &&
            props.moduleData[k]
          ) {
            detailMsg[k] = dateFormat(props.moduleData[k]);
          } else {
            detailMsg[k] = isArray(props.moduleData![k])
              ? props.moduleData![k].length
                ? props.moduleData![k]
                : '-'
              : props.moduleData![k];
          }
        }
        // 置信度和威胁等级的值
        count.value == ~~props.moduleData!.riskLevel;
      });
      return {
        detailMsg,
        count,
        isArray,
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
          flex: 140px 0 0;
        }
        .value {
          word-break: break-all;
        }
      }
    }
    .title {
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      font-size: 14px;
      font-weight: 400;
      color: #34a753;
      background: rgba(52, 167, 83, 0.1);
      position: relative;
      padding: 20px 30px;
    }
    .icon {
      font-size: 20px;
      margin-right: 10px;
      overflow: visible;
    }
    .header {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #ff3543;
      background: rgba(255, 53, 67, 0.1);
      position: relative;
      padding: 20px 30px;
      .notice {
        padding-bottom: 5px;
      }
    }
  }
</style>
