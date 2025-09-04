import ApiRequest from "../../index";

export function getPageListData(url: string, queryInfo: any) {
  return ApiRequest.post({
    url,
    data: queryInfo
  });
}
