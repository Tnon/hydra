<template>
  <div>
    <report-header
      :sampleName="state[0].value"
      :canDownLoadReport="false"
      :sample_path="sample_path"
    />
    <div class="content">
      <!-- 自动分析摘要 start -->
      <div class="auto">
        <!-- title start -->
        <div class="header">自动分析概要</div>
        <!-- title end -->
        <div class="main">
          <!-- 分数 start -->
          <riskCount :count="risk_count" :title="risk_title" class="riskcount" />
          <!-- 分数 end -->
          <!-- 样本详情 start -->
          <div class="report">
            <div class="formItem" v-for="{ title, value } in state" :key="title">
              <div class="label">{{ title }}</div>
              <div class="value">{{ value }}</div>
            </div>
          </div>
          <!-- 样本详情 end -->
        </div>
      </div>
      <!-- 自动分析摘要 end -->
      <!-- 表格 start -->
      <div class="datatable">
        <div class="header">
          <span class="title">分析列表</span>
          <input-search
            v-model:value="search_data"
            placeholder="请输入关键字"
            @search="refreshTable"
          />
        </div>
        <slots-table
          :scroll="{ y: 'calc(100vh - 260px)' }"
          ref="tableRef"
          :columns="columns"
          class="content"
          row-key="id"
          :arguments="agms"
          :get-list-func="getZipList"
        />
      </div>
      <!-- 表格 end -->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, unref } from 'vue';
  import { riskCount } from '@hydra/components/risk-count';
  import { InputSearch } from '@hydra/components/input-search';
  import { useColumns } from './index';
  import { Router, useRoute, useRouter } from 'vue-router';
  import { SlotsTable } from '@/components/slots-table';
  import { getZipList, getZipInfo } from '@/api/platform/sample';
  // import reportHeader from '@/views/platform/sample/components/header';
  import reportHeader from '@/components/reportHeader'; // reportHeader提取到components中
  export default defineComponent({
    components: {
      riskCount,
      InputSearch,
      reportHeader,
      SlotsTable,
    },
    setup() {
      // 样本下载地址
      const sample_path = ref('');
      const {
        query: { id },
      } = useRoute();
      //风险值
      const risk_count = ref(0);
      const risk_title = ref('风险值');
      // 基本信息
      const state = ref<any>([
        {
          title: '样本名称',
          value: '',
          key: 'sample_name',
        },
        {
          title: '文件数',
          value: 0,
          key: 'file_num',
        },
        {
          title: '报告数',
          value: 0,
          key: 'report_num',
        },
        {
          title: '生成时间',
          value: '',
          key: 'generate_time',
        },
      ]);
      //table dom
      const tableRef = ref<any>(null);
      //路由
      const router: Router = useRouter();
      // 列
      const columns = useColumns(router);
      if (!id) {
        router.push({
          name: 'analysts-sample',
        });
      }
      //搜索数据源
      const agms = reactive<{ search_data: string; id: any }>({
        search_data: '',
        id,
      });

      //获取基本信息
      const getInfo = async () => {
        const { risk_value, sample_path_bak, ...res } = await getZipInfo({ id });
        state.value.forEach((ele) => {
          ele.value = res[ele.key];
        });
        risk_count.value = risk_value;
        sample_path.value = sample_path_bak ?? '';
      };
      getInfo();
      //搜索
      const refreshTable = () => {
        unref(tableRef).refreshTableData();
      };
      return {
        ...toRefs(agms),
        state,
        refreshTable,
        agms,
        columns,
        risk_count,
        tableRef,
        getZipList,
        sample_path,
        risk_title,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    width: 1200px;
    margin: 0 auto;
  }
  .auto {
    padding: 20px 30px;
    background: #fff;
    border-radius: 4px;

    .header {
      font-size: 16px;
      font-weight: 500;
      color: rgba(41, 48, 56, 0.85);
      margin-bottom: 20px;
    }
    .main {
      display: flex;
      align-items: center;
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
        }
      }
    }
  }
  .datatable {
    margin-top: 20px;
    background: #fff;
    border-radius: 4px;
    .header {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(41, 48, 56, 0.85);
    }
  }
</style>
