import { getCurrentInstance, onUnmounted } from 'vue';
export function tryOnUnmounted(fn: () => Promise<void> | void) {
  getCurrentInstance() && onUnmounted(fn);
}
