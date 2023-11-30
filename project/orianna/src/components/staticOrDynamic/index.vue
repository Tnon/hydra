<template>
  <div :class="backgroundColor">
    <div class="title">{{ type === 'static' ? '静态类情报' : '动态类情报' }}</div>
    <div class="content">
      <div v-for="(item, index) in renderList" :class="index ? 'leftBorder' : 'box'">
        <!-- <div v-if="index" class="line"></div> -->
        <div class="label">{{ `${item.label}:` }}</div>
        <div class="value">{{ valueObj[item.key] }}</div>
      </div>
    </div>
  </div>
</template>>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, onMounted, provide, computed } from 'vue';
  import { requestStaticThreat, requestDynimicThreat } from '@/api/public';

  const staticData = [
    {
      key: 'ip',
      label: 'IP情报数',
    },
    {
      key: 'domain',
      label: '域名情报数',
    },
    {
      key: 'url',
      label: 'URL情报数',
    },
    {
      key: 'hash',
      label: '哈希情报数',
    }
  ];
  const dynamicData = [
    {
      key: 'malignity_threat',
      label: '恶意行为情报数',
    }
  ];
  export default defineComponent({
    name: 'staticOrDynamic',
    props: {
      type: {
        type: String,
        default: 'Static',
      },
      thirdparty: {
        type: Number,
        default: 0,
      },
      backgroundColor: {
        type: String,
        dafault: 'black',
      }
    },
    setup(props, { emit }) {
      const state = reactive({
        renderList: props.type === 'static' ? staticData : dynamicData,
        valueObj: {
          ip: 0,
          domain: 0,
          url: 0,
          hash: 0,
          // 以上四个数据通过静态类情报接口获得
          // 下面的动态类情报通过动态类情报接口获得
          malignity_threat: 0, // 动态类情报/恶意样本数
        },
      });

      // 调接口获取静态情报数
      async function getStaticThreat() {
        const resObj = await requestStaticThreat();
        emit('update:thirdparty', resObj.total), // 将静态类情报总数传入父组件
        Object.assign(state.valueObj, resObj); // 将获取的各类情报（IP，domin等）赋给valueObj
      }

      // 调接口获取动态情报数
      async function getDynimicThreat() {
        const { count } = await requestDynimicThreat();
        state.valueObj.malignity_threat = count;
      }

      onMounted(() => {
        if (props.type === 'static') {
          getStaticThreat();
        } else {
          getDynimicThreat();
        }
      });

      return {
        ...toRefs(state),
      }
    },
  });
</script>

<style lang="scss" scoped>
  // 公用样式
  %public {
    width: 100%;
    // height: 120px;
    padding: 10px 18px;
    margin-bottom: 10px;
      
    .title {
      font-size: 16px;
      font-weight: 600;
      // color: #fff;
      margin-bottom: 10px;
    }

    .content {
      display: flex;
      // justify-content: space-between;

      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;

        // .line {
        //   width: 2px;
        //   height: 40px;
        //   background: rgba(255, 255, 255, 0.09);
        //   margin-right: 50px;
        // }

        .label {
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
        }
        .value {
          @extend .label;
          margin-left: 10px;
        }
      }

      // 除第一个之外的盒子显示左侧边框，实现中间分隔的效果
      .leftBorder {
        @extend .box;
      }
    }
  }

  // 黑色主题（用于样本聚类分析中）
  .black {
    @extend %public;
    height: 120px;
    color: #fff;
    background: rgba(255, 255, 255, 0.08);

    .leftBorder {
      border-left: 2px solid rgba(255, 255, 255, 0.09);
    }
  }

  // 白色主题（用于威胁情报查询中）
  .white {
    @extend %public;
    height: 100px;
    background: rgba(255, 255, 255, 1);

    .leftBorder {
      border-left: 2px solid rgba(0, 0, 0, 0.09);
    }
  }
</style>