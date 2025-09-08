import ApiRequest from "../../index";

export function getPageListData(url: string, queryInfo: any) {
  return ApiRequest.post({
    url,
    data: queryInfo
  });
}

export function addPageObj(url: string, queryInfo: any) {
  return ApiRequest.post({
    url,
    data: queryInfo
  });
}

export function editPageRow(url: string, queryInfo: any) {
  return ApiRequest.patch({
    url,
    data: queryInfo
  });
}

export function deletePageRow(url: string) {
  return ApiRequest.delete({
    url
  });
}
