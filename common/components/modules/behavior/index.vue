<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:52
 * @LastEditTime: 2022-05-19 11:17:22
-->
<template>
  <div class="module">
    <div
      class="title"
      :class="[
        moduleData?.analyze_res === '安全' || !moduleData?.analyze_res
          ? 'titleSuccess'
          : moduleData?.analyze_res === '样本运行时发生异常'
          ? 'abnormal'
          : '',
      ]"
    >
      <template v-if="moduleData?.analyze_res === '安全' || !moduleData?.analyze_res">
        <check-circle-filled class="icon" />
        <div class="value">暂未发现异常行为</div>
      </template>
      <template v-else>
        <warning-filled class="icon" />
        <div class="value">{{ moduleData?.analyze_res }} </div>
      </template>
    </div>
    <!-- 基本信息 start -->
    <div class="baseInfo">
      <div class="header">各类敏感行为</div>
      <CollapseIcon
        class="collInfo"
        v-model:activeKey="activeKeyBehavior"
        :allKeys="Object.keys(basicInfo['behavior_catagory'])"
      >
        <a-collapse-panel
          :header="moduleLableNames[key]"
          v-for="(item, key) in basicInfo['behavior_catagory']"
          :key="key"
        >
          <div v-for="(ele, index) in item" :key="index" class="node">
            <span
              class="level"
              :class="ele.level === '低危' ? 'low' : ele.level === '中危' ? 'medium' : 'high'"
              >{{ ele.level }}
            </span>
            <span class="opdesc"> {{ ele.opdesc }}</span>
          </div>
        </a-collapse-panel>
      </CollapseIcon>
    </div>
    <!-- 基本信息 end -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import { Collapse } from 'ant-design-vue';
  import CollapseIcon from '../../collapse-icon';
  import { WarningFilled, CheckCircleFilled } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      CollapseIcon,
      [Collapse.Panel.name]: Collapse.Panel,
      WarningFilled,
      CheckCircleFilled,
    },
    props: {
      moduleData: Object,
      moduleLableNames: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const activeKeyBehavior = ref([]);
      //  默认显示折叠
      const activeKey = ref([]);
      //各类敏感行为
      const basicInfo = reactive({
        behavior_catagory: {
          process: [{ opdesc: '', level: '' }],
          reg: [{ opdesc: '', level: '' }],
          file: [{ opdesc: '', level: '' }],
          network: [{ opdesc: '', level: '' }],
          service: [{ opdesc: '', level: '' }],
          other: [{ opdesc: '', level: '' }],
        },
      });
      //衍生文件
      const deriveFile = ref([]);
      watchEffect(() => {
        for (let k in basicInfo['behavior_catagory']) {
          basicInfo['behavior_catagory'][k] = props.moduleData!['behavior_catagory'][k];
        }
      });
      return {
        basicInfo,
        deriveFile,
        activeKey,
        activeKeyBehavior,
      };
    },
  });
</script>
<style lang="less" scoped>
  .title {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #ff3543;
    background: rgba(255, 53, 67, 0.1);
    position: relative;
    padding: 20px 30px;
    .icon {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .titleSuccess {
    color: #34a753;
    background: rgba(52, 167, 83, 0.1);
  }
  .abnormal {
    color: #ff8c00;
    background: rgba(255, 140, 0, 0.1);
  }
  .module {
    .baseInfo {
      .header {
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(41, 48, 56, 0.85);
      }
    }
    .collInfo {
      border: none !important;
      position: relative;
      margin-top: 20px;
      .ant-collapse-item {
        margin: 10px 0;
        border: none;
        :deep(.ant-collapse-header) {
          padding: 10px !important;
          background: #fafafa;
        }
      }
      :deep(.ant-collapse-content) {
        border: 1px solid #fafafa;
        border-top: none;
        .ant-collapse-content-box {
          padding: 0 10px;
        }
      }
      .node {
        padding: 10px 0 10px 25px;
        display: flex;
      }
      .level {
        // padding-right: 20px;
        flex: 40px 0 0;
      }
      .opdesc {
        word-break: break-all;
      }
      .low {
        color: #17c947;
      }
      .medium {
        color: #ff9933;
      }
      .high {
        color: #ff3543;
      }
    }
  }
</style>
