/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-01-18 13:50:59
 * @LastEditTime: 2022-02-07 16:16:58
 */

import { RoleEnum } from '@/enums/roleEnum';

export const ACCESS_TOKEN = 'Access-Token'; // 用户token
export const TOKEN_TYPE = 'Token_Type'; // token类型
export const USER_ID = 'User_Id'; // token类型
interface userInfo {
  id: string;
  account: string;
  role: RoleEnum;
  dept: string;
  email: string;
  auto_auth: string;
  expert_auth: string;
  create_time: string;
}
export interface loginResult {
  token: {
    token: string;
    token_type: string;
  };
  user: any;
}
export type User_Info = Partial<userInfo>;

export type IUserState = {
  token: string;
  user_info: User_Info;
  isLogin: boolean;
  tokenType: string;
  user_id: string;
};
