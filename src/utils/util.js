import axios from 'axios'
import * as ENUM from './enum'
import store from '../store'
import {
    hexMD5 as MD5
} from './md5'

const _localStorage = window.localStorage
const userkey = 'vueVisualization'

const headers = {
    os: 'admin',
    'Content-Type': 'application/json;charset=utf-8'
}
console.log('process.env,', process.env)
const service = axios.create({
    headers,
    baseURL: process.env.VUE_APP_DOMAIN,
    timeout: 150000
})

service.interceptors.response.use(
    res => {
        let response = null
        const {
            data,
            status,
            config
        } = res
        const {
            responseType = 'json',
                showmessage = true
        } = config
        if (status === 200) {
            switch (responseType) {
                case 'blob':
                    if (res.data && data instanceof Blob) {
                        response = res.data
                    }
                    break
                case 'json':
                    if (data && data.code && data.code === ENUM.StatusCode.success) {
                        // data有值。
                        if (data.data || data.data === 0) {
                            response = data.data
                        } else {
                            // 这是为了请求成功没有返回值设置默认的data
                            response = true
                        }
                        if (response && parseInt(data.expiretime) > 0) {
                            let key =
                                res.config.url.replace(res.config.baseURL, '') +
                                (res.config.cacheKey || '')
                            if (key.indexOf('/') !== 0) key = '/' + key
                            setCache(key, data.expiretime, response)
                        }
                    } else {
                        if (data.code == ENUM.StatusCode.tokenOver) {
                            // token过期
                            localStorage.removeItem('vueVisualization')
                            let origin = window.location.origin
                            window.location.href = origin + '/login'
                            return
                        }
                        // 已冻结
                        if (data.code == ENUM.StatusCode.freeze) {
                            return data
                        }
                        if (showmessage)
                            window.GLOBAL.vbus.$emit('message', 'error', data.msg || '网络异常')

                        // 需要返回错误码前端判断使用比如弹窗之类的
                        const error = {
                            code: data.code,
                            msg: data.msg || ''
                        }
                        console.log('error-->>>', error)
                        return Promise.reject(error)
                    }
                    break

                default:
                    break
            }
        } else {
            window.GLOBAL.vbus.$emit(
                'message',
                'error',
                (res.data && res.data.msg) || '网络异常'
            )

            throw 'common Request failed, ' + JSON.stringify(res)
        }

        return response
    },
    error => {
        if (error.response) {
            if (error.response.status == 401 || error.response.status == 403) {
                // 返回 401，并且不知用户操作活跃期内 清除token信息并跳转到登录页面
                _localStorage.removeItem(userkey)
                store.commit('clearState')
                store.commit('base/clearState')
                window.GLOBAL.vbus.$emit('router', {
                    path: '/login'
                })
            }
            if (error.code == 1511445) {
                _localStorage.removeItem(userkey)
                store.commit('clearState')
                store.commit('base/clearState')
                setTimeout(() => {
                    window.location.reload()
                }, 16)
            }
        }
        throw error
    }
)
service.interceptors.request.use(
    config => {
        let {
            token
        } = JSON.parse(_localStorage.getItem(userkey)) || {}
        config.headers.Authorization = token
        if (config.inheader) {
            let curragent = store.getters.agentId
            config.headers.agent = curragent || ''
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

function GET(url, params, showmessage) {
    return service({
        url,
        method: 'get',
        params,
        showmessage
    })
}

function POST(url, data, showmessage = true, responseType = 'json', inheader) {
    return service({
        url,
        method: 'post',
        data,
        responseType,
        inheader,
        showmessage
    })
}

function setCache(key, expire, data) {
    let timespan = parseInt(expire) * 1000
    if (timespan > Date.now())
        Storage.set(window.btoa(key), {
            expire: expire,
            data: data
        })
}

// 将base64转为Unicode规则编码
function base64toBlob(base64, type) {
    let bstr = atob(base64, type)
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n) // 转换编码后才可以使用charCodeAt 找到Unicode编码
    }
    return new Blob([u8arr], {
        type
    })
}

function downLoadFile(url, filename) {
    let a = document.createElement('a')
    if (typeof a.download === 'undefined') {
        window.location = url
    } else {
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放掉blo
    }
}

const getUrlParam = paraName => {
    let url = window.document.location.toString()
    let arrObj = url.split('?')
    if (arrObj.length > 1) {
        let arrPara = arrObj[1].split('&')
        let arr
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=')
            if (arr != null && arr[0] === paraName) {
                return arr[1]
            }
        }
        return ''
    } else {
        return ''
    }
}
/* 时间处理工具 begin */

function _getDate(datetime) {
    if (typeof datetime == 'string') {
        let arr = datetime.split(/[- : \/ T]/)
        if (arr[0].length === 4) arr[1] = arr[1] - 1
        datetime = new Date(...arr)
    }
    return datetime
}

/**
 * 时间格式化
 * @param {String} datetime 要格式化的时间字符串
 * @param {String?} format 时间的格式(注意格式中对应的字母),默认为'yyyy-MM-dd HH:mm:ss' 全角ｍ表示英文月份
 */
const DateFormat = (datetime, format = 'yyyy-MM-dd') => {
    let date = datetime,
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    try {
        date = _getDate(date)
        var o = {
            'ｍ+': month[date.getMonth()],
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            // "H+": date.getHours(), //小时
            // "m+": date.getMinutes(), //分
            // "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        return format
    } catch (e) {
        return datetime
    }
}
const DateRelative = (daynum) => {
    var date1 = new Date()
    // time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + daynum);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    return DateFormat(time2)
}

/*
 * 时间差(用于倒计时)
 * type:String,可无,结果类型,默认为'H',可选值:'d'天,'H'时,'m'分,'s'秒
 * source:String|Object(Date),可无,源时间,默认为当前时间
 * destination:String|Object(Date),可无,目标时间,默认为当前时间
 * source与destination 必须同时有一个有值
 * 返回值null|{s:秒,m:分,H:时,d:天}(若为负值则表示时间指向反了)
 */
function DateDiff({
    type = 'H',
    source = new Date(),
    destination = new Date()
} = {}) {
    let date = source
    let ts = 0
    try {
        date = _getDate(date)
        destination = _getDate(destination)
        ts = destination.getTime() - date.getTime() // Math.abs(destination.getTime() - date.getTime());
        let o = {
            s: Math.floor(ts / 1000),
            m: Math.floor(ts / 60000), // 1000*60
            H: Math.floor(ts / 3600000), // 1000*60*60
            d: Math.floor(ts / 86400000) // 1000*60*60*24
        }

        switch (type) {
            case 'H':
            default:
                return {
                    s: o.s % 60, m: o.m % 60, H: o.H, d: 0
                }
                case 's':
                    return {
                        s: o.s, m: 0, H: 0, d: 0
                    }
                    case 'm':
                        return {
                            s: o.s % 60, m: o.m, H: 0, d: 0
                        }
                        case 'd':
                            return {
                                s: o.s % 60, m: o.m % 60, H: o.H % 24, d: o.d
                            }
        }
    } catch (e) {
        return null
    }
}

export {
    service,
    POST,
    GET,
    getUrlParam,
    MD5,
    ENUM,
    base64toBlob,
    downLoadFile,
    DateFormat,
    DateRelative,
    DateDiff
    // baseURL
}