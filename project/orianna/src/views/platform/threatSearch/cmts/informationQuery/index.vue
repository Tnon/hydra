<template>
  <div class="container">
    <!-- 标题和查询 start -->
    <div class="header">
      <div class="title">威胁情报查询</div>
      <input-search
        v-model:value="search_data"
        placeholder="请输入需要查询的IP/URL/域名/MD5/SHA256/SHA1"
        @search="searchReport"
      />
      <div class="line"></div>
    </div>
    <!-- 标题和查询 end -->
    <!-- 查询结果 start -->
    <div class="content" :class="{ center: !is_have_result }">
      <div v-if="is_have_result">
        <template v-if="is_have_yisuo_result">
          <moduleHeader id="yisuo_report" />
          <notice-report
            :yisuoData="yisuo_report_result"
            :moduleLableNames="labelNames['yisuo_report']"
          />
        </template>
        <template v-else>
          <template v-for="(item, key) in jsonData" :key="key">
            <moduleHeader :id="key + ''" />
            <component
              :is="components[key]"
              :moduleLableNames="labelNames[key]"
              class="moduleContent"
              :moduleData="item"
            />
          </template>
        </template>
      </div>
      <div v-else>
        <no-result />
      </div>
    </div>
    <!-- 查询结果 end -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, provide, nextTick } from 'vue';
import { InputSearch } from '@hydra/components/input-search';
import noticeReport from '@hydra/components/noticeReport';
import { getThreatSearch } from '@/api/platform/threat';
import noResult from '@hydra/components/noResult';
import components from '@hydra/components/modules';
import { labelNames } from '@hydra/components/reportTitle';
import { moduleHeader } from './cmts/header';
const props = defineProps({
  inputValue: String,
});
const emit = defineEmits(['update:inputValue']);
// 搜索的关键字
// const search_data = ref('');
const search_data = computed({
  get: () => props.inputValue!,
  set: (v) => {
    emit('update:inputValue', v);
    return v;
  },
});
provide('OpenAllAction', false);
// 数据
const jsonData = ref<any>({});

//是否有结果
const is_have_result = ref<boolean>(false);

//是否有一所数据
const is_have_yisuo_result = ref<boolean>(false);

//一所数据
const yisuo_report_result = ref({});

// 搜索报告
const searchReport = async () => {
  await nextTick();
  const {
    auto_report,
    expert_value,
    expert_report,
    sample_name,
    yisuo_report,
    auto_value,
    is_have,
    only_yisuo,
    netuse_report,
  } = await getThreatSearch({
    search_data: search_data.value,
  });
  //是否有结果
  is_have_result.value = is_have;
  //是否有一所数据
  is_have_yisuo_result.value = only_yisuo;
  //自动分析分值大于-1 则有专家分析
  if (expert_value !== -1) {
    jsonData.value = {
      expert_report: {
        ...expert_report,
        expert_value,
      },
      ...JSON.parse(auto_report),
    };
  } else {
    jsonData.value = JSON.parse(auto_report);
  }
  yisuo_report_result.value = JSON.parse(yisuo_report);
  Object.assign(yisuo_report_result.value, { netuse_report: JSON.parse(netuse_report) });

  Object.assign(jsonData.value, {
    yisuo_report: Object.assign(JSON.parse(yisuo_report), {
      netuse_report: JSON.parse(netuse_report),
    }),
  });

  // 删除 threat_hit 属性;
  delete jsonData.value.threat_hit;

  //整合数据
  if (jsonData.value.outline) {
    jsonData.value.outline.sample_name = sample_name;
    jsonData.value.outline!.sample_score = auto_value;
  }
};
defineExpose({ searchReport });
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: 600;

    .title {
      margin-bottom: 15px;
    }

    .line {
      width: 100%;
      height: 1px;
      background: #eee;
      margin-top: 50px;
    }
  }

  .content {
    width: 100%;
    min-height: calc(100vh - 736px); // 设置最小高度，撑起盒子
    flex: 1;
    align-items: center;
  }

  .moduleContent {
    margin-bottom: 20px;
    background: #fff;
    padding: 0 20px 20px 20px;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
