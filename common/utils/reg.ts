/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-20 12:03:45
 * @LastEditTime: 2022-04-20 15:31:51
 */
import { reactive } from "vue";
import { bytesLength, checkStrong } from "./tools";
const ipReg =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

const emailReg =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const accountRef = /^[A-Za-z0-9]+$/;
//邮箱
const validateEmail = (_, value) => {
  if (emailReg.test(value) || !value) {
    return Promise.resolve();
  }
  return Promise.reject();
}; //管理中心地址/域名
const ValidateAddress = (_, value) => {
  const validateIp =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  const validateDomain =
    /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if ((!validateIp.test(value) && !validateDomain.test(value)) || !value) {
    return Promise.reject();
  }
  return Promise.resolve();
};
// ip
const validateIp = (_, value) => {
  if (ipReg.test(value) && value) {
    return Promise.resolve();
  }
  return Promise.reject();
};
//长度正则
//长度正则
const validateByteLength = (length: number) => {
  const validator = (_, value) => {
    if (bytesLength(value) > length) {
      return Promise.reject();
    }
    return Promise.resolve();
  };
  return validator;
};
//设备识别码
const validateDeviceCode = (_, value) => {
  if (value && /^[A-Za-z0-9]{12}$/.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject();
};

// 管理员——租户管理——租户名
// 租户名的长度由32改为100
const validateTenantName = (_, value) => {
  if (
    value &&
    value.length <= 100 &&
    /^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)
  ) {
    return Promise.resolve();
  }
  return Promise.reject();
};
// const validateTenantName = (_, value) => {
//   if (
//     value &&
//     bytesLength(value) <= 100 &&
//     /^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)
//   ) {
//     return Promise.resolve();
//   }
//   return Promise.reject();
// };

// 管理员——租户管理——租户账号
const validateTenantAccount = (_, value) => {
  if (value && accountRef.test(value) && value.length <= 102) {
    return Promise.resolve();
  }
  return Promise.reject();
}


//账号正则
const validateAccount = (_, value) => {
  if (value && accountRef.test(value) && bytesLength(value) <= 20) {
    return Promise.resolve();
  }
  return Promise.reject();
};
// 密码正则
const state = reactive<{
  formData: any;
}>({
  formData: {},
});
export const pwdLevelMode = reactive({
  low: false,
  middle: false,
  high: false,
  level: 0,
});
const validatePassword = (_, value) => {
  const results = checkStrong(value ?? "", state.formData.account || "");
  Object.assign(pwdLevelMode, results);
  if (pwdLevelMode.level === 3) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};
// 部门信息正则
const validateDeptInfo = (_, value) => {
  if (
    value &&
    bytesLength(value) < 33 &&
    /^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)
  ) {
    return Promise.resolve();
  }
  return Promise.reject();
};

// 手机号校验
const validatePhoneNumber = (_, value) => {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  if (reg.test(value)) {
    // callback(new Error('请输入正确的手机号'));
    return Promise.resolve();
  } else {
    // callback();
    return Promise.reject();
  }
};
export {
  emailReg,
  validateEmail,
  validateByteLength,
  validateAccount,
  ValidateAddress,
  validateTenantName,
  validateTenantAccount,
  validateDeviceCode,
  validatePassword,
  validateIp,
  validateDeptInfo,
  validatePhoneNumber,
};
