/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 14:51:30
 * @LastEditTime: 2022-04-22 14:14:56
 */

import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv, OUTPUT_DIR } from '../../common/build/utils';
import { createProxy } from '../../common/build/vite/proxy';
import { useVitePlugins } from '../../common/build/vite/plugins';
import modifyVars from '../../common/build/modifyVars';
export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, resolve(__dirname, '../../'));

  const viteEnv = wrapperEnv(env);
  console.log(viteEnv);
  const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_PORT_MORGANA, VITE_PROXY_MORGANA } = viteEnv;
  const isProduction = command === 'build';
  return {
    root,
    base: VITE_BASE_URL,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    server: {
      port: VITE_PORT_MORGANA,
      host: true,
      proxy: createProxy(VITE_PROXY_MORGANA),
      fs: {
        strict: false,
      },
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 1000,
    },
    plugins: useVitePlugins(viteEnv, isProduction),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars,
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@ant-design/icons-vue',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        'dayjs/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'dayjs/locale/eu',
      ],
      exclude: ['vue-demi'],
    },
  };
};
