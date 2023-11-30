/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-02-07 15:00:06
 * @LastEditTime: 2022-04-22 14:58:45
 */
declare namespace API {
  type IndexFilter = {
    range: number;
  };
  type HomeFilter = {
    interval: number;
  };
  type TableFilter = {
    file_name: string;
  };
  type ExpertCreat = {
    id: Number;
  };
  type Filter = {
    search_data: String;
  };
  type systemCfg = {
    product_logo: string;
    product_name: string;
  };
  type LoginParams = {
    username: string;
    password: string;
    captcha_code: string,
    uuid: string,
  };
  type UserList = {
    search_data: string;
  };
  type userState = {
    account: string;
    password: string;
    repeat_password: string;
    role: number;
    dept: string;
    email: string;
  };
  type editUserState = {
    id: string;
    dept: string;
    email: string;
  };
  type userId = {
    id: string;
  };
  type resetPwdState = {
    id: string;
    old_password: string;
    new_password: string;
    repeat_password: string;
  };
  type deleteUserState = {
    id: string;
  };
}
