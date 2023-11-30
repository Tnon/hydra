import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import { IExclude } from './type';

export const selectAll = defineStore('select-all', () => {
  const state = reactive<IExclude>({
    exclude: [],
    isSelectAll: false,
    isCheck: false,
  });
  function AddExclude(hostIds: string[]) {
    state.exclude = state.exclude.concat(hostIds);
  }
  function DelExclude(hostId: string) {
    state.exclude.splice(
      state.exclude.findIndex((item) => item === hostId),
      1,
    );
  }
  function InitExclude() {
    state.exclude = [];
  }
  function setIselectAll(type: boolean) {
    state.isSelectAll = type;
  }
  function setIsCheck(type: boolean) {
    state.isCheck = type;
  }
  return {
    ...toRefs(state),
    AddExclude,
    DelExclude,
    InitExclude,
    setIselectAll,
    setIsCheck,
  };
});
