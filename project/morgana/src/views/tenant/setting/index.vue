<template>
  <div>
    <div class="titleCom header">基础设置</div>
    <div class="content">
      <div class="title">平台基本信息</div>
      <div class="main">
        <div class="formItem">
          <div class="label">产品Logo</div>
          <Image
            :src="logoUrl"
            alt=""
            class="img"
            fallback="data:image/png;base64,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"
          />
          <div>
            <!-- 上传图片 start -->
            <upload-file accept=".png" :beforeUpload="beforeUpload">
              <a-button class="upload">
                <span>上传图片</span>
              </a-button>
            </upload-file>
            <!-- 上传图片 end -->
            <div class="tips">推荐格式：PNG</div>
            <div class="tips">推荐尺寸：100px * 100px</div>
          </div>
        </div>
        <div class="formItem">
          <div class="label">产品名称</div>
          <a-input class="productName" v-model:value="product_name" />
        </div>
      </div>
      <a-button type="primary" class="confirm" @click="saveConfig"> 保存 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, watch, toRefs } from 'vue';
  import uploadFile, { FileItem } from '@/components/upload-file';
  import { useProductLogo } from '@/store/modules';
  import { isPng } from '@hydra/utils/tools';
  import { message, Image } from 'ant-design-vue';
  import { setProductLogo } from '@/api/setting';
  export default defineComponent({
    components: {
      uploadFile,
      Image,
    },
    setup() {
      //产品名称和logo的hook
      const productLogoStore = useProductLogo();
      //图片和产品名
      const state = reactive({
        product_logo: '',
        product_name: productLogoStore.productName,
        logo_base64: '',
      });
      //不用computed
      watch(
        () => productLogoStore.productName,
        (v) => {
          state.product_name = v;
        },
      );
      //获取本地base64缓存或者pinia的缓存
      const logoUrl = computed(() => state.logo_base64 || productLogoStore.logoUrl);

      //上传之前校验
      const beforeUpload = (file: FileItem) => {
        if (isPng(file.name!)) {
          let reader = new FileReader(); //html5读文件
          reader.readAsDataURL(file as any);
          reader.onload = (e) => {
            //读取本地缓存 base64
            state.logo_base64 = e.target!.result as any;
          };

          state.product_logo = file as any;
        } else {
          message.error('请上传图片');
        }
        return false;
      };
      //保存
      const saveConfig = async () => {
        const formData = new FormData();
        //如果logo改变，传file
        if (state.logo_base64) {
          formData.append('file', state.product_logo as any);
        } else {
          state.logo_base64 = '';
        }
        formData.append('name', state.product_name as any);
        const { product_logo, product_name } = await setProductLogo(formData as any);
        productLogoStore.SetProductLogo(product_logo);
        productLogoStore.SetProductName(product_name);
      };
      return {
        ...toRefs(state),
        logoUrl,
        saveConfig,
        beforeUpload,
      };
    },
  });
</script>

<style scoped lang="less">
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .content {
    background: #fff;
    height: calc(100vh - 160px);
    border-radius: 4px;
    margin: 0 20px 20px 20px;
    .title {
      padding: 20px 20px 0 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
    .main {
      padding: 30px 20px 10px 30px;
      .formItem {
        display: flex;
        align-items: flex-start;
        margin-bottom: 25px;
        .label {
          width: 100px;
          font-size: 14px;
          font-weight: 400;
          position: relative;
          &::before {
            content: '*';
            position: absolute;
            color: red;
            left: -10px;
          }
        }
        .productName {
          width: 400px;
        }
        .upload {
          margin-bottom: 10px;
        }
        .tips {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
        }
        ::v-deep(.img) {
          width: 90px;
          height: 90px;
          margin: 0 20px 0 10px;
          border: 1px solid #eee;
          padding: 5px;
        }
      }
    }
  }
  .confirm {
    margin-left: 130px;
  }
</style>
