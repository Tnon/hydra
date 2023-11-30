import request from '@/http';
enum Api {
  updatePasswordApi = '/api/user/password/reset',
}
/**
 * @description: 更新密码
 */
export function updateTenantPassword(params: API.resetPassWordState) {
  return request(
    {
      url: Api.updatePasswordApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: '保存成功',
    },
  );
}
