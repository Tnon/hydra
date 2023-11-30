<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-14 13:48:00
 * @LastEditTime: 2022-05-11 16:08:56
-->
<template>
  <div class="header">
    <div class="flexcenter" @click="goBack">
      <custom-icon class="backIcon" type="#axysxxiangzuo" />
      <span class="name">自动分析报告：{{ sampleName }}</span>
    </div>
    <div class="download">
      <a-button class="reportDownload" v-if="canDownLoadReport" @click="downloadReport">
        报告下载
      </a-button>
      <a-button class="sampleDownload" v-if="sample_path" @click="downloadSample">
        样本下载
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { useModal } from '@/hooks/use-modal';
  import { exportExpertFileNoToken } from '@hydra/utils/tools';
  import { createVNode, defineComponent, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { ExclamationCircleFilled } from '@ant-design/icons-vue';
  import { getpdf } from '@hydra/utils/dowmloadPDF';
  export default defineComponent({
    props: {
      sampleName: String,
      sample_path: String,
      canDownLoadReport: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { emit }) {
      const router = useRouter();
      const goBack = () => {
        router.go(-1);
      };
      // 样本下载
      const downloadSample = () => {
        useModal(
          {
            title: '提示',
            wrapClassName: 'noticeModal',
            handleOk: () => {
              exportExpertFileNoToken(props.sample_path!);
            },
          },

          createVNode('span', null, [
            createVNode(ExclamationCircleFilled, {
              style: {
                color: '#faad14',
                fontSize: '18px',
                marginRight: '10px',
              },
            }),
            '样本可能具有风险，请谨慎下载，解压密码：QueRenFengXian@',
          ]),
        );
      };
      // 报告下载
      const downloadReport = () => {
        useModal(
          {
            title: '提示',
            wrapClassName: 'noticeModal',
            handleOk: async () => {
              await emit('openCollapse');
              nextTick(() => {
                getpdf();
              });
            },
          },

          createVNode('span', null, [
            createVNode(ExclamationCircleFilled, {
              style: {
                color: '#faad14',
                fontSize: '18px',
                marginRight: '10px',
              },
            }),
            '确定下载分析报告？',
          ]),
        );
      };
      return {
        goBack,
        downloadSample,
        downloadReport,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .backIcon {
      margin-right: 10px;
      font-size: 24px !important;
    }
    .flexcenter {
      font-size: 18px;
      font-weight: 500;
      color: rgba(41, 48, 56, 0.85);
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .download {
      display: flex;
      .reportDownload {
        margin-right: 40px;
      }
    }
  }
</style>
