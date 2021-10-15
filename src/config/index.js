// 当前宿主平台 兼容多平台应该通过一定特定函数来取得
export const HOST_PLATFORM = 'WEB';

export const NODE_ENV = process.env.NODE_ENV || 'production';


export const ROUTER_DEFAULT_CONFIG = {
    waitForData: true,
    transitionOnLoad: true,
};
