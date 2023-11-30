/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 19:31:55
 * @LastEditTime: 2022-04-20 19:34:09
 */
import router from '@/router';
import request from '@/http';
import { storage } from '@hydra/utils/storege';
//退出登录，清空
export const Logout = () => {
  router.replace({
    name: 'login',
  });
  storage.clear();
  // window.location.reload()
};
export const exportExpertFile = (url: string, filename: string) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url,
      responseType: 'blob', // 表明返回服务器返回的数据类型
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
