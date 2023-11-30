<template>
  <div :class="backgroundColor">
    <div class="blueTag"></div>
    <div class="box">
      <div class="title">威胁情报总数</div>
      <div class="value">{{ ownThreat + otherThreat }}</div>
    </div>
    <div class="line"></div>
    <div class="box">
      <div class="title">自有情报</div>
      <div class="value">{{ ownThreat }}</div>
    </div>
    <div class="box">
      <div class="title">第三方情报</div>
      <div class="value">{{ otherThreat }}</div>
    </div>
  </div>
</template>>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { requestOwnThreat } from '@/api/public';
export default defineComponent({
  name: 'threatTotal',
  props: {
    thirdpartySon: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  setup(props) {
    const state = reactive({
      ownThreat: 0,
      otherThreat: 0,
    });

    const getOwnThreat = async () => {
      const { own_threat_num } = await requestOwnThreat();
      state.ownThreat = own_threat_num;
    }
    watchEffect(() => {
      state.otherThreat = props.thirdpartySon;
    })
    getOwnThreat();
    return {
      ...toRefs(state),
    }
  },
});
</script>

<style lang="scss" scoped>
%public {
  padding-right: 60px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  // height: 130px;

  .box {
    padding: 30px 0;
    margin-left: 30px;
    // flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 30%;

    .title {
      margin-bottom: 14px;
      font-size: 14px;
      font-weight: 400;
      // color: #fff;
    }

    .value {
      font-size: 18px;
      font-weight: 600;
      // color: #fff;
    }
  }

  .blueTag {
    width: 20px;
    // height: 100px;
    background: #0050ad;
    margin-right: 20px;
  }

  .line {
    width: 2px;
    height: 100px;
    background: rgba(255, 255, 255, 0.09);
    margin-top: 15px;
    margin-right: 20px;
  }
}

.black {
  @extend %public;
  height: 130px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.08);
}

.white {
  @extend %public;
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
}
</style>