<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 12:22:54
 * @LastEditTime: 2022-05-19 11:19:12
-->
<template>
  <div class="module">
    <!-- 基本信息 start -->
    <div class="baseInfo">
      <div class="title">基本信息</div>
      <template v-for="(item, key) in basicInfo" :key="key">
        <div class="nodes">
          <div class="label">{{ moduleLableNames[key] }}</div>
          <div class="value">{{ item }}</div>
        </div>
      </template>
    </div>
    <!-- 基本信息 end -->

    <!-- 一层折叠 start -->
    <CollapseIcon
      class="collInfo"
      v-model:activeKey="activeKeyTop"
      :allKeys="Object.keys(foldInfo)"
    >
      <a-collapse-panel :header="moduleLableNames[key]" v-for="(item, key) in foldInfo" :key="key">
        <template v-for="(text, index) in item" :key="index">
          <div class="text">
            {{ text }}
          </div>
        </template>
      </a-collapse-panel>
    </CollapseIcon>
    <!-- 一层折叠 end -->

    <!-- 二层折叠 start -->
    <CollapseIcon class="collInfo" v-model:activeKey="activeKeyBottom" :allKeys="['APIs']">
      <a-collapse-panel :header="moduleLableNames['APIs']" key="APIs">
        <template v-for="(subitem, subkey) in foldInfoPkg['APIs']" :key="subkey">
          <div class="formItems">
            <span class="label">{{ moduleLableNames[subkey] }}</span>
            <span class="value">{{ subitem }}</span>
          </div>
        </template>
      </a-collapse-panel>
    </CollapseIcon>
    <!-- 一层折叠 end -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, watchEffect } from 'vue';
  import { Collapse } from 'ant-design-vue';
  import CollapseIcon from '../../collapse-icon';

  export default defineComponent({
    components: {
      CollapseIcon,
      [Collapse.Panel.name]: Collapse.Panel,
    },
    props: {
      moduleData: Object,
      moduleLableNames: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      // 显式折叠内容
      const activeKeyTop = ref([]);
      const activeKeyBottom = ref([]);
      //基本信息
      const basicInfo = reactive<any>({
        // File: '',
        Packer: '',
        Unpack: false,
        CryptAlg: '',
        PeHeaderExpStr: '',
      });
      //一层折叠多条信息
      const foldInfo = reactive({
        Startup: [],
        AVName: [],
        Mining: [],
      });
      //二层折叠多条信息
      const foldInfoPkg = reactive({
        APIs: {
          Pos: '',
          APIList: '',
          Description: '',
        },
      });
      watchEffect(() => {
        for (let k in basicInfo) {
          if (k === 'Unpack') {
            if (props.moduleData!['Unpack'] === '' || props.moduleData!['Unpack'] === undefined) {
              basicInfo['Unpack'] = '-';
            } else {
              if (props.moduleData!['Unpack']) {
                basicInfo['Unpack'] = '是';
              } else {
                basicInfo['Unpack'] = '否';
              }
            }
          } else {
            basicInfo[k] = props.moduleData![k] || '-';
          }
        }
        for (let k in foldInfo) {
          foldInfo[k] =
            props.moduleData![k] && props.moduleData![k].length ? props.moduleData![k] : ['-'];
        }
        for (let k in foldInfoPkg['APIs']) {

          foldInfoPkg['APIs'][k] =
            // props.moduleData!['APIs'] && JSON.parse(props.moduleData!['APIs'])[k] // 内层也是JSON,需要JSON.parse转换
            // 当APIs中各个字段为空值时，APIs为对象；当APIs中各个字段不为空时，APIs为字符串，需要JSON解析一次
            props.moduleData!['APIs'] && typeof props.moduleData!.APIs === 'string'
              ? JSON.parse(props.moduleData!['APIs'])[k]
              : '-';
          // props.moduleData!['APIs'] && props.moduleData!['APIs'][k]
          // ? props.moduleData!['APIs'][k]
          // : '-';
        }
      });

      return {
        basicInfo,
        foldInfo,
        foldInfoPkg,
        activeKeyTop,
        activeKeyBottom,
      };
    },
  });
</script>
<style lang="less" scoped>
  .module {
    .baseInfo {
      .title {
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(41, 48, 56, 0.85);
      }
      .nodes {
        display: flex;
        align-items: center;
        padding: 10px 0;
        .label {
          flex: 300px 0 0;
          font-size: 14px;
          font-weight: 400;
          color: rgba(41, 48, 56, 0.85);
        }
      }
    }
    .collInfo {
      border: none !important;
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
      .text,
      .formItems {
        padding: 10px 0 0 25px;
      }
      .formItems {
        display: flex;
        .label {
          flex: 300px 0 0;
          font-size: 12px;
          font-weight: 400;
          color: rgba(41, 48, 56, 0.85);
        }
      }
    }

    .value {
      word-break: break-all;
    }
  }
</style>
