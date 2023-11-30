import { createStorage } from './storege';
import { AxiosCanceler } from './axiosCancel';
import request from "@/http";


const storage = createStorage();
export const datedifference = (sDate1: string, sDate2: string): number => {
  //sDate1和sDate2是2006-12-18格式
  if (!sDate1 || !sDate2) {
    return 0;
  }
  let dateSpan = 0,
    iDays = 0;
  const arr = sDate1.split('');
  arr.splice(4, 0, '-');
  arr.splice(7, 0, '-');
  sDate1 = arr.join('');

  const arr2 = sDate2.split('');
  arr2.splice(4, 0, '-');
  arr2.splice(7, 0, '-');
  sDate2 = arr2.join('');
  const sDate1N = Date.parse(sDate1);
  const sDate2N = Date.parse(sDate2);
  dateSpan = sDate2N - sDate1N;
  // dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays + 1;
};

//字符长度
export const bytesLength = (value) => {
  value = value ?? '';
  let count = value.replace(/\s*/g, '').length;
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 255) {
      count++;
    }
  }
  return count;
};

export const removeAllPending = () => {
  const axiosCanceler = new AxiosCanceler();
  axiosCanceler.removeAllPending();
};

//获取当前时间字符串文件名
export const getNowDate = (arudate) => {
  const date = new Date(arudate);
  const YY = date.getFullYear();
  const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return '' + YY + MM + DD + hh + mm + ss;
};

//导出excel文件
export const exportReportExcel = (url: string, filename: string) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url,
      responseType: 'blob', // 表明返回服务器返回的数据类型
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(
      (response) => {
        if (!response) {
          return;
        }
        resolve(response);
        const blob = new Blob([response], {
          type: 'application/octet-stream',
        });
        if ((window.navigator as any).msSaveOrOpenBlob) {
          (navigator as any).msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      },
      (err) => {
        reject(err);
      },
    );
  });
};


//导出log文件
/**
 * 密码强度校验
 * @param {string} sValue
 * @param {string} email
 */
export const checkStrong = (sValue: string, email: string): any => {
  const modes = {
    low: false,
    middle: false,
    high: false,
    level: 0,
  };
  //正则表达式验证符合要求的
  if (sValue.length < 1) {
    return modes;
  }
  if (/^[\s\S]{8,20}$/.test(sValue)) {
    modes.low = true; //8-20
    modes.level++;
  }
  if (/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{0,}/.test(sValue)) {
    modes.middle = true; //字母数字特殊符合
    modes.level++;
  }
  if (sValue.indexOf(email) < 0 || email == '') {
    modes.high = true; //大写
    modes.level++;
  }
  return modes;
};

export const exportExpertFileNoToken = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.click();
  //释放内存
  window.URL.revokeObjectURL(link.href);
};
/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function');
}
/**
 * @description:  是否png
 */
export function isPng(val: string): boolean {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return reg.test(val);
}
/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}
