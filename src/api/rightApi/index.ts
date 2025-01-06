import request from '@/utils/request'

export function getRightApi() {
  return request({
    method: 'GET',
    url: '/rights/list'
  })
}
