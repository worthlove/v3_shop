import request from "@/utils/request.ts";

export function loginApi(params: Object) {
  return request({
    method: 'post',
    url: '/login',
    params: params
  })
  
}
