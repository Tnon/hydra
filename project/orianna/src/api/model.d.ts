
declare namespace API {
  type HomeFilter = {
    tenant_id?: string;
    interval: number;
  };
  type ExpertCreat = {
    id: string;
  };
  type Filter = {
    search_data: string;
  };
  type reportDetail = {
    id: any;
  };
  type AnyResult = {
    id: string;
    result: string;
    summary: string;
    suggestion: string;
    file: any;
  };
  type addCodeState = {
    device_code: string;
    tenant_mark: string;
    auto_num: number;
    expert_num: number;
    remark: number;
  };
  type updateAuthState = {
    id: string;
    auto_change: number;
    expert_change: number;
    remark: number;
  };
  type tenantMark = {
    id: string;
    tenant_mark: string;
  };
  type authStatic = {
    filter: {
      id: string;
      date_range: string;
    };
  };
  type authDetail = {
    id: string;
    date_range: string;
  };
  type authDelete = {
    id: string;
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
    dept: string;
    remarks: string
  };
  type editUserState = {
    id: string;
    dept: string;
    remarks: string;
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
  type systemConfig = {
    serv_addr: string;
    account: string;
    password: string;
  };
  type systemCfg = {
    product_logo: string;
    product_name: string;
  };
  type resetPassWordState = {
    id: string;
    old_password: string;
    new_password: string;
    repeat_password: string;
  };
  type addTenantUser = {
    tenant_name: string;
    tenant_account: string;
    password: string;
    auto_num: number;
    expert_num: number;
    remark: string;
  };
}
type deleteParams = {
  ids: Array
}