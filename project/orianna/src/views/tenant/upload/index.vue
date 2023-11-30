<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-29 16:21:59
 * @LastEditTime: 2022-06-01 21:59:53
-->
<template>
  <div>
    <div class="content">
      <div class="header">上传样本</div>
      <!-- 上传接口后面需要更换 -->
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        action="/api/tenant/sample/upload"
        :headers="headers"
        @change="uploadChange"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
      >
        <div>
          <custom-icon class="upicon" type="#axysxshangchuan" />
        </div>
        <p>
          将样本文件拖到此处、或
          <span class="uploadFile">点击上传</span>
        </p>
      </a-upload-dragger>
      <div class="footer">请上传 30MB以内的样本文件</div>
    </div>
    <div class="fmtcnt">
      <div class="decription">当前系统支持对以下样本文件格式进行异常行为分析</div>
      <!-- <div class="main">
        <div class="box" v-for="{ title, value } in fmtData" :key="title">
          <div class="title">{{ title }}</div>
          <div class="value">{{ value.join('、') }}</div>
        </div>
      </div> -->
      <div class="node" v-for="{ title, value } in fmtData" :key="title">
        <span class="title">{{ title }}</span>
        <span class="value">
          {{ value.join('、') }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, h, createVNode } from 'vue';
  import { message, Upload, } from 'ant-design-vue';
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import { useUserToken } from '@/store/modules';
  import { upperCase } from 'lodash';
  import { useModal } from '@/hooks/use-modal';

  export default defineComponent({
    components: {
      [Upload.Dragger.name]: Upload.Dragger,
      CheckCircleOutlined,
    },
    setup() {
      const userTokenStore = useUserToken();
      const token = computed(() => userTokenStore.token);
      const tokenType = computed(() => userTokenStore.tokenType);
      const headers = {
        Authorization: `${unref(tokenType)} ${unref(token)}`,
      };
      //上传的文件
      const fileList = ref([]);
      //格式要求
      const fmtData = [
        {
          title: '程序类文件格式包括：',
          value: ['EXE', 'DLL', 'BAT', 'ELF', 'HTML'],
        },
        {
          title: '文档类文件格式包括：',
          value: ['DOC', 'DOCX', 'PPT', 'RTF', 'PPTX', 'XLS', 'XLSX', 'PDF'],
        },
        {
          title: '脚本类文件格式包括：',
          value: ['HTML', 'POWERSHELL', 'VBS', 'JS'],
        },
        {
          title: '压缩程序类文件格式包括：',
          value: ['ZIP', 'RAR', '7Z'],
          // , 'TAR', 'GZ'
        },
        {
          title: 'Webshell检测文件格式包括: ',
          value: ['PHP', 'JSP', 'ASP', 'TXT'],
        }
      ];
      // 存放待校验的文件类型,本次不做类型校验，先注释掉
      // const acceptType = ref('');
      // fmtData.forEach((ele) => {
      //   ele.value.forEach((type) => {
      //     type = type === 'POWERSHELL' ? 'PS1' : type;
      //     acceptType.value += '.' + type + ',';
      //   });
      // });
      //上传前校验
      const beforeUpload = (file) => {
        // 对上传文件大小校验，小于30兆
        if (file.size / 1024 / 1024 > 30) {
          message.error('文件最大30M');
          return false;
        }
        // 对上传文件类型校验，需要在定义的类型数组中
        // const type = file.name.slice(file.name.lastIndexOf('.') + 1);
        // if (acceptType.value.includes(upperCase(type).replace(/\s*/g, ''))) {
        //   return Promise.resolve(file);
        // } else {
        //   message.error('文件类型错误！');
        //   return false;
        // }
      };
      const uploadChange = (info) => {
        //上传接口失败
        if (info.file.status === 'error') {
          message.error('上传失败');
          return;
        }
        if (info.file.response) {
          if (info.file.response.code) {
            message.error(info.file.response.msg || '上传失败');
          } else {
            // message.success('上传成功');
            useModal(
              {
                title: '提示',
                footer: false,
                width: 500,
                showRightColse: true,
              },
              createVNode('span', null, [
                createVNode(CheckCircleOutlined, {
                  style: {
                    color: '#52c41a',
                    fontSize: '18px',
                    marginRight: '10px',
                  }
                }),
                '样本上传成功，正在分析中，请稍后进入“样本详情分析”页面查看分析结果',
              ]),
            );
          }
        }
      };
      return {
        fileList,
        headers,
        fmtData,
        // acceptType,
        uploadChange,
        beforeUpload,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    width: 800px;
    border-radius: 4px;
    background: #fff;
    margin: 20px auto;
    padding: 20px 30px;
    .header {
      font-size: 18px;
      font-weight: 600;
      color: #293038;
      margin-bottom: 40px;
    }
    .upicon {
      margin-bottom: 15px;
      font-size: 25px !important;
      margin-top: 80px;
    }
    .uploadFile {
      color: #439ef6;
      margin-bottom: 80px;
      display: inline-block;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: #293038;
    }
  }
  .fmtcnt {
    margin-top: 20px;
    width: 800px;
    border-radius: 4px;
    background: #fff;
    margin: 20px auto;
    padding: 20px 30px;
    .decription {
      font-size: 16px;
      padding-bottom: 10px;
      font-weight: 600;
    }

    // .main {
    //   display: flex;
    //   flex-wrap: wrap;  
    //   .box {
    //     flex: 1 0 25%;
    //     padding: 0 10px;
    //     margin-top: 20px;

    //     .title {
    //       font-weight: 600;
    //     }
    //   }
    // }
    .node {
      font-size: 12px;
      color: #293038;
      padding: 5px 0;
      .title {
        font-weight: 600;
      }
      .value {
        font-weight: 400;
      }
    }
  }
</style>
