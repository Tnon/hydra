<template>
  <div class="content" id="scrollDom">
    <reportHeader
      @openCollapse="openCollapse"
      :sampleName="sample_name"
      canDownLoadReport
      :sample_path="sample_path"
    />
    <div class="reportDetail">
      <!-- 目录 start -->
      <div class="menu">
        <Affix :offset-top="10" :target="getTarget">
          <template v-for="(item, key) in jsonData" :key="key">
            <div @click="scrollTo(key)" class="menuItems">
              {{ labelNames[key]['labelName'] }}
            </div>
          </template>
        </Affix>
        <!-- 目录 end -->
      </div>
      <!-- 报告详情 start -->
      <div class="main">
        <div id="pdfDom">
          <template v-for="(item, key) in jsonData" :key="key">
            <moduleHeader :id="key + ''" />
            <component
              :is="key"
              :moduleLableNames="labelNames[key]"
              class="moduleContent"
              :moduleData="item"
            />
          </template>
        </div>
      </div>
      <!-- 报告详情 end -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, provide, ref } from 'vue';
  import { Affix } from 'ant-design-vue';
  import { labelNames, useOpenColl } from '@hydra/components/reportTitle';
  import components from '@hydra/components/modules';
  import { moduleHeader } from './components/header';
  import { useRoute, useRouter } from 'vue-router';
  import { getReportInfo } from '@/api/platform/sample';
  // import reportHeader from '../components/header';
  import reportHeader from '@/components/reportHeader'; // reportHeader提取到components中
  import { FILETYPE } from '@/enums/fileType';

  export default defineComponent({
    components: {
      ...components,
      reportHeader,
      moduleHeader,
      Affix,
    },
    setup() {
      //是否全部展开
      const [isOpenAllCollpase, openCollapse] = useOpenColl();
      provide('OpenAllAction', isOpenAllCollpase);
      // 样本下载地址
      const sample_path = ref('');
      const currentRouter = useRoute(),
        router = useRouter();
      //报告的json
      const jsonData = ref<any>({});
      //锚点跳转
      const scrollTo = (id) => {
        let anchorElement = document.getElementById(id);
        if (anchorElement) {
          anchorElement.scrollIntoView();
        }
      };
      //样本名称
      const sample_name = ref<string>(currentRouter.query.name as string);
      //fix容器
      const getTarget = (): any => document.getElementById('scrollDom');

      //获取报告详情
      const getReport = async () => {
        if (currentRouter.query.id) {
          const {
            auto_report,
            expert_value,
            expert_report,
            detail_path,
            sample_name,
            sample_ext,
            yisuo_report,
            auto_value,
            netuse_report,
            sample_path: sample_path_res,
          } = await getReportInfo({
            id: currentRouter.query.id,
          });
          //自动分析分值大于-1 则有专家分析
          if (expert_value !== -1) {
            jsonData.value = {
              expert_report: {
                ...expert_report,
                detail_path,
                expert_value,
              },
              ...JSON.parse(auto_report),
            };
          } else {
            jsonData.value = JSON.parse(auto_report);
          }

          // 删除 threat_hit 属性;
          delete jsonData.value.threat_hit;
          Object.assign(jsonData.value, {
            yisuo_report: Object.assign(JSON.parse(yisuo_report), {
              netuse_report: JSON.parse(netuse_report),
            }),
          });
          // 发现{{ item.risk_category }}外联地址{{ item.address }} ，归属地为{{ item.country }}
          //整合数据
          jsonData.value.outline.sample_name = sample_name;
          jsonData.value.outline.sample_score = auto_value;
          jsonData.value.outline.sample_ext = FILETYPE['file-' + sample_ext];
          sample_path.value = sample_path_res;
        } else {
          router.push({
            name: 'platform-sample',
          });
        }
      };
      getReport();
      return {
        scrollTo,
        jsonData,
        getTarget,
        sample_name,
        labelNames,
        sample_path,
        openCollapse,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    width: 90%;
    padding: 20px 0;
    margin: 0 auto;
    height: calc(100vh - 80px);
    // overflow: auto;
    .reportDetail {
      display: flex;
      .menu {
        flex: 250px 0 0;
        .menuItems {
          height: 40px;
          line-height: 40px;
          padding-left: 30px;
          margin: 10px 0;
          font-size: 14px;
          font-weight: 400;
          color: rgba(41, 48, 56, 0.85);
          cursor: pointer;
        }
      }
      .main {
        height: calc(100vh - 160px);
        overflow: auto;
        flex: 1;
        .node {
          height: 400px;
          border: 1px solid #eee;
        }
      }
    }
    .moduleContent {
      margin-bottom: 20px;
      background: #fff;
      padding: 0 20px 20px 20px;
    }
    .showAll {
      width: 80px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border: 1px #d9d9d9 solid;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
</style>
