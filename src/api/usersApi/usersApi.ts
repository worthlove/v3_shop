import request from "@/utils/request.ts";

export function userListApi(params: Object) {
  return request({
    method: 'GET',
    url: '/users',
    params: params,
  })
}
