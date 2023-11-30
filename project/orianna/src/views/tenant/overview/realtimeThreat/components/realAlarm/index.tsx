/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-30 22:56:24
 * @LastEditTime: 2022-06-02 14:43:46
 */
import { defineComponent, ref, PropType, watchEffect } from 'vue';
import { getTenantRealTime } from '@/api/tenant/overview';
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
      const { items } = await getTenantRealTime({tenant_id: props.tenant_id});
      sample_list.value = items || [];
    });
    return () => <realtime-table sample_list={sample_list.value} />;

    // return () => <realtime-table getTenantRealTime={getTenantRealTime} />;
  },
});
