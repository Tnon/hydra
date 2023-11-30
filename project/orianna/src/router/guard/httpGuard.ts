/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-18 16:30:01
 * @LastEditTime: 2022-04-20 15:08:01
 */
import { removeAllPending } from "@hydra/utils/tools";
import { Router } from "vue-router";
export const httpGuard = (router: Router) => {
  router.beforeEach(() => {
    //移除所有请求
    removeAllPending();
  });
};
