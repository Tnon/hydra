<template>
  <div class="container">
    <div class="title">内存马威胁分析</div>

    <div class="operate">
      <div class="download">
        <span>内存分析工具下载</span>
        <a-button type="primary" @click="downloadTool">点击下载分析工具</a-button>
      </div>
      <div class="upload">
        <!-- :beforeUpload="beforeUpload" -->
        <a-upload-dragger
          name="file"
          :multiple="false"
          action="/api/mem_shell/decode_json"
          :headers="headers"
          @change="uploadChange"
          :showUploadList="false"
        >
          <custom-icon class="uploadIcon" type="#axysxshangchuan" />
          <p>
            将样本文件拖到此处、或
            <span class="uploadFile">点击上传</span>
          </p>
        </a-upload-dragger>
      </div>
      <div class="description">
        <p class="heavyLable">分析工具使用说明</p>
        <p>当您怀疑系统遭受内存木马攻击时：</p>
        <p>1、请先下载"内存分析工具",在怀疑遭受内存马攻击的系统中解压</p>
        <p>2、解压后执行"sh start.sh"即可在当前目录下生成分析文件"MemshellCheckResult.anxin"</p>
        <p>3、将"分析文件"上传至沙箱,以进行内存马威胁分析</p>
      </div>
    </div>

    <div class="content">
      <span class="contentTitle">内存分析结果报告</span>

      <div v-if="Object.keys(detectionResult).length !== 0" class="warning">
        <div class="warningColumn">
          <warning-filled class="icon"/>
          <div>发现内存马风险</div>
        </div>
        <div v-for="(item, index) in detectionResult" :key="item.pid" class="resultItem">
          <span v-for="(value, key) in item" :key="key" class="ele">
            <p class="label">{{ key }}: </p>
            <p class="value">{{ value }}</p>
          </span>
        </div>
      </div>

      <div v-else-if="isUploaded === true" class="safe">
        <check-circle-filled class="icon"/>
        <div>暂未检测到内存马风险</div>
      </div>
      
    </div>

  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { Upload, message } from 'ant-design-vue';
  import { WarningFilled, CheckCircleFilled } from '@ant-design/icons-vue';
  import { useUserToken } from '@/store/modules';

  import { exportReportExcel } from '@hydra/utils/tools';
  
  export default  defineComponent({
    components: {
      [Upload.Dragger.name]: Upload.Dragger,
      WarningFilled,
      CheckCircleFilled,
    },

    setup() {
      // 上传时的请求头
      const userTokenStore = useUserToken();
      const token = computed(() => userTokenStore.token);
      const tokenType = computed(() => userTokenStore.tokenType);
      const headers = {
        Authorization: `${unref(tokenType)} ${unref(token)}`,
      };
      const detectionResult = ref<any>([]); // 分析结果（对象数组）
      const isUploaded = ref(false); // 是否已上传

      // 下载分析工具
      const downloadTool = () => {
        exportReportExcel('/api/storage/withauth/memshell/memshellcheck.tar.gz', 'memshellcheck.tar.gz');
      };

      // 文件上传中、服务端响应后
      const uploadChange = (info) => {
        // 上传时将原来的结果清空并将上传标志重置，避免多次上传文件时出问题
        detectionResult.value = []; // 将上次获取的结果重置
        isUploaded.value = false; // 将上次的是否上传状态重置
    
        //上传失败
        if (info.file.status === 'error') {
          message.error('上传失败');
          return;
        }
        // 上传后后端返回的响应
        if (info.file.response) {
          if (info.file.response.code) {
            message.error(info.file.response.msg || '上传失败');
          } else {
            message.success('上传成功');
            const { items } = info.file.response;
            if (items !== null) {
              detectionResult.value = items;
            }
            isUploaded.value = true;
            // useModal(
            //   {
            //     title: '提示',
            //     footer: false,
            //     width: 500,
            //     showRightColse: true,
            //   },
            //   createVNode('span', null, [
            //     createVNode(CheckCircleOutlined, {
            //       style: {
            //         color: '#52c41a',
            //         fontSize: '18px',
            //         marginRight: '10px',
            //       }
            //     }),
            //     '样本上传成功，正在分析中，请稍后进入“样本详情分析”页面查看分析结果',
            //   ]),
            // );
          }
        }
      };
      return {
        headers,
        detectionResult,
        isUploaded,
        downloadTool,
        uploadChange,
      }
    },
   })

</script>

<style lang="scss" scoped>
  .container {
    // padding: 20px;
    width: 1000px;
    margin:20px auto;

    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .operate {
      display: flex;
      height: 270px;

      .download {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        background: #fff;

        span {
          margin-bottom: 10px;
        }
      }

      .upload {
        flex: 5;
        background: #fff;
        margin-left: 10px;

        .uploadIcon {
          margin: 80px 0 15px;
        }

        .uploadFile {
          color: #439ef6;
        }
      }

      .description {
        flex: 3;
        display: flex;
        flex-direction: column;
        margin-left: 20px;

        .heavyLable {
          font-size: 16px;
          // font-weight: 500;
        }
        p {
          font-size: 14px;
        }
      }
    }

    .content {
      padding: 20px;
      margin-top: 10px;
      height: auto;
      min-height: 600px;
      background: #fff;

      .contentTitle {
        font-size: 16px;
        font-weight: 600;
      }
      .icon {
        font-size: 20px;
        margin-right: 10px;
        overflow: visible;
      }
      
      .safe {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
        margin-top: 10px;
        font-size: 16px;
        color: #34a753;
        background: rgba(52, 167, 83, 0.1)
      }

      .warningColumn {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #ff3543;
        padding: 10px;
        margin: 10px 0;
        background: rgba(255, 53, 67, 0.1);     
      }
      .resultItem {
        color: #ff3543;
        padding: 10px;
        margin: 10px 0;
        background: rgba(255, 53, 67, 0.1);
        .ele {
          display: flex;

          .label {
            flex: 0 0 80px;
          }

          .value {
            word-break: break-all;
          }
        }
      }
    }
  }
</style>