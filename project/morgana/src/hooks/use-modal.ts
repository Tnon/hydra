/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 09:29:49
 * @LastEditTime: 2022-04-20 20:40:59
 */
import { createVNode, VNode } from 'vue';
import { globalModal } from '@hydra/components/global-modal';
import { useGlobalModal } from '@/store/modules';
export interface Option {
  title: string;
  handleOk?: (...rest: any) => void;
  contentProps?: object;
  footer?: boolean;
  subtitle?: string | VNode;
  width?: number;
  wrapClassName?: string;
  maskClosable?: boolean;
  showRightColse?: boolean,
}
/**
 * @name: 通用的生成弹框的方法
 * @param {Option} options 接受的属性
 * {
 *      title:弹框的标题
 *      handleOk：点击确定的回调函数
 *      contentProps：需要传给content的属性，单项传递，！！！在组件用modalValue定义
 *
 * }
 * @param {any} content 内容区域  组件
 */
export const useModal = (options: Option, content: any) => {
  const globalModalStore = useGlobalModal();
  const remove = () => {
    globalModalStore.SetGlobalModal(null);
  };
  const instance: VNode = createVNode(globalModal, { remove, ...options, content });

  globalModalStore.SetGlobalModal(instance);

  // let _instance: any = null
  // const container = document.createElement('div')
  // // 移除组件
  // const remove = () => {
  //     render(null, container)
  //     _instance = null
  //     container.remove()
  // }

  // _instance = createVNode(globalModal, { ...options, remove, content })
  // _instance.appContext = app._instance?.appContext
  // render(_instance, container)
};
