
import { any } from "vue-types";

interface Window {
    XMLHttpRequest: Function;
}
interface MSG {
    msg: string;
    code: string;
}
interface ErrorTarget {
    XMLHttpRequest: any;
    message: {
        [key: string] : MSG
    };
    errData: any;
    errorHandler: Function;
    error: Function;
    XMLTYPE: EventListenerOrEventListenerObject
}

interface Config {
    method: string,
    url: string;
    isSampling?: boolean;
    addErrData?: any;
}
interface ErrData {
    errMsg: string;
    errUrl: string;
    errIndex: string;
    errType: MSG;
    errTime: number;
    errAgent: string;
    errCode: string;
    addErrData: any;
}
interface ErrMsg {
    errMsg: string;
    errUrl: string;
    errType: MSG;
};
(function (root: any, hdErr) {
    root = root || {};
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = hdErr
    // else if(typeof define === 'function' && define.amd)
    //     define([], hdErr)
    else if(typeof exports === 'object')
        exports["hdErr"] = hdErr
    else {
        root["hdErr"] = hdErr
    }
    
    // if (window) window.hdErr = hdErr

})(this, function(configData: Config) {

    if (!configData) return
    
    let { method, url, isSampling, addErrData } = configData || {}

    const Config: Config = {
        method: method && method == 'GET' ? 'GET' : 'POST',
        url: url || '',
        isSampling: isSampling === false ? false : true,
        addErrData: addErrData
    }

    const allErrorData: any = []

    const hdErr:ErrorTarget = {
        XMLHttpRequest: XMLHttpRequest,
        message: {
            JSERR: {
                code: '01',
                msg: 'JS异常',
            },
            EVENTERR: {
                code: '01',
                msg: '静态资源加载异常',
            },
            AJAXERR: {
                code: '02',
                msg: 'AJAX请求异常',
            },
            AJAXTIMEOUTERR: {
                code: '03',
                msg: 'AJAX请求超时',
            },
        },
        error: () => {},
        errData: () => {},
        errorHandler: () => {},
        XMLTYPE: () => {}
    }

    //json转换成URL格式
    let parseParam =  function (param: Object, key?: string) {
        var paramStr = "";
        if ( typeof param ==  'string' || typeof param == 'number' || typeof param == 'boolean') {
            paramStr += "&" + key + "=" + encodeURIComponent(param);
        } else {
            for (let i in param) {
                var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += '&' + parseParam(param[i], k);
            }
        }
        return paramStr.substr(1) + '';
    };

    //错误信息提取
    let stackMsg = function (error:any) {
        let stack = error.stack
            .replace(/\n/gi, "")
            .split(/\bat\b/)
            .slice(0, 9)[1]
        let msg = error.toString()
        return {
            errMsg: msg,
            errUrl: stack
        }
    }
    
    //错误信息组合
    let errorData = function (ErrMsg: ErrMsg) {

        let {errMsg, errUrl, errType} = ErrMsg
        let errData: ErrData = {
            errMsg: errMsg,
            errUrl: errUrl,
            errIndex: window.location.href,
            errType: errType,
            errTime: new Date().getTime(),
            errAgent: window.navigator.userAgent,
            errCode: errMsg + ',' + errUrl,
            addErrData: {}
        }

        if (addErrData && isPlainObject(addErrData)) {
            for (let i in addErrData) {
                errData.addErrData[i] = addErrData[i]
            }
        }

        return errData

    }

    //判断错误信息是否重复
    let sampling = function (data: any) {
        if (Config.isSampling) {
            if (allErrorData.indexOf(data.errCode) != -1) {
                return true
            } else {
                allErrorData.push(data.errCode)
                return false
            }
        } else {
            return false
        }

    }

    //是否为简单对象,常用于判断是否为JSON
    let isPlainObject = function (value: any) {
        if (value === null || value === undefined) return false
        return isObject(value) && value.__proto__ === Object.prototype
    }

    //是否对象
    let isObject = function (value: Object) {
        return typeof value != null && (typeof value == 'object' || typeof value == 'function')
    }

    //错误内容处理
    hdErr.errorHandler = function (error: any) {

        if (sampling(error)) return

        var xhr = new XMLHttpRequest();
        
        if (Config.method == 'POST') {
            console.log(Config.url)
            xhr.open(Config.method, Config.url, true)
            xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
            xhr.send(JSON.stringify(error));
        } else {
            xhr.open(Config.method, Config.url + '?' + parseParam(error), true)
            xhr.send(null);
        }
        
    }

    //异常监控API,可以用于主动监控被捕获的JavaScript异常。
    hdErr.error = function (error: any) {

        let errData: any = {}
        if (error && error.stack) {
            errData = stackMsg(error)
        }

        hdErr.errorHandler(errorData({
            errMsg: errData.errMsg, 
            errUrl: errData.errUrl,
            errType: hdErr.message.JSERR
        }));
    }

    //全局的onError函数，可以搜集页面上的错误信息,但是有的浏览器不支持该方法
    window.onerror = (msg, url, line, col, err) => {

        let errData: any = {};
        if (err && err.stack) {
            errData = stackMsg(err)
        }

        hdErr.errorHandler(errorData({
            errMsg: errData.errMsg, 
            errUrl: errData.errUrl,
            errType: hdErr.message.JSERR
        }));
    }

    //Promise 的 reject 但是没有被 catch 捕捉时触发，可获取异常信息。
    window.onunhandledrejection = event =>{

        let errData :any = {}
        if (event && event.reason) {
            errData = stackMsg(event.reason)
        }

        hdErr.errorHandler(errorData({
            errMsg: errData.errMsg, 
            errUrl: errData.errUrl,
            errType: hdErr.message.JSERR
        }));

    };

    //监听静态资源加载错误
    window.addEventListener('error', function(e) {

        let errorTarget: any = e.target

        if (errorTarget && errorTarget.baseURI) {
            hdErr.errorHandler(errorData({
                errMsg: errorTarget.outerHTML, 
                errUrl: errorTarget.baseURI,
                errType: hdErr.message.EVENTERR
            }));
        }

    }, true)

    //页面AJAX请求类型判断
    hdErr.XMLTYPE = function (event: any) {
        let target: any = event.target

        if ("readystatechange" === event.type ) {
            // console.log('请求状态码改变')
            if (target.readyState == 4) {
                if (target.status == 404) {
                    hdErr.errorHandler(errorData({
                        errMsg: '错误码：' + event.target.status, 
                        errUrl: target.responseURL,
                        errType: hdErr.message.AJAXERR
                    }));
                }
            }
        }

        if ("error" === event.type ) {
            // console.log('请求出错')
            hdErr.errorHandler(errorData({
                errMsg: '错误码：' + event.target.status, 
                errUrl: target.responseURL,
                errType: hdErr.message.AJAXERR
            }));
        }

        if ("timeout" === event.type ) {
            // console.log('请求超时')
            hdErr.errorHandler(errorData({
                errMsg: '错误码：' + event.target.status, 
                errUrl: target.responseURL,
                errType: hdErr.message.AJAXTIMEOUTERR
            }));
        }

    }

    //监听页面所有AJAX请求
    window.XMLHttpRequest = function () {

        let xhr:XMLHttpRequest  = new hdErr.XMLHttpRequest();

        xhr.addEventListener("readystatechange", hdErr.XMLTYPE)
        xhr.addEventListener("error", hdErr.XMLTYPE)
        xhr.addEventListener("timeout", hdErr.XMLTYPE)
        xhr.addEventListener("loadstart", hdErr.XMLTYPE)
        xhr.addEventListener("loadend", hdErr.XMLTYPE)

        return xhr
    };

    
    return hdErr
});