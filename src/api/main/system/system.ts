import ApiRequest from "../../index";

export function getPageListData(params: any, url: string, queryInfo: any) {
  return ApiRequest.post({
    url,
    params,
    data: queryInfo
  });
}
