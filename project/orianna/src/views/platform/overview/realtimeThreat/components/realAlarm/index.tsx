/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-30 22:56:24
 * @LastEditTime: 2022-06-02 14:40:31
 */
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { getRealTime } from '@/api/platform/overview';
import { realtimeTable } from '@hydra/components/realtimeTable';

export const realAlarm = defineComponent({
  components: { realtimeTable },
  props: {
    tenant_id: {
      required: true,
    },
  },

  setup(props) {
    const sample_list = ref<any>([]);

    watchEffect(async () => {
      const { items } = await getRealTime({tenant_id: props.tenant_id});
      sample_list.value = items || [];
    });
    return () => <realtime-table sample_list={sample_list.value} />;
    // return () => <realtime-table getTenantRealTime={getRealTime} />;
  },
});
