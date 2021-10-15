/**  
 * 全局常量设置
 */

// form表单长度
export const FORM_LENGHT_WRAPPER = 19;
export const FORM_LENGHT_NOMAL_LABEL = 5;
//**通过window.open打开的路由 */
export const routerWhiteList = [
    '/outwarehouse/bid/detail/', 
    '/outwarehouse/bid/onsale', 
    '/outwarehouse/bid/offerprice/'
];

/**keepAlive白名单,需要跟导出的模块名要一致 */
export const keepAliveWhiteList = [
    'orderIndex', 
    'productStockIndex'
];
