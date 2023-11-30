/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-08-18 16:26:20
 * @LastEditTime: 2021-08-18 16:47:36
 */
import { Router } from 'vue-router';
import { routerGuard } from './routerGuard';
import { httpGuard } from './httpGuard';
import { modalGuard } from './modalGuard';
import { processGuard } from './processGuard';
export function createGuard(router: Router) {
  routerGuard(router);
  httpGuard(router);
  modalGuard(router);
  processGuard(router);
}
