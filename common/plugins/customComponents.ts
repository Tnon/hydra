/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:37:37
 * @LastEditTime: 2022-04-20 19:20:16
 */
import { App } from 'vue';

import { globalModal } from '@hydra/components/global-modal';
import customIcon from '@hydra/components/custom-icon';
/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('GlobalModal', globalModal);
  app.component('CustomIcon', customIcon);
}
