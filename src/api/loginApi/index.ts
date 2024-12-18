import request from "@/utils/request.ts";

export function index(params: Object) {
  return request({
    method: 'post',
    url: '/login',
    params: params
  })
  
}

export function getMenuListApi() {
  return request({
    method: 'get',
    url: '/menus',
  })
}
