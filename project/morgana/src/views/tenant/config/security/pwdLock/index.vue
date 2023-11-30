<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-02-24 18:30:08
-->
<template>
  <div>
    <div class="header">登录密码连续错误，将锁定登录账户</div>
    <div class="content">
      <div class="label">连续错误次数上限</div>
      <a-input-number
        class="iptNum"
        v-model:value="valueCount"
        :min="3"
        :max="10"
        placeholder="范围3-10"
      />
    </div>
    <a-button type="primary" class="addbtn" @click="confirm"> 保存并应用 </a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { updateLoginAuthApi, getLoginAuthApi } from '@/api/config';
  import { message, InputNumber } from 'ant-design-vue';
  export default defineComponent({
    components: {
      [InputNumber.name]: InputNumber,
    },
    setup() {
      //错误次数
      const valueCount = ref<number>(3);
      //保存
      const confirm = async () => {
        // 更新登录鉴别次数
        if (unref(valueCount)) {
          await updateLoginAuthApi({ maxtry: unref(valueCount) });
        } else {
          message.error('填写次数');
        }
      };

      // 获取登录鉴别次数
      const getLoginAuth = async () => {
        const { maxtry } = await getLoginAuthApi();
        valueCount.value = maxtry;
      };
      getLoginAuth();

      return {
        valueCount,
        confirm,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    height: 64px;
    border-top: 1px solid #eee;
    line-height: 64px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 500;
    color: #293038;
    margin-top: 20px;
  }
  .iptNum {
    margin-left: 8px;
    width: 120px;
  }
  .content {
    padding: 0 60px;
    display: flex;
    align-items: center;
  }
  .addbtn {
    margin-left: 60px;
    margin-top: 24px;
  }
</style>
