import request from "@/http";
enum Api {
  getSystemCfg = "/api/config/threaten/get",
  setSystemCfg = "/api/config/threaten/set",
  authLic = "/api/config/auth/get",
  uploadLic = "/api/config/auth/edit",

  SMSCVerifyStatus = "/api/config/sms/status", // 获取短信验证是否开启
  setSMSStatus = "/api/config/sms/edit", // 修改短信验证是否开启
}
/**
 * @description: 获取平台配置
 */
export function getSystemConfig(params = {}) {
  return request({
    url: Api.getSystemCfg,
    method: "POST",
    params,
  });
}

/**
 * @description: 保存平台配置
 */
export function setSystemConfig(params: API.systemConfig) {
  return request(
    {
      url: Api.setSystemCfg,
      method: "POST",
      params,
    },
    {
      successMessageText: "保存成功",
    }
  );
}
/**
 * @description: 获取授权
 */
export function getAuthLic(params = {}) {
  return request({
    url: Api.authLic,
    method: "POST",
    params,
  });
}
/**
 * @description: 上传授权文件
 */
export function uploadLic(params: any) {
  return request(
    {
      url: Api.uploadLic,
      method: "POST",
      params,
    },
    {
      successMessageText: "授权成功",
    }
  );
}

/**
 * @description: 获取短信验证码是否开启
 */
export function requestSMSInfo() {
  return request({
    url: Api.SMSCVerifyStatus,
    method: 'POST',
  });
}

/**
 * @description: 修改短信验证码是否开启
 */
export function setSMSInfo(params) {
  return request(
    {
      url: Api.setSMSStatus,
      method: 'POST',
      params,
    },
    {
      successMessageText: "设置成功",
    }
  );
}
