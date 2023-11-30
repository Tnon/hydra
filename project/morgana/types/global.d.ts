/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-17 14:53:22
 * @LastEditTime: 2022-04-22 16:56:47
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare interface Items {
  title: string;
  type: string | number;
}

declare interface Arguments {
  [key: string]: Array<string | number | boolean> | string | number | boolean | undefined;
}

declare interface tableParams<T> {
  filter: Partial<T>;
  orderby: string | undefined;
  page: {
    page_index: number;
    page_size: number;
  };
}
declare interface ViteEnv {
  VITE_PORT_MORGANA: number;
  VITE_PORT_ORIANNA: number;
  VITE_BASE_URL: string;
  VITE_PROXY_MORGANA: [string, string][];
  VITE_PROXY_ORIANNA: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_DYNAMIC_IMPORT: boolean;
  VITE_USE_IMAGEMIN: boolean;
  VITE_BUILD_COMPRESS_DEL_SOURCE_FILE: boolean;
}
declare type Nullable<T> = T | null;
