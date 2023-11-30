/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-24 16:18:50
 * @LastEditTime: 2022-01-24 16:46:45
 */
import { computed, defineComponent } from 'vue';
import SettingAvatar from '../setava/index.vue';
import style from './index.module.less';
import productLogo from '../logo/index.vue';
import { useProductLogo } from '@/store/modules';
import { getProductLogo } from '@/api/platform/setting';
export const layoutHeader = defineComponent({
  components: {
    productLogo,
  },
  setup() {
    const productLogoStore = useProductLogo();
    // 获取logo和名称（缓存计算属性）
    const logoUrl = computed(() => productLogoStore.logoUrl),
      product_name = computed(() => productLogoStore.productName);
    //主动获取
    const getProLogo = async () => {
      const { product_name, product_logo } = await getProductLogo();
      productLogoStore.SetProductLogo(product_logo);
      productLogoStore.SetProductName(product_name);
    };
    getProLogo();
    return () => (
      <div class={style.header}>
        <div class={style.product}>
          <productLogo logoUrl={logoUrl.value} />
          <div class={style.logo}>{product_name.value}</div>
        </div>
        <SettingAvatar />
      </div>
    );
  },
});
