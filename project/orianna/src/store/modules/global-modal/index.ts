import { defineStore } from 'pinia';
import { reactive, VNode, toRefs } from 'vue';
import type { IGlobalModal } from './type';
// export const globalModal = defineStore({
//     id: 'gloabal-model',
//     state: (): IGlobalModal => ({
//         modalValue: null
//     }),
//     actions: {
//         SetGlobalModal(value: VNode | null) {
//             this.modalValue = value
//         }
//     }
// })
export const globalModal = defineStore('gloabal-model', () => {
  const state = reactive<IGlobalModal>({
    modalValue: null,
  });
  const SetGlobalModal = (value: VNode | null) => {
    state.modalValue = value;
  };
  return {
    ...toRefs(state),
    SetGlobalModal,
  };
});
