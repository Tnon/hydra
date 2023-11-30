/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-27 15:40:36
 * @LastEditTime: 2022-04-22 14:19:59
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import { configSvgIconsPlugin } from './svgSprite';

import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
export function useVitePlugins(viteEnv: ViteEnv, isProduction: boolean): any {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DEL_SOURCE_FILE } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
  ];

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());
  // rollup-plugin-gzip
  isProduction &&
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DEL_SOURCE_FILE),
    );
  return vitePlugins;
}
