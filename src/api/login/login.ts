import ApiRequest from "../index";

enum LoginAPI {
  AccountLogin = "/login", // 账号登录
  UserInfo = "/user/", // 用户信息
  UserMenus = "/role/" // 用户菜单
}

export function accountLoginRequest(params: any, data: any) {
  return ApiRequest.post({
    url: LoginAPI.AccountLogin,
    params,
    data
  });
}

export function getUserById(params: any, id: number) {
  return ApiRequest.get({
    url: LoginAPI.UserInfo + id,
    params
  });
}

export function getUserMenusByRoleId(params: any, id: number) {
  return ApiRequest.get({
    url: LoginAPI.UserMenus + id + "/menu",
    params
  });
}
