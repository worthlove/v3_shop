import request from "@/utils/request";

/**
 * 获取所有角色列表
 * @returns 角色列表数据
 */
export function getAllRoleListApi() {
  return request({
    method: 'GET',
    url: '/roles'
  })
}

/**
 * 获取角色详情
 * @param params - 角色 ID
 * @returns 角色详情数据
 */
export function getRoleIdApi(params: any) {
  return request({
    method: 'GET',
    url: `/roles/${params}`
  })
}

/**
 * 添加角色信息
 * @param params - 角色信息
 * @returns 更新结果
 */
export function addRoleApi(params: any) {
  return request({
    method: 'POST',
    url: `/roles`,
    data: params
  })
}

/**
 * 根据角色ID删除角色
 * @param params - 角色ID
 * @returns 删除结果
 * */

export function deleteRoleApi(params: any) {
  return request({
    method: 'DELETE',
    url: `/roles/${params.id}`,
  })
}

/**
 * 根据角色ID修改角色信息
 * @param params - 角色信息
 * @returns 修改结果
 * */
export function updateRoleApi(params: any) {
  return request({
    method: 'PUT',
    url: `/roles/${params.id}`,
    data: params
  })
}

/**
 * 根据角色ID获取权限列表
 * @returns 权限列表数据
 * @param role
 * @param right
 * */

export function deleteRoleAuthApi(role: any, right: any) {
  return request({
    method: 'DELETE',
    url: `/roles/${role.id}/rights/${right}`,
  })
}

/**
 * 根据角色ID获取权限列表
 * @returns 权限列表数据
 */
export function getRoleListApi() {
  return request({
    method: 'GET',
    url: `/rights/tree`,
  })
}
