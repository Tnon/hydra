<template>
  <div class="header">
    <span class="title" @click="linkTo">
      <custom-icon class="iconcus" type="#axysxxiangzuo" />
      {{ device_code }}
    </span>
    <div class="pikerBoder">
      <a-range-picker
        :bordered="false"
        class="datePiker"
        v-model:value="date_range"
        show-time
        @change="ok"
        :format="dateFormat"
      >
        <template #separator>
          <span style="color: #293038">至</span>
        </template>
      </a-range-picker>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { Dayjs } from 'dayjs';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      [DatePicker.RangePicker.name]: DatePicker.RangePicker,
    },
    props: {
      device_code: String,
      state: {
        type: Object,
        required: true,
      },
      refreshTable: {
        type: Function,
      },
    },
    setup(props) {
      //路由器
      const route = useRouter();
      //时间格式
      const dateFormat = 'YYYY-MM-DD HH:mm:ss';
      //时间范围
      const date_range = ref<Dayjs[]>([]);
      //刷表
      //时间确定按钮
      const ok = (v) => {
        if (v && v.length) {
          const [start, end] = v;
          props.state.date_range = start.format(dateFormat) + ',' + end.format(dateFormat);
        } else {
          props.state.date_range = '';
        }
        props.refreshTable!();
      };
      const linkTo = () => {
        route.push({
          name: 'authorization-morganna',
        });
      };
      return {
        date_range,
        ok,
        linkTo,
        dateFormat,
      };
    },
  });
</script>

<style scoped lang="less">
  .header {
    flex: 80px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .title {
      cursor: pointer;
      font-size: 18px;
      font-weight: 500;
      color: #293038;
      display: flex;
      align-items: center;
      .iconcus {
        font-size: 25px !important;
        margin-right: 10px;
      }
    }
    .pikerBoder {
      border: 1px solid #d9d9d9;
      transition: all 0.4s;
      padding-left: 20px;
      &:hover {
        border-color: #40a9ff;
      }
      :deep(.ant-picker-suffix) {
        position: absolute;
        left: -10px;
      }
    }
  }
</style>
