import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';
import type { IProductLogo } from './type';

export const productLogo = defineStore('product-logo', () => {
  const state = reactive<IProductLogo>({
    logoUrl: '',
    productName: '',
  });
  function SetProductLogo(url: string): void {
    state.logoUrl = url;
  }
  function SetProductName(name: string): void {
    state.productName = name;
  }
  return {
    ...toRefs(state),
    SetProductLogo,
    SetProductName,
  };
});
