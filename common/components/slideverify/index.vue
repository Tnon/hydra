<template>
  <div class="jc-component__range">
    <div class="jc-range" :class="rangeStatus ? 'success' : 'unvalidate'">
      <span class="bggree"></span>
      <div @mousedown="rangeMove" @click="clickth" class="svgicon">
        <component :is="rangeStatus ? CheckCircleOutlined : DoubleRightOutlined" />
      </div>

      {{ rangeStatus ? '验证通过' : '请拖住滑块，拖动到最右边' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { CheckCircleOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    status: Boolean,
  });
  const emit = defineEmits(['update:status']);

  let disX = ref<number>(0),
    rangeStatus = ref<boolean>(false);
  const clickth = (e) => {
    e.preventDefault();
  };
  let spanEle: any = null;
  onMounted(() => {
    spanEle = document.getElementsByClassName('bggree')[0];
  });
  const rangeMove = (e) => {
    let ele = e.target;
    let startX = e.clientX;
    let eleWidth = ele.offsetWidth;
    let parentWidth = ele.parentElement.offsetWidth;
    let MaxX = parentWidth - eleWidth;
    if (rangeStatus.value) {
      return false;
    }
    document.onmousemove = (e) => {
      let endX = e.clientX;
      disX.value = endX - startX;
      if (disX.value <= 0) {
        disX.value = 0;
      }
      if (disX.value >= MaxX) {
        //减去滑块的宽度,体验效果更好
        disX.value = MaxX;
      }
      ele.style.transition = '0s all';
      spanEle.style.transition = '0s all';
      ele.style.transform = 'translateX(' + disX.value + 'px)';
      spanEle.style.width = disX.value + 'px';
      e.preventDefault();
    };
    document.onmouseup = () => {
      if (disX.value !== MaxX) {
        ele.style.transition = '.3s all';
        ele.style.transform = 'translateX(0)';
        spanEle.style.transition = '.3s all';
        spanEle.style.width = '0px';
      } else {
        rangeStatus.value = true;
        if (!props.status) {
          emit('update:status', true);
          spanEle.style.display = 'none';
        }
      }
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
</script>
<style lang="scss" scoped>
  @mixin jc-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .jc-component__range {
    background-color: #e9e9e9;
    .jc-range {
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0, #4d4d4d),
        color-stop(0.4, #4d4d4d),
        color-stop(0.5, #fff),
        color-stop(0.6, #4d4d4d),
        color-stop(1, #4d4d4d)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      transition: 1s all;
      user-select: none;
      color: #585858;
      @include jc-flex;
      height: 50px; /*no*/
      &.success {
        background: none;
        background-color: #267ee5 !important;
        color: #fff;
        -webkit-text-fill-color: unset;
        .svgicon {
          color: #267ee5;
        }
      }
      .bggree {
        position: absolute;
        left: 0;
        background: #267ee5;
        height: 100%;
        width: 0;
      }
      .svgicon {
        position: absolute;
        left: 0;
        width: 50px; /*no*/
        height: 100%;
        color: #267ee5;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        cursor: pointer;
        font-size: 24px;
        @include jc-flex;
        z-index: 11;
      }
      .svgicon::after {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        // background: red;
      }
    }
  }
  .unvalidate {
    animation: transform 3s infinite;
    background: #e9e9e9;
  }
  @keyframes transform {
    from {
      background-position: -100px 0;
    }

    to {
      background-position: 100px 0;
    }
  }
</style>
