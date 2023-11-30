import request from "@/http";
enum Api {
  setGatewayInfoApi = "/api/tenant/make_secret_key", // 重置密钥
  tenantInfo = "/api/tenant/detail",
  tenantAuthLic = "/api/tenant/auth_info",
  cloudInfo = "/api/tenant/config/list",
  updateCloud = "/api/tenant/config/update_sample_destroy",
}

/**
 * @description 更新邮件网关（重置密钥）
 */
export function setGatewayInfo(params: { device_code: string }) {
  return request(
    {
      url: Api.setGatewayInfoApi,
      method: "POST",
      params,
    },
    {
      successMessageText: "设置成功",
    }
  );
}
/**
 * @description 获取租户详情包含网关
 */
export function getGetawayConfig(params = {}) {
  return request({
    url: Api.tenantInfo,
    method: "POST",
    params,
  });
}
/**
 * @description: 获取租户授权
 */
export function getTenantAuthInfo(params = {}) {
  return request({
    url: Api.tenantAuthLic,
    method: "POST",
    params,
  });
}

/**
 * @description: 获取云端连接信息
 */
export function getTenentCloudInfo() {
  return request({
    url: Api.cloudInfo,
    method: "POST",
  });
}
/**
 * @description 更新云端连接
 */
 export function setCloudInfo(params) {
  return request(
    {
      url: Api.updateCloud,
      method: "POST",
      params,
    },
    {
      successMessageText: "设置成功",
    }
  );
}