/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 14:39:19
 * @LastEditTime: 2022-04-20 15:09:00
 */
import { isNavigationFailure, Router } from "vue-router";
import { useUserToken } from "@/store/modules";
import { ACCESS_TOKEN, USER_ID } from "@/store/modules/user/type";
import { storage } from "@hydra/utils/storege";
const allowList = ["login", "error", "error-404", "error-405"];

const loginRoutePath = "/login";
const defaultRoutePath = "/overview";
export function routerGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userTokenStore = useUserToken();

    const token = storage.get(ACCESS_TOKEN),
      user_id = storage.get(USER_ID);
    if (token) {
      if (to.name === "login") {
        next({ path: defaultRoutePath });
      } else {
        const hasRoute = router.hasRoute(to.name!);

        if (userTokenStore.isLogin) {
          if (allowList.includes(to.name as string) || hasRoute) {
            next();
          } else {
            next({ path: "/error" });
          }
        } else {
          const res = await userTokenStore.getUserInfo(user_id);
          if (res) {
            //这里不能直接next()
            // next(to.path)
            next();
          } else {
            userTokenStore.SetToken("");
            storage.remove(ACCESS_TOKEN);
            next({ path: loginRoutePath });
          }
        }
      }
    } else {
      allowList.includes(to.name as string)
        ? next()
        : next({ path: loginRoutePath });
    }
  });

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      console.log("failed navigation", failure);
    }
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
