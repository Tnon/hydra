/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-30 22:56:24
 * @LastEditTime: 2022-06-02 14:43:46
 */
import { defineComponent, ref, PropType, watchEffect } from 'vue';
import { getRealTimeAlarm } from '@/api/overview';
import { realtimeTable } from '@hydra/components/localRealtime';

export const realAlarm = defineComponent({
  components: { realtimeTable },
  // 本地沙箱暂不区分租户
  // props: {
  //   tenant_id: {
  //     required: true,
  //   },
  // },
  

  setup(props) {
    const sample_list = ref<any>([]);

    watchEffect(async () => {
      // 本地沙箱暂不区分租户
      // const { items } = await getRealTimeAlarm({tenant_id: props.tenant_id});
      const { items } = await getRealTimeAlarm({tenant_id: ''});
      sample_list.value = items;
    });
    return () => <realtime-table sample_list={sample_list.value} />;

    // return () => <realtime-table getTenantRealTime={getTenantRealTime} />;
  },
});
