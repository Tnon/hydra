/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 11:52:44
 * @LastEditTime: 2022-04-20 19:16:22
 */
import { useTimeoutFn } from './core/useTimeout';
import { tryOnUnmounted } from '@hydra/utils/vueHelper';
import { unref, Ref, nextTick } from 'vue';
import type { EChartsOption } from 'echarts';
import { useDebounce } from './core/useDebounce';
import { useEventListener } from './event/useEventListener';
import { useBreakpoint } from './event/useBreakpoint';

import echarts from '@hydra/plugins/echarts';

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light',
) {
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  let removeResizeFn: Fn = () => { };

  const [debounceResize] = useDebounce(resize, 200);
  resizeFn = debounceResize;

  function initCharts() {
    // 在初始化的时候执行一下resizeFn()，防止第一次加载的时候没有自适应
    resizeFn()
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, theme);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(options);
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(options);
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }
  return {
    setOptions,
    resize,
    echarts,
    getInstance,
    resizeFn
  };
}
