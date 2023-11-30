import request from '@/http';
enum Api {
  addAuthCodeApi = '/api/auth/device/create',
  authList = '/api/auth/list',
  updateAuth = '/api/auth/allocate',
  updateTenantMark = '/api/auth/device/edit',
  authStaticDetail = '/api/auth/detail/sum',
  authDetailList = '/api/auth/detail/list',
  addTenantUserApi = '/api/tenant/device/create',
  tenantList = '/api/tenant/list',
  tenantAuthApi = '/api/tenant/allocate',
  tenantDetailList = '/api/tenant/detail/list',
  tenantStaticDetail = '/api/tenant/detail/sum',
  delTenant = '/api/tenant/device/del',
  getTname = '/api/tenant/auto/user',

  editPhone = '/api/tenant/edit', // 修改手机号
}
/**
 * @description: 新增设备码
 */
export function addAuthCode(params: API.addCodeState) {
  return request(
    {
      url: Api.addAuthCodeApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: '设备新增成功',
    },
  );
}

/**
 * @description: 获取授权本地沙箱列表
 */
export function getAuthList(params: tableParams<API.Filter>) {
  return request({
    url: Api.authList,
    method: 'POST',
    params,
  });
}
/**
 * @description: 本地沙箱授权分配
 */
export function updateAuthCode(params: API.updateAuthState) {
  return request(
    {
      url: Api.updateAuth,
      method: 'POST',
      params,
    },
    {
      successMessageText: '授权追加成功',
    },
  );
}

/**
 * @description:  本地沙箱编辑
 */
export function updateTenantMark(params: API.tenantMark) {
  return request(
    {
      url: Api.updateTenantMark,
      method: 'POST',
      params,
    },
    {
      successMessageText: '编辑成功',
    },
  );
}
/**
 * @description: 本地沙箱授权记录统计
 */
export function getAuthStatic(params: API.authStatic) {
  return request({
    url: Api.authStaticDetail,
    method: 'POST',
    params,
  });
}

/**
 * @description: 本地沙箱授权记录详情
 */
export function getAuthDetailList(params: tableParams<API.authDetail>) {
  return request({
    url: Api.authDetailList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 新增租户
 */
export function addTenantUser(params: API.addTenantUser) {
  return request(
    {
      url: Api.addTenantUserApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: '租户新增成功',
    },
  );
}

/**
 * @description: 获取租户授权列表
 */
export function getTenantList(params: tableParams<API.Filter>) {
  return request({
    url: Api.tenantList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 租户授权分配
 */
export function tenantAuth(params: API.updateAuthState) {
  return request(
    {
      url: Api.tenantAuthApi,
      method: 'POST',
      params,
    },
    {
      successMessageText: '授权追加成功',
    },
  );
}

/**
 * @description: 租户授权记录详情
 */
export function getTenantDetailList(params: tableParams<API.authDetail>) {
  return request({
    url: Api.tenantDetailList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 租户授权记录统计
 */
export function getTenantStaticDetail(params: API.authStatic) {
  return request({
    url: Api.tenantStaticDetail,
    method: 'POST',
    params,
  });
}

/**
 * @description: 管理员删除租户
 */
export function deleteTenant(params: { id: string }) {
  return request(
    {
      url: Api.delTenant,
      method: 'POST',
      params,
    },
    {
      successMessageText: '租户删除成功！',
    },
  );
}
/**
 * @description: 根据租户名自动获取账户名称
 */
export function getTenantName(params: { tenant_name: string }) {
  return request({
    url: Api.getTname,
    method: 'POST',
    params,
  });
}

/**
 * @description: 修改手机号
 */
export function requestEditPhone(params) {
  return request({
    url: Api.editPhone,
    method: 'POST',
    params,
  });
}
