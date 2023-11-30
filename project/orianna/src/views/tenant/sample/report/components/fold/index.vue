<!--
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-02-19 13:52:11
 * @LastEditTime: 2022-05-19 15:21:10
-->
<template>
  <div class="fold" @click="collFold">
    <!-- 折叠图标 start -->
    <div>
      <right-outlined
        class="foldIcon"
        :class="{ folded: !isCollapse, cantColl: record.length < 2 }"
      />
    </div>
    <!-- 折叠图标 end -->
    <!-- label start -->
    <div class="label" :class="{ isSuggest }">
      <span>
        {{ labelName }}
      </span>
    </div>
    <!-- label end -->
    <!-- 类型 start -->
    <template v-if="isCollapse && record.length > 1">
      <div class="foldedMsg" :class="{ isSuggestMsg: isSuggest }">
        {{ isSuggest ? record.length + '个处置项' : record.length + '个风险项' }}
      </div>
    </template>
    <div class="supsFlex" v-else>
      <template v-for="item in record" :key="item.title">
        <div class="recordItem" :class="{ isSuggestRecord: isSuggest }">
          <div class="recordLabel">{{ item.title }}</div>
          <div class="recordInfo">{{ item.info }}</div>
        </div>
      </template>
    </div>

    <!-- 类型 end -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, inject, ref, unref, watch, watchEffect, PropType } from 'vue';
  import { RightOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      RightOutlined,
    },
    props: {
      labelName: String,
      record: {
        type: Array as PropType<{ title: string; info: string }[]>,
        required: true,
      },
    },
    setup(props) {
      const isSuggest = ref(false);
      watchEffect(() => {
        isSuggest.value = props.labelName === '处置建议';
      });
      //是否折叠
      const isCollapse = ref<boolean>(false);
      //折叠事件
      const collFold = () => {
        if (props.record!.length > 1) {
          isCollapse.value = !isCollapse.value;
        }
      };
      //展开
      const isOpenAllCollpase = inject('OpenAllAction');
      //手动展开所有
      watch(
        () => unref(isOpenAllCollpase),
        () => {
          isCollapse.value = false;
        },
      );
      return {
        isCollapse,
        collFold,
        isSuggest,
      };
    },
  });
</script>
<style lang="less" scoped>
  .foldIcon {
    cursor: pointer;
    transition: all 0.3s;
    font-size: 12px;
    margin-right: 16px;
  }
  .folded {
    transform: rotateZ(90deg);
  }
  .cantColl {
    cursor: not-allowed;
    color: #aaa;
  }
  .fold {
    display: flex;
    padding-top: 20px;
    align-items: flex-start;
    border-bottom: 1px solid #eee;
    .label {
      font-size: 12px;
      font-weight: 400;
      color: #ff3543;
      flex: 110px 0 0;
      display: flex;
      margin-bottom: 20px;
      span {
        background: rgba(255, 53, 67, 0.1);
        padding: 4px 8px;
      }
    }
    .isSuggest {
      color: #34a753;
      span {
        background: rgba(52, 167, 83, 0.1);
      }
    }
    .foldedMsg {
      color: #ff3543;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 20px;
    }
    .isSuggestMsg {
      color: #34a753;
    }
    .supsFlex {
      flex: 1;
      .recordItem {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 20px;
        .recordLabel {
          flex: 280px 0 0;
          color: #ff3543;
        }
        .recordInfo {
          color: rgba(41, 48, 56, 0.85);
        }
      }
      .isSuggestRecord {
        .recordLabel {
          color: #34a753;
        }
      }
    }
  }
</style>
