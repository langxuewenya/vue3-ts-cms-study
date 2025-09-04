import ApiRequest from "../index";

enum LoginAPI {
  AccountLogin = "/login", // 账号登录
  UserInfo = "/user/", // 用户信息
  UserMenus = "/role/", // 用户菜单
  Logout = "/logout" // 退出登录
}

export function accountLoginRequest(data: any) {
  return ApiRequest.post({
    url: LoginAPI.AccountLogin,
    data
  });
}

export function getUserById(id: number) {
  return ApiRequest.get({
    url: LoginAPI.UserInfo + id
  });
}

export function getUserMenusByRoleId(id: number) {
  return ApiRequest.get({
    url: LoginAPI.UserMenus + id + "/menu"
  });
}

export function logout(params: any, id: number) {
  return ApiRequest.post({
    url: LoginAPI.Logout,
    params,
    data: {
      userId: id
    }
  });
}
