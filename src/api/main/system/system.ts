import ApiRequest from "../../index";

// 获取页面列表数据
export function getPageListData(url: string, queryInfo: any) {
  return ApiRequest.post({
    url,
    data: queryInfo
  });
}

// 页面新增
export function addPageObj(url: string, queryInfo: any) {
  return ApiRequest.post({
    url,
    data: queryInfo
  });
}

// 列表行数据编辑
export function editPageRow(url: string, queryInfo: any) {
  return ApiRequest.patch({
    url,
    data: queryInfo
  });
}

// 删除行数据
export function deletePageRow(url: string) {
  return ApiRequest.delete({
    url
  });
}

// 获取父级菜单列表数据
export function getParentMenuListData(url: string) {
  return ApiRequest.get({
    url
  });
}
