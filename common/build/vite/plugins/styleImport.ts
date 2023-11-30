/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-27 16:27:35
 * @LastEditTime: 2022-04-20 18:01:11
 */
// import styleImport from 'vite-plugin-style-import';
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    resolves: [AndDesignVueResolve()],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
    ],
  });
  return styleImportPlugin;
}
