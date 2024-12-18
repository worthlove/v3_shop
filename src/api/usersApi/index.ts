// 导入封装好的 axios 实例
import request from "@/utils/request.ts";

/**
 * 获取用户列表
 * @param params - 查询参数
 * @returns 用户列表数据
 */
export function userListApi(params: Object) {
  return request({
    method: 'GET',
    url: '/users',
    params: params,
  })
}

/**
 * 切换用户状态
 * @param params - 包含用户 ID 和状态的对象
 * @returns 操作结果
 */
export function userSwitchApi(params: any) {
  const {id, mg_state} = params
  return request({
    "method": "PUT",
    "url": `users/${id}/state/${mg_state}`
  })
}

/**
 * 添加用户
 * @param params - 用户信息
 * @returns 添加结果
 */
export function addUserApi(params: any) {
  return request({
    "method": "POST",
    "url": "/users",
    data: params
  })
}

/**
 * 删除用户
 * @param params - 用户 ID
 * @returns 删除结果
 */
export function deleteUserApi(params: any) {
  return request({
    "method": "DELETE",
    "url": `/users/${params}`
  })
}

/**
 * 批量删除用户
 * @param params - 用户 ID 数组
 * @returns 批量删除结果
 */
export function batchDeleteAPI(params: Array<any>) {
  return request({
    "method": "DELETE",
    "url": `/users/batch`,
    data: params
  })
}

/**
 * 获取用户详情
 * @param params - 用户 ID
 * @returns 用户详情数据
 */
export function getUserInfoApi(params: any) {
  return request({
    "method": "GET",
    "url": `/users/${params}`
  })
}

/**
 * 更新用户信息
 * @param params - 用户信息
 * @returns 更新结果
 */
export function updateUserInfoApi(params: any) {
  return request({
    "method": "PUT",
    "url": `/users/${params.id}`,
    data: params
  })
}

/**
 * 获取用户角色
 * @param params - 用户 ID
 * @returns 用户角色数据
 */
export function getUserRoleApi() {
  return request({
    "method": "GET",
    "url": `/roles`
  })
}

/**
 * 分配用户角色
 * @returns 分配结果
 * @param adminId
 * @param roleId
 */
export function assignUserRoleApi(adminId: number, roleId: number) {
  console.log(adminId, roleId, "分配用户角色 - api");
  return request({
    "method": "PUT",
    "url": `/users/${adminId}/role`,
    data: {
      rid: roleId
    }
  })
}
