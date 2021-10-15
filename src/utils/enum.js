/*
 * enum.js
 * 全局数据
 */

/* 结果状态码(仅存放有特殊处理的) 键:驼峰 */
const StatusCode = {
  // 请求完成
  success: 1511200,

  // 特殊处理 商家不能退出入驻
  exsuccess: 10722,
  // 服务器错误
  errorServer: 1511500,
  // 已下架
  unShelved: 1511789,
  // token 过期
  tokenOver: 1511504,

  // 冻结
  freeze: 1511634,

  // 不符合
  uploadFail: 1511503


}

export {
  StatusCode
}