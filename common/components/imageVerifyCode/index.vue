<template>
  <div class="content">
    <canvas ref="verify" :width="width" :height="height"></canvas>
    <div @click="changeOne" class="textButton">看不清，换一张?</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted, toRefs, watch } from 'vue';

  export default defineComponent({
    components: {},
    props: {
      verifyCode: {
        type: String,
        required: true,
      }
    },
    setup(props, { emit }) {
      const verify = ref<any>(null);
      const state = reactive({
        width: 220,
        height: 40,
      });

      onMounted(() => {
        // 初始化绘制图片验证码
        drawPicture();
      });

      // 监听父组件传来的验证码
      watch(() => props.verifyCode, () => {
        drawPicture();
      });

      // 更换验证码
      const changeOne = () => {
        // emit('updateVerifyCode', randomNum(0, 9));
        emit('updateVerifyCode');
      }

      // 生成随机数
      const randomNum = (min, max) => {
        return parseInt(Math.random() * (max - min) + min);
      }

      // 生成随机颜色
      const randomColor = (min, max) => {
        const r = randomNum(min, max);
        const g = randomNum(min, max);
        const b = randomNum(min, max);
        return `rgb(${r},${g},${b})`;
      }

      // 绘制图片
      const drawPicture = () => {
        // 获取画布
        const ctx = verify.value.getContext('2d');
        // 填充颜色
        ctx.fillStyle = randomColor(180, 230);
        // 填充的位置
        ctx.fillRect(0, 0, state.width, state.height);

        drawText(ctx); // 绘制文字（随机颜色、随机旋转、字符依序展示）
        drawLine(ctx); // 绘制干扰线
        drawDot(ctx); // 绘制干扰点
      };

      // 绘制文字（会在绘制图片时调用）
      const drawText = (ctx) => {
        // 将父祖件传来的验证码分成单个字符，并且每个都随机旋转
        for (let i = 0; i < props.verifyCode.length; i++) {

          const text = props.verifyCode[i];
          /*
          * 绘制文字并让文字在不同的位置显示的思路 :
          * 1、定义字体
          * 2、定义对齐方式
          * 3、填充不同的颜色
          * 4、保存当前的状态（以防止以上的状态受影响）
          * 5、平移translate()
          * 6、旋转 rotate()
          * 7、填充文字
          * 8、restore出栈
          * */
          // 随机的字体大小
          const fontSize = randomNum(32, 50);
          // 字体随机的旋转角度
          const deg = randomNum(-50, 50);

          ctx.font = fontSize + 'px Simhei'; // 字体大小和字体family
          ctx.textBaseline = 'top';
          ctx.fillStyle = randomColor(80, 150);
          /*
          * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
          * 这就允许您临时地改变图像状态，
          * 然后，通过调用 restore() 来恢复以前的值。
          * save是入栈，restore是出栈。
          * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。
          * restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
          * */
          ctx.save();
          ctx.translate(40 * i + 50, 15); // 坐标原点，字体相对原点平移距离，靠后的字符排在后面
          ctx.rotate((deg * Math.PI) / 180); // 随机旋转
          // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
          // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
          // context.fillText(text,x,y,maxWidth);
          ctx.fillText(text, -10, -15);
          ctx.restore();
        }
      };

      // 随机绘制5条干扰线
      const drawLine = (ctx) => {
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height))
          ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height))
          ctx.strokeStyle = randomColor(180, 230)
          ctx.closePath()
          ctx.stroke()
        }
      };
      // 随机绘制40个干扰点
      const drawDot = (ctx) => {
        for (let i = 0; i < 40; i++) {
          ctx.beginPath()
          ctx.arc(randomNum(0, state.width), randomNum(0, state.height), 1, 0, 2 * Math.PI)
          ctx.closePath()
          ctx.fillStyle = randomColor(150, 200)
          ctx.fill()
        }
      }
      return {
        ...toRefs(state),
        verify,
        changeOne,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .textButton {
      width: 100px;
      cursor: pointer;
      &:hover {
        color: #267ee5;
      }
    }
  }
</style>
