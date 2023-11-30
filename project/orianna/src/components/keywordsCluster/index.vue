<template>
  <div class="content">
    <div class="header">关键字提取聚类TOP5</div>
    <div class="main">
      <div v-for="(item, index) in columns" :key="item.title" class="box">
        <div class="title">{{ item.title }}</div>
        <div v-for="(ele, i) in keywordObj[item.dataIndex]" :key="ele.key_word" class="list">
          <div :title="ele.key_word" class="label">{{ ele.key_word }}</div>
          <div class="value">{{ ele.total}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, PropType, watchEffect } from 'vue';

  const columns = [
    {
      title: "域名",
      dataIndex: "domain",
      width: 150,
    },
    {
      title: "启动项",
      dataIndex: "startUp",
      width: 150,
    },
    {
      title: "注册表",
      dataIndex: "registry",
      width: 150,
    },
    {
      title: "挖矿特征",
      dataIndex: "mining",
      width: 150,
    },
  ];
  
  // 接收参数
  const props = defineProps({
    filters: {
      type: Object as PropType<API.HomeFilter>,
      required: true,
    },
    requsteFunc: {
      type: Function,
    },
  });

  const keywordObj = ref({});

  watchEffect(async() => {
    keywordObj.value = await props.requsteFunc!(props.filters);
  });
</script>
<style lang="scss" scoped>
  .content {
    height: 350px;
    width: 100%;
    display: flex;
    padding-bottom: 10px;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.08);

    .header {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      line-height: 24px;
      margin-bottom: 15px;
      padding: 20px 20px 0 20px;
    }

    .main {
      display: flex;
      // justify-content: space-between;

      .box {
        width: 25%; // 用flex: 1会出现超出容器的问题
        // flex: 1;
        padding-left: 20px;

        .title {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          line-height: 40px;
          height: 40px;
          padding-left: 10px;
          background: rgba(255, 255, 255, 0.08);
          border-left: 4px solid #0050ad;
        }

        .list {
          display: flex;
          margin: 10px 0 10px 15px;
          justify-content: flex-start;
          font-size: 14px;
          font-weight: 400;
          color: #fff;

          .label {
            flex: 0 0 80%;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .value {
            padding-left: 20px;
          }
        }
      }
    }
  }
</style>
