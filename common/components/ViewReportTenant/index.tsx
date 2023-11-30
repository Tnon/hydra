/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-18 11:37:34
 * @LastEditTime: 2022-04-20 20:05:39
 */
import { AutoStatus, ExpertStatus, IsCompress } from '../enums/statusEnum';
import { computed, createVNode, defineComponent, PropType, ref, unref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
export const ViewReportTenant = defineComponent({
  props: {
    auto_status: Number as PropType<AutoStatus>,
    is_compress: Number as PropType<IsCompress>,
    sample_id: [String, Number],
    sample_name: String,
    expert_status: Number as PropType<ExpertStatus>,
  },
  setup(props) {
    const router = useRouter();
    const canViewReport = ref(false);
    watchEffect(() => {
      //只有自动检测成功或失败时候，能查看报告
      canViewReport.value =
        props.auto_status === AutoStatus.AutoStatusOK ||
        props.auto_status === AutoStatus.AutoStatusFail;
    });
    //是否为分析中
    const isZip = computed(() => props.is_compress === IsCompress.ZIP);
    return () =>
      createVNode(
        'span',
        {
          style: unref(canViewReport)
            ? {
                cursor: 'pointer',
                color: '#267EE5',
              }
            : {
                cursor: 'not-allowed',
                color: '#aaa',
              },
          onClick: () => {
            unref(canViewReport) &&
              router.push({
                name: unref(isZip) ? 'tenant-compress' : 'tenant-report',
                query: {
                  id: props.sample_id,
                  expert_status: unref(isZip) ? undefined : props.expert_status,
                  name: unref(isZip) ? undefined : props.sample_name,
                },
              });
          },
        },
        unref(canViewReport) ? '查看报告' : '-',
      );
  },
});
