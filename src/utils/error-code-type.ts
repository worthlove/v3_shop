/**
 * 请求错误码类型 code提示
 * @param code
 * @constructor
 */
export const ErrorCodeType = function (code: number) {
  let errMessage: string = "未知错误"
  switch (code) {
    case 400:
      errMessage = "请求错误"
      break;
    case 401:
      errMessage = "未授权，请登录"
      break;
    case 403:
      errMessage = "拒绝访问"
      break;
    case 404:
      errMessage = "请求地址出错"
      break;
    case 408:
      errMessage = "请求超时"
      break;
    case 500:
      errMessage = "服务器内部错误"
      break;
    case 501:
      errMessage = "服务未实现"
      break;
    case 502:
      errMessage = "网关错误"
      break;
    case 503:
      errMessage = "服务不可用"
      break;
    case 504:
      errMessage = "网关超时"
      break;
    case 505:
      errMessage = "HTTP版本不受支持"
      break;
    default:
      errMessage = "未知错误"
      break;
  }
  return errMessage;
}
