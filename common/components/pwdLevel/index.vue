<template>
  <div class="pwdcheck">
    <div class="title_">密码至少包含</div>
    <ul>
      <li :class="{ active: low }"> <CheckCircleOutlined class="checkIcon" />8-20个字符 </li>
      <li :class="{ active: middle }">
        <CheckCircleOutlined class="checkIcon" />必须包含字母、数字、特殊字符
      </li>
      <li :class="{ active: high }">
        <CheckCircleOutlined class="checkIcon" />密码不能与登录账户相似
      </li>
    </ul>
    <div class="pwd_check">
      密码强度验证：
      {{ level === 1 ? '低' : level === 2 ? '中' : level === 3 ? '高' : '低' }}
    </div>
    <div class="three_c">
      <span
        :class="{
          low: level === 1,
          middle: level === 2,
          high: level === 3,
        }"
      ></span>
      <span
        :class="{
          middle: level === 2,
          high: level === 3,
        }"
      ></span>
      <span :class="{ high: level === 3 }"></span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      CheckCircleOutlined,
    },
    props: {
      level: Number,
      low: Boolean,
      middle: Boolean,
      high: Boolean,
    },
  });
</script>

<style lang="less" scoped>
  .pwdcheck {
    padding: 10px 15px;

    .title_ {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 5px;
    }

    .pwd_check {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      letter-spacing: 0;
      margin-top: 10px;
    }

    .three_c {
      span {
        display: inline-block;
        width: 33.33%;
        height: 5px;
        background: #eee;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        padding: 5px 0;
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        .checkIcon {
          margin-right: 8px;
        }
      }
    }
  }
  .active {
    color: #16b66b !important;
  }
  .low {
    background: #f53d45 !important;
  }

  .middle {
    background: #f0bc24 !important;
  }

  .high {
    background: #16b66b !important;
  }
</style>
